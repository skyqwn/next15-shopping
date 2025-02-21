import { Injectable } from '@nestjs/common';
import { pipe, Effect } from 'effect';

import { ProductRepository } from 'src/infrastructure/database/repositories/product.repository';
import { AppNotFoundException } from '../exceptions';
import { ErrorCodes } from 'src/common/error';
import { ProductCacheStore } from 'src/infrastructure/cache/store/product.cache.store';
import { CreateProductCommand, UpdateProductCommand } from '../dtos';

@Injectable()
export class ProductService {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly productCacheStore: ProductCacheStore,
  ) {}

  createProduct(createProductCommand: CreateProductCommand) {
    return pipe(
      this.productRepository.create({
        name: createProductCommand.name,
        brand: createProductCommand.brand,
        price: createProductCommand.price,
        immediatePrice: createProductCommand.immediatePrice,
        description: createProductCommand.description,
        category: createProductCommand.category,
        imageUrl: createProductCommand.imageUrl,
      }),
      Effect.tap((product) =>
        this.productCacheStore.cache(product.id.toString(), product),
      ),
    );
  }

  updateProduct(id: number, updateProductCommand: UpdateProductCommand) {
    return pipe(
      this.productRepository.update(id, {
        name: updateProductCommand.name,
        brand: updateProductCommand.brand,
        price: updateProductCommand.price,
        immediatePrice: updateProductCommand.immediatePrice,
        description: updateProductCommand.description,
        category: updateProductCommand.category,
        imageUrl: updateProductCommand.imageUrl,
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
}
