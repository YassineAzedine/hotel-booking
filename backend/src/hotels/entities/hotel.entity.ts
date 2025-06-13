import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Room } from '../../rooms/entities/room.entity';

@Entity('hotels')
export class Hotel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 200 })
  name: string;

  @Column('text')
  description: string;

  @Column()
  address: string;

  @Column()
  city: string;

  @Column()
  region: string;

  @Column()
  country: string;

  @Column()
  zipCode: string;

  @Column({ type: 'float', nullable: true })
  latitude: number;

  @Column({ type: 'float', nullable: true })
  longitude: number;

  @Column()
  phone: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  website: string;

  @Column('simple-array') // Ex: "Wi-Fi,Pool,Gym"
  amenities: string[];

  @Column('simple-array') // Ex: URLs d'images
  images: string[];

  @Column({ nullable: true })
  mainImage: string;

  @Column()
  checkInTime: string;

  @Column()
  checkOutTime: string;

  @Column({ type: 'float', default: 0 })
  rating: number;

  @Column({ default: 0 })
  reviewsCount: number;

  @Column({ type: 'float' })
  pricePerNightFrom: number;

  @Column({ default: 'MAD' })
  currency: string;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => Room, room => room.hotel, { cascade: true })
  rooms: Room[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
