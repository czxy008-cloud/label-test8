import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tracking, TrackingStatus } from '../entities/tracking.entity';
import { Waybill, WaybillStatus } from '../entities/waybill.entity';
import { CreateTrackingDto } from './dto/create-tracking.dto';

@Injectable()
export class TrackingService {
  constructor(
    @InjectRepository(Tracking)
    private readonly trackingRepository: Repository<Tracking>,
    @InjectRepository(Waybill)
    private readonly waybillRepository: Repository<Waybill>,
  ) {}

  async create(createTrackingDto: CreateTrackingDto): Promise<Tracking> {
    const waybill = await this.waybillRepository.findOne({
      where: { waybillNo: createTrackingDto.waybillNo },
    });
    if (!waybill) {
      throw new NotFoundException('运单不存在');
    }

    const tracking = this.trackingRepository.create({
      waybillId: waybill.id,
      status: createTrackingDto.status,
      location: createTrackingDto.location,
      description: createTrackingDto.description,
      operator: createTrackingDto.operator,
    });

    const savedTracking = await this.trackingRepository.save(tracking);

    const waybillStatusMap: Record<TrackingStatus, WaybillStatus> = {
      [TrackingStatus.PICKED]: WaybillStatus.PICKED,
      [TrackingStatus.TRANSIT]: WaybillStatus.TRANSIT,
      [TrackingStatus.ARRIVED]: WaybillStatus.TRANSIT,
      [TrackingStatus.DELIVERING]: WaybillStatus.DELIVERING,
      [TrackingStatus.DELIVERED]: WaybillStatus.DELIVERED,
    };

    const newStatus = waybillStatusMap[createTrackingDto.status];
    if (newStatus) {
      waybill.status = newStatus;
      await this.waybillRepository.save(waybill);
    }

    return savedTracking;
  }

  async findByWaybillNo(waybillNo: string): Promise<Tracking[]> {
    const waybill = await this.waybillRepository.findOne({
      where: { waybillNo },
    });
    if (!waybill) {
      throw new NotFoundException('运单不存在');
    }

    return this.trackingRepository.find({
      where: { waybillId: waybill.id },
      order: { createdAt: 'DESC' },
    });
  }
}
