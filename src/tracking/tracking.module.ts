import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tracking } from '../entities/tracking.entity';
import { Waybill } from '../entities/waybill.entity';
import { TrackingController } from './tracking.controller';
import { TrackingService } from './tracking.service';

@Module({
  imports: [TypeOrmModule.forFeature([Tracking, Waybill])],
  controllers: [TrackingController],
  providers: [TrackingService],
})
export class TrackingModule {}
