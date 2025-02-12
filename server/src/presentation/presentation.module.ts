import { Module } from '@nestjs/common';
import { UserController } from './controller';
import { ApplicationModule } from 'src/application/application.module';

@Module({
  imports: [ApplicationModule],
  controllers: [UserController],
})
export class PresentationModule {}
