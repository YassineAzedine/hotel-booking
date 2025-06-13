import { PartialType } from '@nestjs/swagger';
import { CreateBookingDto } from './create-booking.dto';

export class UpdateBookingDto extends PartialType(CreateBookingDto) {
  userId: any;
  roomId: any;
  startDate: any;
  endDate: any;
}
