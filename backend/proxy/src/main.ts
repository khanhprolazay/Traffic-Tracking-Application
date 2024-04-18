import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import * as dotenv from 'dotenv';

dotenv.config({ path: __dirname+'/../.env' });

async function bootstrap() {
  const app = await NestFactory.create(AppModule);  

  const PORT = process.env.PORT;
  const KAFKA_SERVER = process.env.KAFKA_SERVER;

  app.enableCors({
    origin: 'http://localhost:3000'
  })

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: [KAFKA_SERVER],
      },
    },
  });

  await app.startAllMicroservices();
  await app.listen(PORT);
}
bootstrap();
