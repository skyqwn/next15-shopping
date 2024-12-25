import { Controller, Get, Post, Query } from '@nestjs/common';
import { MailService } from './mail.service';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Get('/verify-email')
  async verifyEmail(
    @Query('token') token: string,
    @Query('email') email: string,
  ) {
    return this.mailService.verifyEmail(email);
  }
}
