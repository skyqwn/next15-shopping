import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DrizzleModule } from './drizzle/drizzle.module';
import { RedisModule } from './redis/redis.module';
import { MailModule } from './mail/mail.module';
import { UserModule } from './user/user.module';
import { ImagesModule } from './images/images.module';
import { LogMiddleware } from './middleware/log.middleware';
import { ProductsModule } from './products/products.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guard/jwt-auth.guard';
import { RolesGuard } from './user/guard/roles.guard';
import { PresentationModule } from './presentation/presentation.module';
import { ApplicationModule } from './application/application.module';
import { DomainModule } from './domain/domain.module';
import { InfrastructureModule } from './infrastructure/infrastructure.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DrizzleModule,
    AuthModule,
    RedisModule,
    MailModule,
    UserModule,
    ImagesModule,
    ProductsModule,
    PresentationModule,
    ApplicationModule,
    InfrastructureModule,
    DomainModule,
  ],
  providers: [
    ConfigService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LogMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
