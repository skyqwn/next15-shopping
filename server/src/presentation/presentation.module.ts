import { Module } from '@nestjs/common';
import { UserController } from './controller';
import { ApplicationModule } from 'src/application/application.module';
import { ImagesController } from './controller/images.controller';

@Module({
  imports: [ApplicationModule],
  controllers: [UserController, ImagesController],
})
export class PresentationModule {}
