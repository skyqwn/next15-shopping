import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { ZodValidationException } from 'nestjs-zod';
import { Response, Request } from 'express';

@Catch(ZodValidationException)
export class ZodExceptionFilter implements ExceptionFilter {
  catch(exception: ZodValidationException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const zodError = exception.getZodError();
    const formattedErrors = zodError.errors.map((err) => ({
      field: err.path.join('.'),
      message: err.message,
      code: err.code,
    }));

    console.log('\x1b[33m%s\x1b[0m', '🔍 Validation Error Details:');
    console.log('📍 Path:', request.path);
    console.log('📝 Method:', request.method);
    console.log('💾 Body:', JSON.stringify(request.body, null, 2));
    console.log(
      '\x1b[31m%s\x1b[0m',
      '❌ Validation Errors:',
      JSON.stringify(formattedErrors, null, 2),
    );
  }
}
