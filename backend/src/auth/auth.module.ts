import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { UsersModule } from 'src/users/users.module';

@Module({
    imports: [
    UsersModule, 
    JwtModule.register({
      secret: 'your_jwt_secret_key', // use env var in production
      signOptions: { expiresIn: '1d' }, // optional
    }),
  ],
  providers: [AuthService , JwtStrategy , ],
  controllers: [AuthController]
})
export class AuthModule {}
