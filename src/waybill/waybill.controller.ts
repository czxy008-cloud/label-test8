import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { WaybillService } from './waybill.service';
import { CreateWaybillDto } from './dto/create-waybill.dto';
import { Waybill } from '../entities/waybill.entity';

@Controller('waybills')
export class WaybillController {
  constructor(private readonly waybillService: WaybillService) {}

  @Post()
  async create(@Body() createWaybillDto: CreateWaybillDto): Promise<Waybill> {
    return this.waybillService.create(createWaybillDto);
  }

  @Get(':waybillNo')
  async findByWaybillNo(@Param('waybillNo') waybillNo: string): Promise<Waybill> {
    return this.waybillService.findByWaybillNo(waybillNo);
  }
}
