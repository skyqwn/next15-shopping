import { Controller, Get } from '@nestjs/common';
import { IsPublic } from 'src/common/decorators/is-public.decorator';

@IsPublic()
@Controller('health')
export class HealthCheckController {
  @Get()
  check() {
    return { status: 'ok' };
  }
}
