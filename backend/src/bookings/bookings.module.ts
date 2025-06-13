import { Module } from '@nestjs/common';
import { BookingService } from './bookings.service';
import { BookingController } from './bookings.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from './entities/booking.entity';
import { Room } from 'src/rooms/entities/room.entity';
import { User } from 'src/users/entities/user.entity';

@Module({
 imports: [
    TypeOrmModule.forFeature([Booking, User, Room]),  // Import all required entities here
  ],
  controllers: [BookingController],
  providers: [BookingService],
})
export class BookingsModule {}
