import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { eq } from 'drizzle-orm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { DRIZZLE } from 'src/drizzle/drizzle.module';
import { users } from 'src/drizzle/schema/users.schema';
import { DrizzleDB } from 'src/drizzle/types/drizzle';
import { Request } from 'express';

@Injectable()
export class JwtStragegy extends PassportStrategy(Strategy) {
  constructor(@Inject(DRIZZLE) private db: DrizzleDB) {
    super({
      secretOrKey: process.env.JWT_SECRET,
      // jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request?.cookies?.accessToken;
        },
      ]),
    });
  }

  async validate(payload: { email: string }) {
    const { email } = payload;
    const user = await this.db.query.users.findFirst({
      where: eq(users.email, email),
    });
    console.log(user);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
