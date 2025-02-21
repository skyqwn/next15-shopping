import { Module } from '@nestjs/common';
import { DomainModule } from 'src/domain/domain.module';
import { ImagesFacade, UserFacade, ProductFacade } from './facades';
import { InfrastructureModule } from 'src/infrastructure/infrastructure.module';

@Module({
  imports: [InfrastructureModule, DomainModule],
  providers: [UserFacade, ImagesFacade, ProductFacade],
  exports: [UserFacade, ImagesFacade, ProductFacade],
})
export class ApplicationModule {}
