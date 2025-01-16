import { Controller, Post } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async createPost(createProductdto: CreateProductDto) {
    await this.productsService.createProduct(createProductdto);
  }
}
