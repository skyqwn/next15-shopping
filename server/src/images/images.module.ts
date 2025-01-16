import { Module } from '@nestjs/common';
import { ImagesController } from './images.controller';
import { DrizzleModule } from 'src/drizzle/drizzle.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [DrizzleModule, AuthModule],
  controllers: [ImagesController],
})
export class ImagesModule {}
