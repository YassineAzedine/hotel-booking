import { IsNotEmpty, IsNumber, IsString, IsArray, IsBoolean, IsOptional } from 'class-validator';

export class CreateRoomDto {
  @IsString()
  @IsNotEmpty()
  roomNumber: string;

   @IsString()
  @IsNotEmpty()
  description: string;
 @IsString()
  @IsNotEmpty()
  title: string;
  @IsNumber()
  pricePerNight: number;
  @IsNumber()
  beds: number;
  @IsNumber()
  hotelId: number;

  @IsString()
  @IsNotEmpty()
  type: string;

  @IsString()
  @IsOptional()
  currency?: 'MAD';  // tu peux forcer ou laisser optionnel

  @IsNumber()
  maxOccupancy: number;

  @IsString()
  bedType: string;

  @IsArray()
  @IsString({ each: true })
  amenities: string[];

  @IsBoolean()
  @IsOptional()
  isAvailable?: boolean;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  images?: string[];
}
