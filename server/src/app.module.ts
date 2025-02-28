import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { LogMiddleware } from './middleware/log.middleware';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { PresentationModule } from './presentation/presentation.module';
import { ApplicationModule } from './application/application.module';
import { DomainModule } from './domain/domain.module';
import { InfrastructureModule } from './infrastructure/infrastructure.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthGuard } from './infrastructure/auth/guards/jwt-auth.guard';
import { DrizzleModule } from './infrastructure/drizzle/drizzle.module';
import { EffectInterceptor } from './presentation/interceptors/effect.interceptor';
import { ErrorsInterceptor } from './presentation/interceptors/errors.interceptor';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DrizzleModule,
    PresentationModule,
    ApplicationModule,
    InfrastructureModule,
    DomainModule,
    JwtModule.registerAsync({
      global: true,
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: '1d' },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [
    ConfigService,
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: ErrorsInterceptor,
    // },
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: EffectInterceptor,
    // },
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
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
