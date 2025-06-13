import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Hotel } from './entities/hotel.entity';
import { CreateHotelDto } from './dto/create-hotel.dto';
import { UpdateHotelDto } from './dto/update-hotel.dto';

@Injectable()
export class HotelService {
  constructor(
    @InjectRepository(Hotel)
    private hotelRepository: Repository<Hotel>,
  ) {}

  async create(createHotelDto: CreateHotelDto): Promise<Hotel> {
    const hotel = this.hotelRepository.create(createHotelDto);
    return this.hotelRepository.save(hotel);
  }

  async findAll(): Promise<Hotel[]> {
    return this.hotelRepository.find({ relations: ['rooms'] });
  }

  async findOne(id: number): Promise<Hotel> {
    const hotel = await this.hotelRepository.findOne({
      where: { id },
      relations: ['rooms'],
    });
    if (!hotel) {
      throw new NotFoundException(`Hotel with id ${id} not found`);
    }
    return hotel;
  }

  async update(id: number, updateHotelDto: UpdateHotelDto): Promise<Hotel> {
    const hotel = await this.findOne(id);
    Object.assign(hotel, updateHotelDto);
    return this.hotelRepository.save(hotel);
  }

  async remove(id: number): Promise<void> {
    const result = await this.hotelRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Hotel with id ${id} not found`);
    }
  }
}
