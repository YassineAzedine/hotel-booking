import * as crypto from 'crypto';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as bodyParser from 'body-parser';
async function bootstrap() {

  const app = await NestFactory.create(AppModule);
    // ⬇ Augmenter la limite à 20mb (ou plus si besoin)
  app.use(bodyParser.json({ limit: '20mb' }));
  app.use(bodyParser.urlencoded({ limit: '20mb', extended: true }));
      // Enable global validation pipe
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,        // Strip properties not in the DTO
    forbidNonWhitelisted: true,  // Throw error if extra properties exist
    transform: true,        // Transform payloads to DTO instances
  }));
    const config = new DocumentBuilder()
    .setTitle('Hotel Booking API')
    .setDescription('API pour l\'application de réservation d\'hôtel')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
      const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // http://localhost:3000/api
 // Autoriser le frontend sur localhost:3001 à accéder à l'API
  app.enableCors({
    origin: 'http://localhost:3001',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true, // si tu utilises cookies ou authentification
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
