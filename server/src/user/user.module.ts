import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AuthModule } from 'src/auth/auth.module';
import { DrizzleModule } from 'src/drizzle/drizzle.module';

@Module({
  imports: [AuthModule, DrizzleModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
