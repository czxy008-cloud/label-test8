import { IsString, IsNotEmpty, IsOptional, IsNumber, Min } from 'class-validator';

export class CreateWaybillDto {
  @IsString()
  @IsNotEmpty({ message: '寄件人姓名不能为空' })
  senderName: string;

  @IsString()
  @IsNotEmpty({ message: '寄件人电话不能为空' })
  senderPhone: string;

  @IsString()
  @IsNotEmpty({ message: '寄件人地址不能为空' })
  senderAddress: string;

  @IsString()
  @IsNotEmpty({ message: '收件人姓名不能为空' })
  receiverName: string;

  @IsString()
  @IsNotEmpty({ message: '收件人电话不能为空' })
  receiverPhone: string;

  @IsString()
  @IsNotEmpty({ message: '收件人地址不能为空' })
  receiverAddress: string;

  @IsOptional()
  @IsNumber({}, { message: '重量必须是数字' })
  @Min(0, { message: '重量不能小于0' })
  weight?: number;

  @IsOptional()
  @IsString()
  remark?: string;
}
