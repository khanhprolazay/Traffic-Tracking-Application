import { Controller, Get, Next, Post, Req, Res } from '@nestjs/common';
import * as proxy from 'express-http-proxy';

@Controller('api/v2')
export class InfluxController {

  private readonly influxProxy = proxy(`${process.env.INFLUX_SERVER}/api/v2`, {});

  @Post('*')
  proxy(@Req() req, @Res() res, @Next() next) {
    this.influxProxy(req, res, next);
  }
}
