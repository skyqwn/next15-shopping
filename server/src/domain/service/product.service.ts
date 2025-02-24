import { Injectable } from '@nestjs/common';
import { pipe, Effect } from 'effect';

import { ProductRepository } from 'src/infrastructure/database/repositories/product.repository';
import { AppNotFoundException } from '../exceptions';
import { ErrorCodes } from 'src/common/error';
import { ProductCacheStore } from 'src/infrastructure/cache/store/product.cache.store';
import { CreateProductCommand, UpdateProductCommand } from '../dtos';
import { CreateVariantCommand } from '../dtos/commands/variant';
import { ProductVariantRepository } from 'src/infrastructure/database/repositories/variant.repository';

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

  getProducts(params: { search?: string; sort?: string }) {
    return this.productRepository.findAllWithFilters(params);
  }

  getProductById(id: number) {
    return pipe(
      this.productCacheStore.findBy(id.toString()),
      Effect.flatMap((cachedProduct) =>
        cachedProduct
          ? Effect.succeed(cachedProduct)
          : pipe(
              this.productRepository.findOneBy(id),
              Effect.flatMap((product) =>
                product
                  ? pipe(
                      this.productCacheStore.cache(id.toString(), product),
                      Effect.map(() => product),
                    )
                  : Effect.fail(
                      new AppNotFoundException(ErrorCodes.PRODUCT_NOT_FOUND),
                    ),
              ),
            ),
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
    return pipe(
      this.getProductById(createVariantCommand.productId),
      Effect.flatMap(() =>
        this.productVariantRepository.createWithRelations({
          variant: {
            productId: createVariantCommand.productId,
            productType: createVariantCommand.productType,
            color: createVariantCommand.color,
          },
          images: createVariantCommand.variantImages,
          tags: createVariantCommand.tags,
        }),
      ),
      Effect.tap(() =>
        this.productCacheStore.remove(
          createVariantCommand.productId.toString(),
        ),
      ),
      Effect.catchAll((error) => {
        console.error('Variant creation error:', error);
        return Effect.fail(new Error('Failed to create variant'));
      }),
    );
  }
}
