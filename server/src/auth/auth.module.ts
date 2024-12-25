import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { DrizzleModule } from 'src/drizzle/drizzle.module';
import { JwtModule } from '@nestjs/jwt';
import { RedisModule } from 'src/redis/redis.module';
import { JwtStragegy } from './jwt.strategy';
import { MailModule } from 'src/mail/mail.module';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({}),
    DrizzleModule,
    RedisModule,
    MailModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStragegy],
  exports: [PassportModule, JwtStragegy],
})
export class AuthModule {}
