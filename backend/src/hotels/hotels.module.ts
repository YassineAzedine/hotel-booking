import { Module } from '@nestjs/common';
import { HotelService } from './hotels.service';
import { HotelController } from './hotels.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hotel } from './entities/hotel.entity';

@Module({
    imports: [
    TypeOrmModule.forFeature([Hotel])  // Import du repository ici
  ],
  controllers: [HotelController],
  providers: [HotelService],
})
export class HotelsModule {}
