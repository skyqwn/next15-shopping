import { Inject, Injectable } from '@nestjs/common';
import { eq, sql, inArray, or, ilike, desc, asc } from 'drizzle-orm';
import { Effect, pipe } from 'effect';

import { DRIZZLE } from 'src/infrastructure/drizzle/drizzle.module';
import { DrizzleDB } from 'src/infrastructure/drizzle/types/drizzle';
import { AppNotFoundException } from 'src/domain/exceptions';
import { ErrorCodes } from 'src/common/error';
import {
  ProductVariantInsertType,
  productVariants,
  ProductVariantSelectType,
  ProductVariantUpdateType,
  VariantImageInsertType,
  variantImages,
  VariantImageSelectType,
  VariantTagInsertType,
  variantTags,
  VariantTagSelectType,
} from 'src/infrastructure/drizzle/schema/schema';
import { ProductVariantModel } from 'src/domain/model/product-variant.model';
import { BaseRepository } from './base.repository';

type VariantImageInput = {
  url: string;
  size: number;
  fileName: string;
  blurThumb?: string;
};

type CreateVariantRelationsInput = {
  variant: ProductVariantInsertType;
  images: VariantImageInput[];
  tags: string[];
};
type SortOption = 'popular' | 'latest' | 'price_high' | 'price_low';
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

  findAllWithFilters(params: {
    search?: string;
    sort?: string;
    page?: string;
    limit?: string;
  }): Effect.Effect<
    { data: ProductVariantModel[]; total: number; hasMore: boolean },
    Error
  > {
    const page = parseInt(params.page || '1', 10);
    const limit = parseInt(params.limit || '1', 10);
    const skip = (page - 1) * limit;

    return pipe(
      Effect.tryPromise(() =>
        this.db
          .select({ count: sql`count(*)`.mapWith(Number) })
          .from(productVariants)
          .where(
            params.search
              ? or(ilike(productVariants.productType, `%${params.search}%`))
              : undefined,
          )
          .then((result) => result[0].count),
      ),
      Effect.flatMap((total) =>
        pipe(
          Effect.tryPromise(() =>
            this.db.query.productVariants.findMany({
              with: {
                variantImages: true,
                variantTags: true,
                product: {
                  with: {
                    productVariants: true,
                    reviews: {
                      with: {
                        user: true,
                      },
                    },
                  },
                },
              },
              where: params.search
                ? or(ilike(productVariants.productType, `%${params.search}%`))
                : undefined,
              orderBy:
                params.sort === 'latest'
                  ? desc(productVariants.createdAt)
                  : params.sort === 'product_name'
                    ? asc(productVariants.productType)
                    : desc(productVariants.createdAt),
              limit,
              offset: skip,
            }),
          ),
          Effect.map((variants) => ({
            data: variants.map((variant) => ProductVariantModel.from(variant)),
            total,
            hasMore: skip + variants.length < total,
            page,
          })),
        ),
      ),
      Effect.catchAll((error) => {
        console.error('Query error:', error);
        return Effect.succeed({ data: [], total: 0, hasMore: false });
      }),
    );
  }

  private getOrderByClause(sort?: string) {
    switch (sort) {
      case 'latest':
        return [desc(productVariants.createdAt)];
      case 'popular':
        return [desc(productVariants.createdAt)];
      case 'price_high':
        return [
          desc(
            sql`(SELECT price FROM products WHERE products.id = product_variants.product_id)`,
          ),
        ];
      case 'price_low':
        return [
          asc(
            sql`(SELECT price FROM products WHERE products.id = product_variants.product_id)`,
          ),
        ];
      case 'product_name':
        return [asc(productVariants.productType)];
      default:
        return [desc(productVariants.createdAt)];
    }
  }

  findAll(): Effect.Effect<ProductVariantModel[], Error> {
    return pipe(
      Effect.tryPromise(() =>
        this.db.query.productVariants.findMany({
          with: {
            variantImages: true,
            variantTags: true,
            product: {
              with: {
                productVariants: true,
                reviews: {
                  with: {
                    user: true,
                  },
                },
              },
            },
          },
        }),
      ),
      Effect.map((variants) => {
        return variants.map((variant) => ProductVariantModel.from(variant));
      }),
      Effect.catchAll((error) => {
        console.error('Variant query error:', error);
        return Effect.succeed([]);
      }),
    );
  }

  findOneBy(id: number): Effect.Effect<ProductVariantModel | null, Error> {
    return pipe(
      Effect.tryPromise(() =>
        this.db.query.productVariants.findFirst({
          where: eq(productVariants.id, id),
          with: {
            variantImages: true,
            variantTags: true,
            product: {
              with: {
                productVariants: true,
                reviews: {
                  with: {
                    user: true,
                  },
                },
              },
            },
          },
        }),
      ),
      Effect.map((variant) => {
        if (!variant) return null;
        return ProductVariantModel.from(variant);
      }),
      Effect.catchAll((error) => {
        console.error('Variant query error:', error);
        return Effect.succeed(null);
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
    data: ProductVariantUpdateType & {
      variantImages?: VariantImageInput[];
      tags?: string[];
    },
  ): Effect.Effect<ProductVariantModel, Error> {
    return pipe(
      Effect.tryPromise(async () => {
        return await this.db.transaction(async (tx) => {
          const [variant] = await tx
            .update(productVariants)
            .set({
              productType: data.productType,
              color: data.color,
              updatedAt: new Date(),
            })
            .where(eq(productVariants.id, id))
            .returning();

          if (!variant) {
            throw new AppNotFoundException(ErrorCodes.VARIANT_NOT_FOUND);
          }

          let updatedImages: VariantImageSelectType[] = [];
          if (data.variantImages) {
            const existingImages = await tx
              .select()
              .from(variantImages)
              .where(eq(variantImages.variantId, id));

            const imagesToUpsert = data.variantImages.map((image, index) => ({
              url: image.url,
              size: image.size,
              fileName: image.fileName,
              blurThumb: image.blurThumb,
              order: index,
              variantId: id,
            }));

            const existingUrls = new Set(existingImages.map((img) => img.url));
            const newUrls = new Set(imagesToUpsert.map((img) => img.url));

            const imagesToDelete = existingImages.filter(
              (img) => !newUrls.has(img.url),
            );
            if (imagesToDelete.length > 0) {
              await tx.delete(variantImages).where(
                inArray(
                  variantImages.id,
                  imagesToDelete.map((img) => img.id),
                ),
              );
            }

            if (imagesToUpsert.length > 0) {
              updatedImages = await tx
                .insert(variantImages)
                .values(imagesToUpsert)
                .onConflictDoUpdate({
                  target: variantImages.url,
                  set: {
                    size: sql`excluded.size`,
                    fileName: sql`excluded.name`,
                    blurThumb: sql`excluded."blurThumb"`,
                    order: sql`excluded.order`,
                  },
                })
                .returning();
            } else {
              updatedImages = existingImages.filter((img) =>
                newUrls.has(img.url),
              );
            }
          }

          let updatedTags: VariantTagSelectType[] = [];
          if (data.tags) {
            const existingTags = await tx
              .select()
              .from(variantTags)
              .where(eq(variantTags.variantId, id));

            const tagsToUpsert = data.tags.map((tag) => ({
              variantId: id,
              tag,
            }));

            const existingTagNames = new Set(existingTags.map((t) => t.tag));
            const newTagNames = new Set(tagsToUpsert.map((t) => t.tag));

            const tagsToDelete = existingTags.filter(
              (t) => !newTagNames.has(t.tag),
            );
            if (tagsToDelete.length > 0) {
              await tx.delete(variantTags).where(
                inArray(
                  variantTags.id,
                  tagsToDelete.map((t) => t.id),
                ),
              );
            }

            const tagsToInsert = tagsToUpsert.filter(
              (t) => !existingTagNames.has(t.tag),
            );
            if (tagsToInsert.length > 0) {
              updatedTags = await tx
                .insert(variantTags)
                .values(tagsToInsert)
                .returning();
            } else {
              updatedTags = existingTags.filter((t) => newTagNames.has(t.tag));
            }
          }

          return {
            ...variant,
            variantImages: updatedImages,
            variantTags: updatedTags,
          };
        });
      }),
      Effect.map(ProductVariantModel.from),
      Effect.catchAll((error) => {
        console.error('Variant update error:', error);
        return Effect.fail(
          new AppNotFoundException(ErrorCodes.VARIANT_NOT_FOUND),
        );
      }),
    );
  }

  createWithRelations(
    data: CreateVariantRelationsInput,
  ): Effect.Effect<ProductVariantModel, Error> {
    return pipe(
      Effect.tryPromise(async () => {
        return await this.db.transaction(async (tx) => {
          const [variant] = await tx
            .insert(productVariants)
            .values(data.variant)
            .returning();

          if (data.images.length > 0) {
            const imagesWithOrder = data.images.map((image, index) => ({
              url: image.url,
              size: image.size,
              fileName: image.fileName,
              blurThumb: image.blurThumb,
              order: index,
              variantId: variant.id,
            }));
            await tx.insert(variantImages).values(imagesWithOrder);
          }

          if (data.tags.length > 0) {
            const tagsData = data.tags.map((tag) => ({
              variantId: variant.id,
              tag: tag,
            }));
            await tx.insert(variantTags).values(tagsData);
          }

          const result = await tx.query.productVariants.findFirst({
            where: eq(productVariants.id, variant.id),
            with: {
              variantImages: true,
              variantTags: true,
            },
          });

          if (!result) {
            throw new Error('Failed to create variant');
          }

          return result;
        });
      }),
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
