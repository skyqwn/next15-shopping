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

@Controller('products')
export class ProductController {
  constructor(private readonly productFacade: ProductFacade) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  createProduct(@Body() createProductDto: any) {
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

  @IsPublic()
  @Get()
  getProducts(@Query('q') search?: string, @Query('sort') sort?: string) {
    return pipe(
      this.productFacade.getProducts({ search, sort }),
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
  @UseGuards(AuthGuard('jwt'))
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
  @UseGuards(AuthGuard('jwt'))
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
}
