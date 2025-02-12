import { Module } from '@nestjs/common';
import { InfrastructureModule } from 'src/infrastructure/infrastructure.module';
import { UserService } from './user.service';

@Module({
  imports: [InfrastructureModule],
  providers: [UserService],
  exports: [UserService],
})
export class ServiceModule {}
