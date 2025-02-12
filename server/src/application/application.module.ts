import { Module } from '@nestjs/common';
import { DomainModule } from 'src/domain/domain.module';
import { UserFacade } from './facades';
import { InfrastructureModule } from 'src/infrastructure/infrastructure.module';

@Module({
  imports: [InfrastructureModule, DomainModule],
  providers: [UserFacade],
  exports: [UserFacade],
})
export class ApplicationModule {}
