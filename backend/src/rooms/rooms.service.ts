import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Room } from './entities/room.entity';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { Hotel } from '../hotels/entities/hotel.entity';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(Room)
    private roomRepository: Repository<Room>,
    @InjectRepository(Hotel)
    private hotelRepository: Repository<Hotel>,
  ) {}

  async create(createRoomDto: CreateRoomDto): Promise<Room> {
    console.log('Creating room with DTO:', createRoomDto);
    console.log('Found hotel:', createRoomDto.hotelId);
    const hotel = await this.hotelRepository.findOneBy({ id: createRoomDto.hotelId });
   
    if (!hotel) {
      throw new NotFoundException(`Hotel with id ${createRoomDto.hotelId} not found`);
    }

const room = this.roomRepository.create({
  title: createRoomDto.title,
  description: createRoomDto.description,
  beds  : createRoomDto.beds,
  roomNumber: createRoomDto.roomNumber,
  type: createRoomDto.type,
  pricePerNight: createRoomDto.pricePerNight,
  currency: createRoomDto.currency || 'MAD',  // valeur par défaut si besoin
  maxOccupancy: createRoomDto.maxOccupancy,
  bedType: createRoomDto.bedType,
  amenities: createRoomDto.amenities,  // tableau de string
  isAvailable: createRoomDto.isAvailable !== undefined ? createRoomDto.isAvailable : true,
  images: createRoomDto.images,  // tableau de string
  hotel,
});

    return this.roomRepository.save(room);
  }

  async findAll(): Promise<Room[]> {
    return this.roomRepository.find({ relations: ['hotel'] });
  }

  async findOne(id: number): Promise<Room> {
    const room = await this.roomRepository.findOne({
      where: { id },
      relations: ['hotel'],
    });
    if (!room) {
      throw new NotFoundException(`Room with id ${id} not found`);
    }
    return room;
  }

  async update(id: number, updateRoomDto: UpdateRoomDto): Promise<Room> {
    const room = await this.findOne(id);

    if (updateRoomDto.hotelId) {
      const hotel = await this.hotelRepository.findOneBy({ id: updateRoomDto.hotelId });
      if (!hotel) {
        throw new NotFoundException(`Hotel with id ${updateRoomDto.hotelId} not found`);
      }
      room.hotel = hotel;
    }

    Object.assign(room, updateRoomDto);
    return this.roomRepository.save(room);
  }

  async remove(id: number): Promise<void> {
    const result = await this.roomRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Room with id ${id} not found`);
    }
  }
}
