import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { WaybillModule } from './waybill/waybill.module';
import { TrackingModule } from './tracking/tracking.module';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'logistics',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: false,
      timezone: '+08:00',
    }),
    ScheduleModule.forRoot(),
    WaybillModule,
    TrackingModule,
    TasksModule,
  ],
})
export class AppModule {}
