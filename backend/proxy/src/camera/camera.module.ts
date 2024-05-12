import { Module } from '@nestjs/common';
import { CameraController } from './camera.controller';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      serveRoot: '/public/images',
      rootPath: join(__dirname, 'public', 'images'),
    }),
  ],
  controllers: [CameraController],
})
export class CameraModule {}
