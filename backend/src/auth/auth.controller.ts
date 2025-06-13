// src/auth/auth.controller.ts
import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  Get,
  HttpCode,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { UserService } from 'src/users/users.service';
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
   
  constructor(private authService: AuthService , private usersService: UserService) {}
  @ApiBody({ type: RegisterDto })
  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }
  @ApiBody({ type: LoginDto })
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const user = await this.authService.validateUser(
      loginDto.email,
      loginDto.password,
    );

    if (!user) {
      // Renvoie une vraie erreur 401 avec message
      throw new UnauthorizedException('Invalid credentials');
    }

    // Retourne le token JWT et d’autres infos sécurisées
    return this.authService.login(user);
  }

@UseGuards(AuthGuard('jwt'))
@Get('profile')
async getProfile(@Request() req) {
  const userId = req.user.userId;

  // Récupérer l'utilisateur complet en base via userId
  const user = await this.usersService.findOne(userId);

  return { user }; // Retourne l'objet complet
}

  // Logout in JWT stateless apps means client removes token.
  // If you want blacklist token on server, implement here.
  @UseGuards(AuthGuard('jwt'))
  @Post('logout')
  logout(@Request() req) {
    // Just a dummy endpoint; implement token blacklist if needed.
    return { message: 'Logged out successfully' };
  }
}
