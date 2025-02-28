import { Module } from '@nestjs/common';
import { DomainModule } from 'src/domain/domain.module';
import {
  ImagesFacade,
  UserFacade,
  ProductFacade,
  ReviewFacade,
} from './facades';
import { InfrastructureModule } from 'src/infrastructure/infrastructure.module';

@Module({
  imports: [InfrastructureModule, DomainModule],
  providers: [UserFacade, ImagesFacade, ProductFacade, ReviewFacade],
  exports: [UserFacade, ImagesFacade, ProductFacade, ReviewFacade],
})
export class ApplicationModule {}
