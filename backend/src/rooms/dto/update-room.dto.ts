import { PartialType } from '@nestjs/swagger';
import { CreateRoomDto } from './create-room.dto';
import { FindOperator } from 'typeorm';

export class UpdateRoomDto extends PartialType(CreateRoomDto) {

}
