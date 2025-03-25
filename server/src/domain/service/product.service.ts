import { Injectable } from '@nestjs/common';
import { pipe, Effect } from 'effect';

import { ProductRepository } from 'src/infrastructure/database/repositories/product.repository';
import { AppNotFoundException } from '../exceptions';
import { ErrorCodes } from 'src/common/error';
import { ProductCacheStore } from 'src/infrastructure/cache/store/product.cache.store';
import { CreateProductCommand, UpdateProductCommand } from '../dtos';
import {
  CreateVariantCommand,
  UpdateVariantCommand,
} from '../dtos/commands/variant';
import { ProductVariantRepository } from 'src/infrastructure/database/repositories/variant.repository';
import { ProductModel } from '../model/product.model';

@Injectable()
export class ProductService {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly productVariantRepository: ProductVariantRepository,
    private readonly productCacheStore: ProductCacheStore,
  ) {}

  createProduct(createProductCommand: CreateProductCommand) {
    return pipe(
      this.productRepository.create({
        title: createProductCommand.title,
        price: createProductCommand.price,
        description: createProductCommand.description,
      }),
      Effect.tap((product) =>
        this.productCacheStore.cache(product.id.toString(), product),
      ),
    );
  }

  updateProduct(id: number, updateProductCommand: UpdateProductCommand) {
    return pipe(
      this.productRepository.update(id, {
        title: updateProductCommand.title,
        price: updateProductCommand.price,
        description: updateProductCommand.description,
        updatedAt: new Date(),
      }),
      Effect.tap((product) =>
        this.productCacheStore.cache(product.id.toString(), product),
      ),
      Effect.catchAll(() =>
        Effect.fail(new AppNotFoundException(ErrorCodes.PRODUCT_NOT_FOUND)),
      ),
    );
  }

  findAll() {
    return this.productRepository.findAll();
  }

  getProducts(params: {
    search?: string;
    sort?: string;
    page?: string;
    limit?: string;
  }) {
    return this.productRepository.findAllWithFilters(params);
  }

  getProductById(id: number) {
    return pipe(
      this.productRepository.findOneBy(id),
      Effect.flatMap((product) =>
        product
          ? Effect.succeed(product)
          : Effect.fail(new AppNotFoundException(ErrorCodes.PRODUCT_NOT_FOUND)),
      ),
    );
  }

  deleteProduct(id: number) {
    return pipe(
      this.productRepository.delete(id),
      Effect.tap(() => this.productCacheStore.remove(id.toString())),
      Effect.catchAll(() =>
        Effect.fail(new AppNotFoundException(ErrorCodes.PRODUCT_NOT_FOUND)),
      ),
    );
  }

  createVariant(createVariantCommand: CreateVariantCommand) {
    const input = {
      variant: {
        productId: createVariantCommand.productId,
        productType: createVariantCommand.productType,
        color: createVariantCommand.color,
      },
      images: createVariantCommand.variantImages.map((image, index) => ({
        ...image,
        order: index,
      })),
      tags: createVariantCommand.tags,
    };
    return pipe(
      this.productVariantRepository.createWithRelations(input),
      Effect.tap((result) =>
        Effect.sync(() => console.log('Created variant result:', result)),
      ),
      Effect.catchAll((error) => {
        console.error('Variant creation error:', error);
        return Effect.fail(new Error('Failed to create variant'));
      }),
    );
  }

  findAllVariants() {
    return this.productVariantRepository.findAll();
  }

  getVariantsWithFilters(params: {
    search?: string;
    sort?: string;
    page?: string;
    limit?: string;
  }) {
    return pipe(this.productVariantRepository.findAllWithFilters(params));
  }

  getVariantById(id: number) {
    return pipe(
      this.productVariantRepository.findOneBy(id),
      Effect.flatMap((variant) =>
        variant
          ? Effect.succeed(variant)
          : Effect.fail(new AppNotFoundException(ErrorCodes.VARIANT_NOT_FOUND)),
      ),
    );
  }

  updateVariant(id: number, updateVariantCommand: UpdateVariantCommand) {
    return pipe(
      this.productVariantRepository.update(id, {
        productType: updateVariantCommand.productType,
        color: updateVariantCommand.color,
        variantImages: updateVariantCommand.variantImages,
      }),
      Effect.tap((variant) =>
        Effect.sync(() => console.log('Updated variant:', variant)),
      ),
      Effect.catchAll((error) => {
        console.error('Variant update error:', error);
        return Effect.fail(new Error('Failed to update variant'));
      }),
    );
  }

  deleteVariant(id: number) {
    return pipe(
      this.productVariantRepository.delete(id),

      Effect.catchAll((error) => {
        console.error('Variant deletion error:', error);
        return Effect.fail(
          new AppNotFoundException(ErrorCodes.VARIANT_NOT_FOUND),
        );
      }),
    );
  }

  addViewedProduct(
    productId: number,
    userId: number,
  ): Effect.Effect<void, Error> {
    return pipe(
      this.productVariantRepository.findOneBy(productId),
      Effect.flatMap((product) =>
        product
          ? this.productCacheStore.addViewedProduct(userId, productId)
          : Effect.fail(new AppNotFoundException(ErrorCodes.PRODUCT_NOT_FOUND)),
      ),
      Effect.catchAll((error) => {
        console.error('Service - Add viewed product error:', error);
        return Effect.fail(error);
      }),
    );
  }

  getViewedProducts(userId: number): Effect.Effect<any[], Error> {
    return pipe(
      this.productCacheStore.getViewedProducts(userId),
      Effect.flatMap((variantIds) => {
        if (variantIds.length === 0) {
          return Effect.succeed([]);
        }
        return pipe(
          Effect.all(
            variantIds.map((id) =>
              pipe(
                this.productVariantRepository.findOneBy(id),
                Effect.catchAll((error) => {
                  return Effect.succeed(null);
                }),
              ),
            ),
          ),
          Effect.map((variants) => {
            const filteredVariants = variants.filter(Boolean);
            console.log(
              `Found ${filteredVariants.length} variants out of ${variantIds.length} IDs`,
            );
            return filteredVariants;
          }),
        );
      }),
      Effect.catchAll((error) => {
        console.error('Service - Get viewed products error:', error);
        return Effect.fail(error);
      }),
    );
  }
}
