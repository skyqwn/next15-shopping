import { Injectable } from '@nestjs/common';
import { Effect } from 'effect';
import { ProductModel } from 'src/domain/model/product.model';
// import { SortOption } from 'src/domain/dtos';
import { CreateProductCriteria } from '../dtos/criteria/product/create-product-criteria';
import { UpdateProductCriteria } from '../dtos/criteria/product/update-product-criteria';
import { ProductService } from 'src/domain/service/product.service';
import {
  CreateVariantCriteria,
  UpdateVariantCriteria,
} from '../dtos/criteria/variant';
import { ProductVariantModel } from 'src/domain/model/product-variant.model';

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

  findAll(): Effect.Effect<ProductModel[], Error> {
    return this.productService.findAll();
  }

  getProducts(params: {
    search?: string;
    sort?: string;
  }): Effect.Effect<ProductModel[], Error> {
    console.log(`Facade - Search Params: ${params}`);
    return this.productService.getProducts(params);
  }

  getProductById(id: number): Effect.Effect<ProductModel, Error> {
    return this.productService.getProductById(id);
  }

  deleteProduct(id: number): Effect.Effect<void, Error> {
    return this.productService.deleteProduct(id);
  }

  createVariant(
    createVariantCriteria: CreateVariantCriteria,
  ): Effect.Effect<ProductVariantModel, Error> {
    return this.productService.createVariant(createVariantCriteria);
  }

  getVariantsWithFilters(params: { search?: string; sort?: string }) {
    return this.productService.getVariantsWithFilters(params);
  }

  findAllVariants(): Effect.Effect<ProductVariantModel[], Error> {
    return this.productService.findAllVariants();
  }

  getVariantById(id: number): Effect.Effect<ProductVariantModel, Error> {
    return this.productService.getVariantById(id);
  }

  updateVariant(
    id: number,
    updateVariantCriteria: UpdateVariantCriteria,
  ): Effect.Effect<ProductVariantModel, Error> {
    return this.productService.updateVariant(id, updateVariantCriteria);
  }

  deleteVariant(id: number): Effect.Effect<void, Error> {
    return this.productService.deleteVariant(id);
  }
}
