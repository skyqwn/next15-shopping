import { Module } from '@nestjs/common';
import {
  UserController,
  ProductController,
  ImagesController,
  BannerController,
  OrderController,
} from './controller';
import { ApplicationModule } from 'src/application/application.module';
import { ReviewController } from './controller/review.controller';

@Module({
  imports: [ApplicationModule],
  controllers: [
    UserController,
    ImagesController,
    ProductController,
    ReviewController,
    BannerController,
    OrderController,
  ],
})
export class PresentationModule {}
