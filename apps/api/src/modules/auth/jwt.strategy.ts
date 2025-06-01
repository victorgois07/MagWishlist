import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import type { JwtFromRequestFunction, StrategyOptions } from 'passport-jwt';
import { ExtractJwt, Strategy } from 'passport-jwt';

interface JwtPayload {
  sub: string;
  email: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    const jwtFromRequest: JwtFromRequestFunction =
      ExtractJwt.fromAuthHeaderAsBearerToken();

    const options: StrategyOptions = {
      jwtFromRequest,
      ignoreExpiration: false,
      secretOrKey:
        process.env.JWT_SECRET ?? 'dev_jwt_secret_key_change_in_production',
    };

    super(options);
  }

  validate(payload: JwtPayload) {
    return { userId: payload.sub, email: payload.email };
  }
}
