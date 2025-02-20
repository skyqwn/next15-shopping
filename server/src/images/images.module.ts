import { Module } from '@nestjs/common';
import { ImagesController } from './images.controller';
import { DrizzleModule } from 'src/infrastructure/drizzle/drizzle.module';

@Module({
  imports: [DrizzleModule],
  controllers: [ImagesController],
})
export class ImagesModule {}
