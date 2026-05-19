import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { TrackingService } from './tracking.service';
import { CreateTrackingDto } from './dto/create-tracking.dto';
import { Tracking } from '../entities/tracking.entity';

@Controller('trackings')
export class TrackingController {
  constructor(private readonly trackingService: TrackingService) {}

  @Post()
  async create(@Body() createTrackingDto: CreateTrackingDto): Promise<Tracking> {
    return this.trackingService.create(createTrackingDto);
  }

  @Get('waybill/:waybillNo')
  async findByWaybillNo(@Param('waybillNo') waybillNo: string): Promise<Tracking[]> {
    return this.trackingService.findByWaybillNo(waybillNo);
  }
}
