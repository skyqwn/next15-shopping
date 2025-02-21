import { Module } from '@nestjs/common';
import {
  UserController,
  ProductController,
  ImagesController,
} from './controller';
import { ApplicationModule } from 'src/application/application.module';

@Module({
  imports: [ApplicationModule],
  controllers: [UserController, ImagesController, ProductController],
})
export class PresentationModule {}
