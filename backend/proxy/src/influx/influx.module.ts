import { Module } from '@nestjs/common';
import { InfluxController } from './influx.controller';

@Module({
  controllers: [InfluxController],
})
export class InfluxModule {}
