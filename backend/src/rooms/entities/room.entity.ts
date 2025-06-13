import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Hotel } from '../../hotels/entities/hotel.entity';
import { Booking } from '../../bookings/entities/booking.entity';

@Entity('rooms')
export class Room {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  roomNumber: string;
  @Column()
  title: string;
    @Column()
  description: string;
  @Column()
  type: string; // ex: Single, Double, Suite, etc.

  @Column('decimal', { precision: 8, scale: 2 })
  pricePerNight: number;

  @Column({ type: 'varchar', length: 3, default: 'MAD' })
  currency: string;

  @Column('int')
  maxOccupancy: number;
@Column('int')
  beds: number;
  @Column()
  bedType: string;

  @Column("simple-array") // stocke un tableau de strings en CSV
  amenities: string[];

  @Column({ default: true })
  isAvailable: boolean;

  @Column("simple-array")
  images: string[];

  @ManyToOne(() => Hotel, hotel => hotel.rooms)
  hotel: Hotel;

  @OneToMany(() => Booking, booking => booking.room)
  bookings: Booking[];
}
