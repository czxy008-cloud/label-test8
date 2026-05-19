import { IsString, IsNotEmpty, IsEnum, IsOptional } from 'class-validator';
import { TrackingStatus } from '../../entities/tracking.entity';

export class CreateTrackingDto {
  @IsString()
  @IsNotEmpty({ message: '运单号不能为空' })
  waybillNo: string;

  @IsEnum(TrackingStatus, { message: '状态值不正确' })
  @IsNotEmpty({ message: '物流状态不能为空' })
  status: TrackingStatus;

  @IsString()
  @IsNotEmpty({ message: '节点名称不能为空' })
  location: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  operator?: string;
}
