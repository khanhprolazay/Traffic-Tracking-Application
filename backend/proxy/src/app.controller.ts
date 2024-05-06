import { Controller, Sse } from '@nestjs/common';
import { Observable, Subject, map } from 'rxjs';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { StreetUpdatePayload, TOPIC } from './type';
// import { Response } from 'express';

@Controller()
export class AppController {
  private subject = new Subject<any>();
  private streaming = new Subject<any>();

  constructor() {}

  @MessagePattern(TOPIC.STREET_STREAMING)
  onStreetStreaming(@Payload() imageBase64Encoded: any) {
    this.streaming.next(imageBase64Encoded);
  }

  @MessagePattern(TOPIC.STREET_UPDATE)
  onStretUpdate(payload: StreetUpdatePayload) {
    this.subject.next(payload);
  }

  @Sse('sse')
  sse(): Observable<MessageEvent> {
    return this.subject.pipe(map((data) => ({ data }) as MessageEvent));
  }

  // @Get('stream')
  // stream(@Res() res: Response) {
  //   this.streaming
  //     .pipe(first())
  //     .subscribe((imageBase64Encoded) => res.send({ image: imageBase64Encoded }));
  // }
}
