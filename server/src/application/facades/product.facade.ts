import { Injectable } from '@nestjs/common';
import { Effect } from 'effect';
import { ProductModel } from 'src/domain/model/product.model';
// import { SortOption } from 'src/domain/dtos';
import { CreateProductCriteria } from '../dtos/criteria/product/create-product-criteria';
import { UpdateProductCriteria } from '../dtos/criteria/product/update-product-criteria';
import { ProductService } from 'src/domain/service/product.service';

export type SortOption = 'popular' | 'latest' | 'price_high' | 'price_low';

@Injectable()
export class ProductFacade {
  constructor(private readonly productService: ProductService) {}

  createProduct(
    createProductCriteria: CreateProductCriteria,
  ): Effect.Effect<ProductModel, Error> {
    return this.productService.createProduct(createProductCriteria);
  }

  updateProduct(
    id: number,
    updateProductCriteria: UpdateProductCriteria,
  ): Effect.Effect<ProductModel, Error> {
    return this.productService.updateProduct(id, updateProductCriteria);
  }

  getProducts(params: {
    search?: string;
    sort?: string;
  }): Effect.Effect<ProductModel[], Error> {
    return this.productService.getProducts(params);
  }

  getProductById(id: number): Effect.Effect<ProductModel, Error> {
    return this.productService.getProductById(id);
  }

  deleteProduct(id: number): Effect.Effect<void, Error> {
    return this.productService.deleteProduct(id);
  }
}
