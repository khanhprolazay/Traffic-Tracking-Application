import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { GlobalModule } from './core/global.module';
import { CameraModule } from './camera/camera.module';
import { InfluxModule } from './influx/influx.module';

@Module({
  imports: [
    GlobalModule, 
    CameraModule,
    InfluxModule,
    JwtModule.register({ global: true })],
})
export class AppModule {}
