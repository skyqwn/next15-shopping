import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { eq } from 'drizzle-orm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { DRIZZLE } from 'src/infrastructure/drizzle/drizzle.module';
import { DrizzleDB } from 'src/infrastructure/drizzle/types/drizzle';
import { users } from 'src/infrastructure/drizzle/schema/schema';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    @Inject(DRIZZLE) private db: DrizzleDB,
    private jwtService: JwtService,
  ) {
    super({
      secretOrKey: process.env.JWT_SECRET,
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          // console.log('토큰 추출 시도:', request?.cookies);
          const token = request?.cookies?.accessToken;
          if (!token) {
            // console.log('토큰이 없음');
            return null;
          }
          try {
            const decoded = this.jwtService.verify(token);
            // console.log('토큰 검증 결과:', decoded);

            if (decoded.exp && decoded.exp * 1000 < Date.now()) {
              console.log('토큰 만료됨');
              return null;
            }

            return token;
          } catch (error) {
            console.error('토큰 검증 실패:', error);
            return null;
          }
        },
      ]),
      passReqToCallback: true,
    });
  }

  async validate(request: Request, payload: { userId: number }) {
    try {
      const user = await this.db.query.users.findFirst({
        where: eq(users.id, payload.userId),
      });

      console.log('JWT Strategy - 찾은 user:', user);

      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      return user;
    } catch (error) {
      console.error('JWT Strategy - 에러:', error);
      throw new UnauthorizedException('Invalid token');
    }
  }
}
