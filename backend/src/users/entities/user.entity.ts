import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Booking } from '../../bookings/entities/booking.entity';
export enum UserRole {
  ADMIN = 'admin',
  OWNER = 'owner',
  USER = 'user',
  
}
@Entity('users')  // nom de la table MySQL
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  firstName: string;

  @Column({ length: 100 })
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  phone?: string;

  @OneToMany(() => Booking, booking => booking.user)
  bookings: Booking[];
  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
  role: UserRole;
}
