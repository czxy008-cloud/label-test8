import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { Waybill } from './waybill.entity';

export enum TrackingStatus {
  PICKED = 'picked',
  TRANSIT = 'transit',
  ARRIVED = 'arrived',
  DELIVERING = 'delivering',
  DELIVERED = 'delivered',
}

@Entity('trackings')
export class Tracking {
  @PrimaryGeneratedColumn({ type: 'bigint', comment: '主键ID' })
  id: number;

  @Column({ type: 'bigint', comment: '运单ID', name: 'waybill_id' })
  waybillId: number;

  @Column({
    type: 'enum',
    enum: TrackingStatus,
    comment: '物流状态: picked-已揽收, transit-运输中, arrived-已到达, delivering-派送中, delivered-已签收',
  })
  status: TrackingStatus;

  @Column({ type: 'varchar', length: 100, comment: '节点名称（转运中心/站点）' })
  location: string;

  @Column({ type: 'varchar', length: 255, nullable: true, comment: '详细描述' })
  description: string;

  @Column({ type: 'varchar', length: 50, nullable: true, comment: '操作员' })
  operator: string;

  @CreateDateColumn({ type: 'datetime', comment: '创建时间', name: 'created_at' })
  createdAt: Date;

  @ManyToOne(() => Waybill, (waybill) => waybill.trackings)
  @JoinColumn({ name: 'waybill_id' })
  waybill: Waybill;
}
