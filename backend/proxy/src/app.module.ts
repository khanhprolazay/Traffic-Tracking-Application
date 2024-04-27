import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { HttpClient } from './util/http-client';
import { SsoClient } from './util/sso-client';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({ global: true }),
  ],
  controllers: [AppController],
  providers: [HttpClient, SsoClient],
})
export class AppModule {}
