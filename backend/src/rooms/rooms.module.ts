import { Module } from '@nestjs/common';
import { RoomService } from '../rooms/rooms.service';
import { RoomController } from './rooms.controller';
import { Room } from './entities/room.entity';
import { Hotel } from 'src/hotels/entities/hotel.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [
    TypeOrmModule.forFeature([Room, Hotel])  // <-- Ici on importe les entités (repositories)
  ],
  controllers: [RoomController],
  providers: [RoomService],
})
export class RoomsModule {}
