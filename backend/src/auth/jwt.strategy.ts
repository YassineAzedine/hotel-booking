// src/auth/jwt.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'your_jwt_secret_key', // à remplacer par process.env.JWT_SECRET si tu veux
    });
  }

  async validate(payload: any) {
    // Ce qui sera disponible dans req.user
    return { userId: payload.sub, email: payload.email , role: payload.role  };
  }
}
