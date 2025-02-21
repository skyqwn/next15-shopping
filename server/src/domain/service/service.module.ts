import { Module } from '@nestjs/common';
import { InfrastructureModule } from 'src/infrastructure/infrastructure.module';
import { UserService } from './user.service';
import { ImagesService } from './images.service';
import { ProductService } from './product.service';

@Module({
  imports: [InfrastructureModule],
  providers: [UserService, ImagesService, ProductService],
  exports: [UserService, ImagesService, ProductService],
})
export class ServiceModule {}
