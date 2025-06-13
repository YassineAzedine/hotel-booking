import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestModule } from './test/test.module';
import { Room } from './rooms/entities/room.entity';
import { RoomsModule } from './rooms/rooms.module';
import { HotelsModule } from './hotels/hotels.module';
import { User } from './users/entities/user.entity';
import { UsersModule } from './users/users.module';
import { BookingsModule } from './bookings/bookings.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,  // rend ConfigModule accessible partout
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: config.get<'mysql'>('DB_TYPE'),
        host: config.get<string>('DB_HOST'),
        port: config.get<number>('DB_PORT'),
        username: config.get<string>('DB_USERNAME'),
        password: config.get<string>('DB_PASSWORD'),
        database: config.get<string>('DB_DATABASE'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,  // à désactiver en prod
      }),
    }),
  
    RoomsModule , 
    HotelsModule ,
    UsersModule,
    BookingsModule,
    AuthModule, // module pour les réservations
    // autres modules
  ],
})
export class AppModule {}
