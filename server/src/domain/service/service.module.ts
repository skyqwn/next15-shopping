import { Module } from '@nestjs/common';
import { InfrastructureModule } from 'src/infrastructure/infrastructure.module';
import { UserService } from './user.service';
import { ImagesService } from './images.service';
import { ProductService } from './product.service';
import { ReviewService } from './review.service';
import { BannerService } from './banner.service';
import { OrderService } from './order.service';

@Module({
  imports: [InfrastructureModule],
  providers: [
    UserService,
    ImagesService,
    ProductService,
    ReviewService,
    BannerService,
    OrderService,
  ],
  exports: [
    UserService,
    ImagesService,
    ProductService,
    ReviewService,
    BannerService,
    OrderService,
  ],
})
export class ServiceModule {}
