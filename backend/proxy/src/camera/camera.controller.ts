import { Controller, Sse } from '@nestjs/common';
import { Observable, Subject, map } from 'rxjs';
import { Ctx, EventPattern, KafkaContext } from '@nestjs/microservices';
import { FileUtil } from 'src/core/util/file.util';
import { StreetUpdatePayload } from './interfaces/kafka-message.interface';
import { join } from 'path';

@Controller('camera')
export class CameraController {
  constructor(private readonly fileUtil: FileUtil) {}

  private subject = new Subject<any>();

  @EventPattern('camera.streaming')
  onStreetStreaming(@Ctx() context: KafkaContext) {
    const message = context.getMessage();
    const camera_id = message.key.toString();
    const frameEncoded = message.value.toString();

    this.fileUtil.write({
      folder: join(__dirname, 'public', 'images'),
      fileName: `${camera_id}.jpg`,
      fileType: 'base64',
      data: frameEncoded,
    });
  }

  @EventPattern('camera.update')
  onStretUpdate(payload: StreetUpdatePayload) {
    this.subject.next(payload);
  }

  @Sse('sse')
  sse(): Observable<MessageEvent> {
    return this.subject.pipe(map((data) => ({ data }) as MessageEvent));
  }

  
}
