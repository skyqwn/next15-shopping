import { Module } from '@nestjs/common';
import { InfrastructureModule } from 'src/infrastructure/infrastructure.module';
import { UserService } from './user.service';
import { ImagesService } from './images.service';
import { ProductService } from './product.service';
import { ReviewService } from './review.service';

@Module({
  imports: [InfrastructureModule],
  providers: [UserService, ImagesService, ProductService, ReviewService],
  exports: [UserService, ImagesService, ProductService, ReviewService],
})
export class ServiceModule {}
