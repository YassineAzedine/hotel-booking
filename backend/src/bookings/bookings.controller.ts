import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  ParseIntPipe,
  UseGuards,
  Req,
} from '@nestjs/common';

import { BookingService } from '../bookings/bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { UserRole } from 'src/users/entities/user.entity';
import { Roles } from 'src/auth/roles.decorator';

@Controller('bookings')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  /**
   * Create a new booking.
   * @param createBookingDto - The data to create a new booking.
   * @returns The created booking.
   */
  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() createBookingDto: CreateBookingDto) {
    return this.bookingService.create(createBookingDto);
  }
  @UseGuards(JwtAuthGuard)
  @Get("my")
  findUserBookings(@Req() req) {
    const userId = req.user.userId;  // req.user vient du JWT après validation par JwtAuthGuard
   
    
    return this.bookingService.findByUserId(userId);
  }
 @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Get()
  findAll() {
    return this.bookingService.findAll();
  }
  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.bookingService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBookingDto: UpdateBookingDto,
  ) {
    return this.bookingService.update(id, updateBookingDto);
  }
  @UseGuards(JwtAuthGuard)
@Patch(':id/cancel')
cancelBooking(@Param('id') id: number, @Req() req) {
  return this.bookingService.cancelBooking(id, req.user.userId);
}

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.bookingService.remove(id);
  }
}
