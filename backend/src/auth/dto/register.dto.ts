// src/auth/dto/register.dto.ts
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { UserRole } from 'src/users/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty()
    
  @IsString()
  @IsNotEmpty()
  firstName: string;
  @ApiProperty()

  @IsString()
  @IsNotEmpty()
  lastName: string;
  @ApiProperty()

  @IsEmail()
  email: string;
  @ApiProperty()

  @IsString()
  @MinLength(6)
  password: string;
  @ApiProperty()

  @IsOptional()
  @IsString()
  phone?: string;
     @IsOptional()
    @IsEnum(UserRole)
    role?: UserRole;
}



