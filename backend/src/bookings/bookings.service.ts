import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Booking, BookingStatus } from './entities/booking.entity';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { User } from '../users/entities/user.entity';
import { Room } from '../rooms/entities/room.entity';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(Booking)
    private bookingRepository: Repository<Booking>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Room)
    private roomRepository: Repository<Room>,
  ) {}

  async create(createBookingDto: CreateBookingDto): Promise<Booking> {
    const user = await this.userRepository.findOneBy({ id: createBookingDto.userId });
    if (!user) {
      throw new NotFoundException(`User with id ${createBookingDto.userId} not found`);
    }

    const room = await this.roomRepository.findOneBy({ id: createBookingDto.roomId });
    if (!room) {
      throw new NotFoundException(`Room with id ${createBookingDto.roomId} not found`);
    }

    // Optional: check if the room is available for the given dates here

    const booking = this.bookingRepository.create({
      user,
      room,
      startDate: new Date(createBookingDto.startDate),
      endDate: new Date(createBookingDto.endDate),
      fullname: createBookingDto.fullname,  // Ensure property name matches entity
      phone: createBookingDto.phone,        // Ensure property name matches entity
    });

    return this.bookingRepository.save(booking);
  }

  async findAll(): Promise<Booking[]> {
    return this.bookingRepository.find({ relations: ['user', 'room'] });
  }
   async findByUserId(userId: number): Promise<Booking[]> {
    return this.bookingRepository.find({
      where: { user: { id: userId } },
      relations: ['room', 'user'],  // si tu veux eager relations aussi
    });
  }
   
  async findOne(id: number): Promise<Booking> {
    const booking = await this.bookingRepository.findOne({
      where: { id },
      relations: ['user', 'room'],
    });
    if (!booking) {
      throw new NotFoundException(`Booking with id ${id} not found`);
    }
    return booking;
  }

  async update(id: number, updateBookingDto: UpdateBookingDto): Promise<Booking> {
    const booking = await this.findOne(id);

    if (updateBookingDto.userId) {
      const user = await this.userRepository.findOneBy({ id: updateBookingDto.userId });
      if (!user) {
        throw new NotFoundException(`User with id ${updateBookingDto.userId} not found`);
      }
      booking.user = user;
    }

    if (updateBookingDto.roomId) {
      const room = await this.roomRepository.findOneBy({ id: updateBookingDto.roomId });
      if (!room) {
        throw new NotFoundException(`Room with id ${updateBookingDto.roomId} not found`);
      }
      booking.room = room;
    }

    if (updateBookingDto.startDate) {
      booking.startDate = new Date(updateBookingDto.startDate);
    }

    if (updateBookingDto.endDate) {
      booking.endDate = new Date(updateBookingDto.endDate);
    }

    return this.bookingRepository.save(booking);
  }
async cancelBooking(bookingId: number, userId: number): Promise<any> {
  const booking = await this.bookingRepository.findOne({
    where: { id: bookingId },
    relations: ['user'], // pour accéder à booking.user.id
  });
   console.log(userId);
   
  if (!booking) {
    throw new NotFoundException('Réservation non trouvée');
  }

  // Vérifie que la réservation appartient au user connecté
  if (booking.user.id !== userId) {
    throw new ForbiddenException("Vous n'avez pas le droit d'annuler cette réservation");
  }

  // Vérifie si déjà annulée
  if (booking.status === 'cancelled') {
    throw new BadRequestException('La réservation est déjà annulée');
  }

  // Met à jour le statut
  booking.status = BookingStatus.CANCELLED;
  booking.cancelledAt = new Date();

  await this.bookingRepository.save(booking);

  return {
    message: 'Réservation annulée avec succès',
    booking,
  };
}
  async remove(id: number): Promise<void> {
    const result = await this.bookingRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Booking with id ${id} not found`);
    }
  }
}
