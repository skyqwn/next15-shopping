import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Effect, pipe } from 'effect';
import { ProductFacade } from 'src/application/facades';

import { IsPublic } from 'src/common/decorators/is-public.decorator';
import { CreateProductDto } from '../dtos/product/request/create-product-request.dto';
import {
  CreateVariantRequestDto,
  UpdateVariantRequestDto,
} from '../dtos/variant/request';

@Controller('products')
export class ProductController {
  constructor(private readonly productFacade: ProductFacade) {}

  @Post()
  createProduct(@Body() createProductDto: CreateProductDto) {
    console.log(createProductDto);
    return pipe(
      this.productFacade.createProduct(createProductDto),
      Effect.map((product) => ({
        success: true,
        result: product,
        message: null,
      })),
      Effect.runPromise,
    );
  }

  @Get()
  @IsPublic()
  findAll() {
    return pipe(
      this.productFacade.findAll(),
      Effect.map((products) => ({
        success: true,
        result: products,
        message: products.length === 0 ? '찾는 상품이 없습니다' : null,
      })),
      Effect.runPromise,
    );
  }

  @Get('/filter')
  getProducts(@Query('q') search?: string, @Query('sort') sort?: any) {
    return pipe(
      this.productFacade.getProducts({ search, sort }),
      Effect.tap((products) =>
        console.log('Controller - Result:', products.length),
      ),

      Effect.map((products) => ({
        success: true,
        result: products,
        message: products.length === 0 ? '찾는 상품이 없습니다' : null,
      })),
      Effect.runPromise,
    );
  }

  @IsPublic()
  @Get(':id')
  getProduct(@Param('id') id: string) {
    return pipe(
      this.productFacade.getProductById(parseInt(id)),
      Effect.map((product) => ({
        success: true,
        result: product,
        message: null,
      })),
      Effect.runPromise,
    );
  }

  @Patch(':id')
  updateProduct(@Param('id') id: string, @Body() updateProductDto: any) {
    return pipe(
      this.productFacade.updateProduct(parseInt(id), updateProductDto),
      Effect.map((product) => ({
        success: true,
        result: product,
        message: null,
      })),
      Effect.runPromise,
    );
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: string) {
    return pipe(
      this.productFacade.deleteProduct(parseInt(id)),
      Effect.map(() => ({
        success: true,
        result: null,
        message: null,
      })),
      Effect.runPromise,
    );
  }

  @Post('variant')
  createVariant(@Body() createVariantDto: CreateVariantRequestDto) {
    console.log('createVariantDto', createVariantDto);
    return pipe(
      this.productFacade.createVariant(createVariantDto),
      Effect.map((variant) => ({
        success: true,
        result: variant,
        message: null,
      })),
      Effect.runPromise,
    );
  }

  @Patch('variant/:id')
  updateVariant(
    @Param('id') id: string,
    @Body() updateVariantDto: UpdateVariantRequestDto,
  ) {
    return pipe(
      this.productFacade.updateVariant(parseInt(id), updateVariantDto),
      Effect.map((variant) => ({
        success: true,
        result: variant,
        message: null,
      })),
      Effect.runPromise,
    );
  }

  @Delete('variant/:id')
  deleteVariant(@Param('id') id: string) {
    return pipe(
      this.productFacade.deleteVariant(parseInt(id)),
      Effect.map(() => ({
        success: true,
        result: null,
        message: null,
      })),
      Effect.runPromise,
    );
  }
}
