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
      isGlobal: true, // rend ConfigModule accessible partout
    }),
TypeOrmModule.forRootAsync({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (config: ConfigService) => ({
    type: 'postgres',
    url: config.get<string>('DATABASE_URL'),
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true,
    ssl: {
      rejectUnauthorized: false,  // important pour Render car certificat auto-signé
    },
  }),
}),

    RoomsModule,
    HotelsModule,
    UsersModule,
    BookingsModule,
    AuthModule,
  ],
})
export class AppModule {}
