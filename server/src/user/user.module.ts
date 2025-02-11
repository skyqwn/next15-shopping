import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AuthModule } from 'src/auth/auth.module';
import { DrizzleModule } from 'src/drizzle/drizzle.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStragegy } from 'src/auth/strategies/jwt.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [AuthModule, DrizzleModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
