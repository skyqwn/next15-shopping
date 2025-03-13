import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { ZodValidationException } from 'nestjs-zod';
import { ZodSchema } from 'zod';

@Injectable()
export class CustomZodValidationPipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    try {
      const dto = metadata.metatype as { schema?: ZodSchema };
      if (!dto?.schema) return value;

      const schema: ZodSchema = dto.schema;
      const result = await schema.safeParseAsync(value);

      if (!result.success) {
        console.log('Validation Error:', JSON.stringify(result.error, null, 2));
        throw new ZodValidationException(result.error);
      }

      return result.data;
    } catch (error) {
      if (error instanceof ZodValidationException) {
        throw error;
      }
      throw new ZodValidationException(error);
    }
  }
}
