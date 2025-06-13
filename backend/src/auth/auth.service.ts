import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { UserService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UserService,
  ) {}

  async register(registerDto: RegisterDto) {
    const userExists = await this.usersService.findByEmail(registerDto.email);
    if (userExists) throw new ConflictException('Email already registered');

    const hashedPassword = await bcrypt.hash(registerDto.password, 10);
    const createdUser = await this.usersService.create({
      ...registerDto,
      password: hashedPassword,
    });

    const { password, ...result } = createdUser;
    return result;
  }

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) return null;

    const isPasswordMatching = await bcrypt.compare(password, user.password);
    if (!isPasswordMatching) return null;

    const { password: _, ...result } = user;
    return result;
  }

async login(user: { email: string; id: number; role: string; [key: string]: any }) {
  const payload = { email: user.email, sub: user.id, role: user.role };

  const access_token = this.jwtService.sign(payload, {
    expiresIn: '1h',
  });

  // Retourne token + user (sans mot de passe ni données sensibles)
  const { password, ...userSafe } = user; // supprime password si présent

  return {
    access_token,
    user: userSafe,
  };
}
}
