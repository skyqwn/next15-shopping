import { Module } from '@nestjs/common';
import { InfrastructureModule } from 'src/infrastructure/infrastructure.module';
import { UserService } from './user.service';
import { ImagesService } from './images.service';

@Module({
  imports: [InfrastructureModule],
  providers: [UserService, ImagesService],
  exports: [UserService, ImagesService],
})
export class ServiceModule {}
