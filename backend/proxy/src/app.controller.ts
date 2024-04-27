import { Controller, Get, Sse } from '@nestjs/common';
import { Observable, Subject, map } from 'rxjs';
import { MessagePattern } from '@nestjs/microservices';
import { StreetUpdatePayload, TOPIC } from './type';

@Controller()
export class AppController {
  private subject = new Subject<any>();
  constructor() {}

  @MessagePattern(TOPIC.STREET_UPDATE)
  onStretUpdate(payload: StreetUpdatePayload) {
    this.subject.next(payload);
  }

  @Sse('stream')
  eventStream(): Observable<MessageEvent> {
    return this.subject
      .asObservable()
      .pipe(map((data) => ({ data }) as MessageEvent));
  }
}
