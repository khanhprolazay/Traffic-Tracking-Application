import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import * as dotenv from 'dotenv';
import { SsoClient } from './util/sso-client';

dotenv.config({ path: __dirname + '/../.env' });

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const PORT = process.env.PORT;
  const CORS_ORIGIN = process.env.CORS_ORIGIN;
  const KAFKA_SERVER = process.env.KAFKA_SERVER;

  app.enableCors();

  const client = app.get(SsoClient);
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: process.env.CLIENT_ID,
        brokers: [KAFKA_SERVER],
        sasl: {
          mechanism: 'oauthbearer',
          oauthBearerProvider: async () => ({ value: await client.getAccessToken() }),
        },
      },
      consumer: {
        groupId: 'proxy-consumer',
      },
    },
  });

  await app.startAllMicroservices();
  await app.listen(PORT);
}
bootstrap();
