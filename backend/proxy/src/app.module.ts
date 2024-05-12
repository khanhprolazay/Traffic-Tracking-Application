import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { GlobalModule } from './core/global.module';
import { CameraModule } from './camera/camera.module';

@Module({
  imports: [
    GlobalModule, 
    CameraModule,
    JwtModule.register({ global: true })],
})
export class AppModule {}
