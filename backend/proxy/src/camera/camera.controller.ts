import { Controller, OnModuleInit, Param, Sse } from '@nestjs/common';
import { Observable, Subject, filter, interval, map, switchMap } from 'rxjs';
import { Ctx, EventPattern, KafkaContext } from '@nestjs/microservices';
import { FileUtil } from 'src/core/util/file.util';
import { StreetUpdatePayload } from './interfaces/kafka-message.interface';
import { join } from 'path';

@Controller('camera')
export class CameraController implements OnModuleInit {
  constructor(private readonly fileUtil: FileUtil) {}

  private subject = new Subject<any>();
  private images = new Subject<any>();
  private cameras = {};
  private ids = [];

  onModuleInit() {
    interval(12000).subscribe((_) => this.ids.forEach((id) => this.save(id)));
  }

  @EventPattern('camera.streaming')
  onStreetStreaming(@Ctx() context: KafkaContext) {
    const message = context.getMessage();
    const id = message.key.toString();
    const frame = message.value.toString();

    this.cameras[id] = frame;
    if (!this.ids.includes(id)) {
      this.ids.push(id);
    }
    this.images.next({ id, frame });
  }

  @EventPattern('camera.update')
  onStretUpdate(payload: StreetUpdatePayload) {
    this.subject.next(payload);
  }

  @Sse('sse')
  sse(): Observable<MessageEvent> {
    return this.subject.pipe(map((data) => ({ data }) as MessageEvent));
  }

  @Sse('sse/image/:id')
  sseImages(@Param('id') id: string): Observable<MessageEvent> {
    return this.images.pipe(
      filter((data) => data.id === id),
      map((data) => data.frame as MessageEvent),
    );
  }

  private save(id: string) {
    this.fileUtil.write({
      folder: join(__dirname, 'public', 'images'),
      fileName: `${id}.jpeg`,
      fileType: 'base64',
      data: this.cameras[id],
    });
  }
}
