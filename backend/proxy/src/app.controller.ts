import { Controller, Sse } from '@nestjs/common';
import { Observable, Subject, map } from 'rxjs';
import { Ctx, EventPattern, KafkaContext } from '@nestjs/microservices';
import { StreetUpdatePayload } from './type';
import { FileUtil } from './util/file.util';

@Controller()
export class AppController {
  private subject = new Subject<any>();

  @EventPattern("street.streaming")
  onStreetStreaming(@Ctx() context: KafkaContext) {
    const message = context.getMessage();
    const camera_id = message.key.toString();
    const frameEncoded = message.value.toString();
    FileUtil.writeBase64Image(`./public/${camera_id}.jpg`, frameEncoded);
  }

  @EventPattern("street.update")
  onStretUpdate(payload: StreetUpdatePayload) {
    this.subject.next(payload);
  }

  @Sse('sse')
  sse(): Observable<MessageEvent> {
    return this.subject.pipe(map((data) => ({ data }) as MessageEvent));
  }
}
