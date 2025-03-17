import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ZodValidationPipe } from 'nestjs-zod';
import * as cookieParser from 'cookie-parser';
import { SuccessResponseInterceptor } from './common/interceptors/success-response.interceptor';
import { GlobalExceptionFilter } from './common/exception-filter/global-exception.filter';
import { ZodExceptionFilter } from './infrastructure/drizzle/filters/zod-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());

  // app.useGlobalInterceptors(new SuccessResponseInterceptor());
  app.useGlobalFilters(new GlobalExceptionFilter());
  app.useGlobalFilters(new ZodExceptionFilter());
  app.useGlobalPipes(new ZodValidationPipe());
  const environment = process.env.NODE_ENV;

  let corsOrigin;

  if (environment === 'production') {
    corsOrigin = process.env.CLIENT_URL;
    console.log(`Production environment: CORS origin set to ${corsOrigin}`);
  } else {
    corsOrigin = 'http://localhost:3000';
    console.log(`Development environment: CORS origin set to ${corsOrigin}`);
  }

  app.enableCors({
    origin: corsOrigin,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
  });

  app.setGlobalPrefix('/api');
  await app.listen(4000);
}
bootstrap();
