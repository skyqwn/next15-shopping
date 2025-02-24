import { Inject, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { Effect, pipe } from 'effect';

import { DRIZZLE } from 'src/infrastructure/drizzle/drizzle.module';
import { DrizzleDB } from 'src/infrastructure/drizzle/types/drizzle';
import { AppNotFoundException } from 'src/domain/exceptions';
import { ErrorCodes } from 'src/common/error';
import {
  ProductVariantInsertType,
  productVariants,
  ProductVariantUpdateType,
  VariantImageInsertType,
  variantImages,
  VariantTagInsertType,
  variantTags,
} from 'src/infrastructure/drizzle/schema/schema';
import { ProductVariantModel } from 'src/domain/model/product-variant.model';
import { BaseRepository } from './base.repository';

type VariantImageInput = {
  url: string;
  size: number;
  fileName: string;
};

type CreateVariantRelationsInput = {
  variant: ProductVariantInsertType;
  images: VariantImageInput[];
  tags: string[];
};

@Injectable()
export class ProductVariantRepository
  implements BaseRepository<ProductVariantInsertType, ProductVariantModel>
{
  constructor(@Inject(DRIZZLE) private db: DrizzleDB) {}

  create(
    data: ProductVariantInsertType,
  ): Effect.Effect<ProductVariantModel, Error> {
    return pipe(
      Effect.tryPromise(() =>
        this.db.insert(productVariants).values(data).returning(),
      ),
      Effect.map(([variant]) => ProductVariantModel.from(variant)),
    );
  }

  createVariantImage(data: VariantImageInsertType): Effect.Effect<void, Error> {
    return pipe(
      Effect.tryPromise(() => this.db.insert(variantImages).values(data)),
      Effect.map(() => void 0),
    );
  }

  createVariantTag(data: VariantTagInsertType): Effect.Effect<void, Error> {
    return pipe(
      Effect.tryPromise(() => this.db.insert(variantTags).values(data)),
      Effect.map(() => void 0),
    );
  }

  findByProductId(
    productId: number,
  ): Effect.Effect<ProductVariantModel[], Error> {
    return pipe(
      Effect.tryPromise(() =>
        this.db
          .select()
          .from(productVariants)
          .where(eq(productVariants.productId, productId))
          .leftJoin(
            variantImages,
            eq(variantImages.variantId, productVariants.id),
          )
          .leftJoin(variantTags, eq(variantTags.variantId, productVariants.id)),
      ),
      Effect.map((results) => {
        const groupedResults = results.reduce((acc, curr) => {
          const variantId = curr.productVariants.id;
          if (!acc[variantId]) {
            acc[variantId] = {
              ...curr.productVariants,
              variantImages: [],
              variantTags: [],
            };
          }
          if (curr.variantImages) {
            acc[variantId].variantImages.push(curr.variantImages);
          }
          if (curr.variantTags) {
            acc[variantId].variantTags.push(curr.variantTags);
          }
          return acc;
        }, {});

        return Object.values(groupedResults).map(ProductVariantModel.from);
      }),
    );
  }

  delete(id: number): Effect.Effect<void, Error> {
    return pipe(
      Effect.tryPromise(() =>
        this.db.delete(productVariants).where(eq(productVariants.id, id)),
      ),
      Effect.map(() => void 0),
    );
  }

  findAll(): Effect.Effect<ProductVariantModel[], Error> {
    return pipe(
      Effect.tryPromise(() =>
        this.db
          .select()
          .from(productVariants)
          .leftJoin(
            variantImages,
            eq(variantImages.variantId, productVariants.id),
          )
          .leftJoin(variantTags, eq(variantTags.variantId, productVariants.id)),
      ),
      Effect.map((results) => this.groupVariantResults(results)),
    );
  }

  findOneBy(id: number): Effect.Effect<ProductVariantModel | null, Error> {
    return pipe(
      Effect.tryPromise(() =>
        this.db
          .select()
          .from(productVariants)
          .where(eq(productVariants.id, id))
          .leftJoin(
            variantImages,
            eq(variantImages.variantId, productVariants.id),
          )
          .leftJoin(variantTags, eq(variantTags.variantId, productVariants.id))
          .limit(1),
      ),
      Effect.map((results) => {
        const grouped = this.groupVariantResults(results);
        return grouped.length > 0 ? grouped[0] : null;
      }),
    );
  }

  getById(id: number): Effect.Effect<ProductVariantModel, Error> {
    return pipe(
      this.findOneBy(id),
      Effect.flatMap((variant) =>
        variant
          ? Effect.succeed(variant)
          : Effect.fail(new AppNotFoundException(ErrorCodes.VARIANT_NOT_FOUND)),
      ),
    );
  }

  update(
    id: number,
    data: ProductVariantUpdateType,
  ): Effect.Effect<ProductVariantModel, Error> {
    return pipe(
      Effect.tryPromise(() =>
        this.db
          .update(productVariants)
          .set({ ...data, updatedAt: new Date() })
          .where(eq(productVariants.id, id))
          .returning(),
      ),
      Effect.map(([variant]) => ProductVariantModel.from(variant)),
      Effect.catchAll(() =>
        Effect.fail(new AppNotFoundException(ErrorCodes.VARIANT_NOT_FOUND)),
      ),
    );
  }

  createWithRelations(
    data: CreateVariantRelationsInput,
  ): Effect.Effect<ProductVariantModel, Error> {
    return pipe(
      Effect.tryPromise(() =>
        this.db.transaction(async (tx) => {
          const [variant] = await tx
            .insert(productVariants)
            .values(data.variant)
            .returning();

          if (data.images.length > 0) {
            const imagesWithOrder = data.images.map((image, index) => ({
              url: image.url,
              size: image.size,
              fileName: image.fileName,
              order: index,
              variantId: variant.id,
            }));

            await tx.insert(variantImages).values(imagesWithOrder);
          }

          if (data.tags.length > 0) {
            const tagsData = data.tags.map((tag) => ({
              variantId: variant.id,
              tag,
            }));

            await tx.insert(variantTags).values(tagsData);
          }

          return variant;
        }),
      ),
      Effect.map(ProductVariantModel.from),
      Effect.catchAll((error) => {
        console.error('Variant creation error:', error);
        return Effect.fail(
          new Error('Failed to create variant with relations'),
        );
      }),
    );
  }

  private groupVariantResults(results: any[]) {
    const groupedResults = results.reduce((acc, curr) => {
      const variantId = curr.product_variants.id;
      if (!acc[variantId]) {
        acc[variantId] = {
          ...curr.product_variants,
          variantImages: [],
          variantTags: [],
        };
      }
      if (curr.variant_images) {
        acc[variantId].variantImages.push(curr.variant_images);
      }
      if (curr.variant_tags) {
        acc[variantId].variantTags.push(curr.variant_tags);
      }
      return acc;
    }, {});

    return Object.values(groupedResults).map(ProductVariantModel.from);
  }
}
