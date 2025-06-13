import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Room } from '../../rooms/entities/room.entity';
export enum BookingStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  CANCELLED = 'cancelled',
  COMPLETED = 'completed',
}

@Entity('bookings')
export class Booking {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.bookings, { eager: true })
  user: User;

  @Column({ length: 100 })
  fullname: string;

  @ManyToOne(() => Room, room => room.bookings, { eager: true })
  room: Room;

  @Column({ nullable: true })
  phone: string;

  @Column('date')
  startDate: Date;

  @Column('date')
  endDate: Date;

  @Column({
    type: 'enum',
    enum: BookingStatus,
    default: BookingStatus.PENDING,
  })
  status: BookingStatus;
  @Column({ type: 'timestamp', nullable: true })
  cancelledAt: Date;
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
