import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as dayjs from 'dayjs';
import { Waybill, WaybillStatus } from '../entities/waybill.entity';
import { CreateWaybillDto } from './dto/create-waybill.dto';

@Injectable()
export class WaybillService {
  constructor(
    @InjectRepository(Waybill)
    private readonly waybillRepository: Repository<Waybill>,
  ) {}

  async create(createWaybillDto: CreateWaybillDto): Promise<Waybill> {
    const waybill = this.waybillRepository.create({
      ...createWaybillDto,
      waybillNo: this.generateWaybillNo(),
      status: WaybillStatus.PENDING,
    });
    return this.waybillRepository.save(waybill);
  }

  async findOne(id: number): Promise<Waybill> {
    const waybill = await this.waybillRepository.findOne({ where: { id } });
    if (!waybill) {
      throw new NotFoundException('运单不存在');
    }
    return waybill;
  }

  async findByWaybillNo(waybillNo: string): Promise<Waybill> {
    const waybill = await this.waybillRepository.findOne({
      where: { waybillNo },
      relations: ['trackings'],
    });
    if (!waybill) {
      throw new NotFoundException('运单不存在');
    }
    return waybill;
  }

  async updateStatus(id: number, status: WaybillStatus): Promise<Waybill> {
    const waybill = await this.findOne(id);
    waybill.status = status;
    return this.waybillRepository.save(waybill);
  }

  private generateWaybillNo(): string {
    const dateStr = dayjs.tz().format('YYYYMMDD');
    const random = Math.floor(Math.random() * 100000000).toString().padStart(8, '0');
    return `SF${dateStr}${random}`;
  }
}
