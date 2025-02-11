import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto, PatchProductDto } from './dto/create-product.dto';
import { AdminGuard } from 'src/user/guard/admin.guard';
import { IsPublic } from 'src/common/decorators/is-public.decorator';

@Controller('/products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @UseGuards(AdminGuard)
  @Post('/create')
  async createPost(@Body() createProductdto: CreateProductDto) {
    return await this.productsService.createProduct(createProductdto);
  }

  @UseGuards(AdminGuard)
  @Get('')
  async getProducts() {
    return await this.productsService.getProducts();
  }

  @UseGuards(AdminGuard)
  @Get('/:id')
  async getProductDetail(@Param('id', ParseIntPipe) id: number) {
    console.log(id);
    return await this.productsService.getProductDetail(id);
  }
  @UseGuards(AdminGuard)
  @Patch('/:id')
  async patchProductDetail(
    @Param('id', ParseIntPipe) id: number,
    @Body() patchProductDto: PatchProductDto,
  ) {
    return await this.productsService.patchProductDetail(id, patchProductDto);
  }
  @UseGuards(AdminGuard)
  @Delete('/:id')
  async deleteProduct(@Param('id', ParseIntPipe) id: number) {
    return await this.productsService.deleteProduct(id);
  }
}
