import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { GlobalModule } from './core/global.module';
import { CameraModule } from './camera/camera.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    GlobalModule, 
    CameraModule,
    ServeStaticModule.forRoot({
      serveRoot: '/public/images', 
      rootPath: join(__dirname, 'public', 'images')
    }),
    JwtModule.register({ global: true })],
})
export class AppModule {}
