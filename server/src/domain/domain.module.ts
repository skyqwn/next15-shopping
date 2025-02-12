import { Module } from '@nestjs/common';
import { ServiceModule } from './service/service.module';

@Module({
  imports: [ServiceModule],
  exports: [ServiceModule],
})
export class DomainModule {}
