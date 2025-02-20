import { Module } from '@nestjs/common';
import { DomainModule } from 'src/domain/domain.module';
import { ImagesFacade, UserFacade } from './facades';
import { InfrastructureModule } from 'src/infrastructure/infrastructure.module';

@Module({
  imports: [InfrastructureModule, DomainModule],
  providers: [UserFacade, ImagesFacade],
  exports: [UserFacade, ImagesFacade],
})
export class ApplicationModule {}
