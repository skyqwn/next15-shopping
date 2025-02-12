import { Module } from '@nestjs/common';
import { UserRepository } from './repositories';
import { DrizzleModule } from 'src/drizzle/drizzle.module';

@Module({
  imports: [DrizzleModule],
  providers: [UserRepository],
  exports: [UserRepository, DrizzleModule],
})
export class DatabaseModule {}
