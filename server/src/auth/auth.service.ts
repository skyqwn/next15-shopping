import { Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/create-auth.dto';

@Injectable()
export class AuthService {
  signin(body: RegisterDto) {
    return console.log(body);
  }

  signup(body: any) {
    return console.log(body);
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
