import { IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateBookingDto {
  @IsNumber()
  userId: number;

  @IsNumber()
  roomId: number;
  
  @IsDateString()
  startDate: string;

  @IsDateString()
  endDate: string;

  @IsString()
  @IsNotEmpty()
  fullname: string;

  @IsString()
  @IsNotEmpty()
  phone: string;
}
