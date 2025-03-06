import { Module } from '@nestjs/common';
import { DomainModule } from 'src/domain/domain.module';
import {
  ImagesFacade,
  UserFacade,
  ProductFacade,
  ReviewFacade,
  BannerFacade,
  OrderFacade,
} from './facades';
import { InfrastructureModule } from 'src/infrastructure/infrastructure.module';

@Module({
  imports: [InfrastructureModule, DomainModule],
  providers: [
    UserFacade,
    ImagesFacade,
    ProductFacade,
    ReviewFacade,
    BannerFacade,
    OrderFacade,
  ],
  exports: [
    UserFacade,
    ImagesFacade,
    ProductFacade,
    ReviewFacade,
    BannerFacade,
    OrderFacade,
  ],
})
export class ApplicationModule {}
