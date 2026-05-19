import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThan } from 'typeorm';
import * as dayjs from 'dayjs';
import { Tracking } from '../entities/tracking.entity';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  constructor(
    @InjectRepository(Tracking)
    private readonly trackingRepository: Repository<Tracking>,
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT, {
    name: 'clean_old_tracking_data',
    timeZone: 'Asia/Shanghai',
  })
  async cleanOldTrackingData() {
    this.logger.log('开始清理超过90天的历史物流轨迹数据...');

    try {
      const cutoffDate = dayjs.tz().subtract(90, 'day').toDate();
      const result = await this.trackingRepository.delete({
        createdAt: LessThan(cutoffDate),
      });

      this.logger.log(`清理完成，共删除 ${result.affected} 条历史物流轨迹数据`);
    } catch (error) {
      this.logger.error('清理历史物流轨迹数据失败:', error);
    }
  }
}
