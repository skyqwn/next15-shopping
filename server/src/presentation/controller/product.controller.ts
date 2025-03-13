import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { Effect, pipe } from 'effect';
import {
  ProductFacade,
  ProductResponse,
  ProductVariantResponse,
} from 'src/application/facades';

import { IsPublic } from 'src/common/decorators/is-public.decorator';
import { CreateProductDto } from '../dtos/product/request/create-product-request.dto';
import {
  CreateVariantRequestDto,
  UpdateVariantRequestDto,
} from '../dtos/variant/request';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { UserSelectType } from 'src/infrastructure/drizzle/schema/users.schema';

@Controller('products')
export class ProductController {
  constructor(private readonly productFacade: ProductFacade) {}

  @Get('variant')
  @IsPublic()
  getAllVariants() {
    return pipe(
      this.productFacade.findAllVariants(),
      Effect.map((variants) => ({
        success: true,
        result: variants,
        message: 'getVariants',
      })),
      Effect.runPromise,
    );
  }

  @Post('variant')
  createVariant(@Body() createVariantDto: CreateVariantRequestDto) {
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

  @Get('variant/filter')
  @IsPublic()
  getVariantsWithFilters(
    @Query('q') search?: string,
    @Query('sort') sort?: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    return pipe(
      this.productFacade.getVariantsWithFilters({ search, sort, page, limit }),
      Effect.tap((result) => console.log('Controller - Result:', result.data)),
      Effect.map((result: ProductVariantResponse) => ({
        success: true,
        result,
        message: result.data.length === 0 ? '찾는 상품 변형이 없습니다' : null,
      })),
      Effect.runPromise,
    );
  }

  @IsPublic()
  @Get('variant/:id')
  getVariantById(@Param('id') id: string) {
    return pipe(
      this.productFacade.getVariantById(parseInt(id)),
      Effect.map((variant) => ({
        success: true,
        result: variant,
        message: null,
      })),
      Effect.runPromise,
    );
  }

  @Patch('/variant/:id')
  updateVariant(
    @Param('id') id: string,
    @Body() updateVariantDto: UpdateVariantRequestDto,
  ) {
    console.log('editmode', updateVariantDto);
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

  @Delete('/variant/:id')
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

  @Post('viewed')
  addViewedProduct(@Body() body: { productId: number }, @GetUser() user: any) {
    return pipe(
      this.productFacade.addViewedProduct(body.productId, user.id),
      Effect.map(() => ({
        success: true,
        message: 'Added to viewed products',
      })),
      Effect.runPromise,
    );
  }

  @Get('viewed')
  getViewedProducts(@GetUser() user: UserSelectType) {
    return pipe(
      this.productFacade.getViewedProducts(user.id),
      Effect.map((products) => ({
        success: true,
        result: products,
        message: null,
      })),
      Effect.runPromise,
    );
  }
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
        message: products.length === 0 ? '찾는 상품이 없습니다' : 'getProduct',
      })),
      Effect.runPromise,
    );
  }

  @Get('/filter')
  getProducts(
    @Query('q') search?: string,
    @Query('sort') sort?: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    return pipe(
      this.productFacade.getProducts({ search, sort, page, limit }),
      Effect.map((result: ProductResponse) => ({
        success: true,
        result,
        message: result.data.length === 0 ? '찾는 상품이 없습니다' : null,
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
        message: '상품이 성공적으로 업데이트 되었습니다',
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
}
