import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Tracking } from './tracking.entity';

export enum WaybillStatus {
  PENDING = 'pending',
  PICKED = 'picked',
  TRANSIT = 'transit',
  DELIVERING = 'delivering',
  DELIVERED = 'delivered',
}

@Entity('waybills')
export class Waybill {
  @PrimaryGeneratedColumn({ type: 'bigint', comment: '主键ID' })
  id: number;

  @Column({ type: 'varchar', length: 32, unique: true, comment: '运单号', name: 'waybill_no' })
  waybillNo: string;

  @Column({ type: 'varchar', length: 50, comment: '寄件人姓名', name: 'sender_name' })
  senderName: string;

  @Column({ type: 'varchar', length: 20, comment: '寄件人电话', name: 'sender_phone' })
  senderPhone: string;

  @Column({ type: 'varchar', length: 255, comment: '寄件人地址', name: 'sender_address' })
  senderAddress: string;

  @Column({ type: 'varchar', length: 50, comment: '收件人姓名', name: 'receiver_name' })
  receiverName: string;

  @Column({ type: 'varchar', length: 20, comment: '收件人电话', name: 'receiver_phone' })
  receiverPhone: string;

  @Column({ type: 'varchar', length: 255, comment: '收件人地址', name: 'receiver_address' })
  receiverAddress: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0, comment: '货物重量(kg)' })
  weight: number;

  @Column({
    type: 'enum',
    enum: WaybillStatus,
    default: WaybillStatus.PENDING,
    comment: '运单状态: pending-待揽收, picked-已揽收, transit-运输中, delivering-派送中, delivered-已签收',
  })
  status: WaybillStatus;

  @Column({ type: 'text', nullable: true, comment: '备注' })
  remark: string;

  @CreateDateColumn({ type: 'datetime', comment: '创建时间', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime', comment: '更新时间', name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => Tracking, (tracking) => tracking.waybill)
  trackings: Tracking[];
}
