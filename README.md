# 物流快递追踪微服务

一个轻量级的物流快递追踪微服务，使用 NestJS + MySQL 开发。

## 技术栈

- **框架**: NestJS 10.x
- **数据库**: MySQL 8.0+
- **ORM**: TypeORM
- **包管理**: npm
- **定时任务**: @nestjs/schedule

## 项目结构

```
├── src/
│   ├── entities/          # 数据库实体
│   │   ├── waybill.entity.ts    # 运单实体
│   │   └── tracking.entity.ts # 物流轨迹实体
│   ├── waybill/           # 运单模块
│   │   ├── dto/
│   │   ├── waybill.controller.ts
│   │   ├── waybill.service.ts
│   │   └── waybill.module.ts
│   ├── tracking/          # 物流轨迹模块
│   │   ├── dto/
│   │   ├── tracking.controller.ts
│   │   ├── tracking.service.ts
│   │   └── tracking.module.ts
│   ├── tasks/             # 定时任务模块
│   │   ├── tasks.service.ts
│   │   └── tasks.module.ts
│   ├── app.module.ts
│   └── main.ts
├── sql/
│   └── schema.sql         # 数据库建表脚本
├── package.json
├── tsconfig.json
└── nest-cli.json
```

## 功能模块

### 1. 运单管理
- 运单录入：自动生成唯一运单号（格式：SF + 日期 + 8位随机数）
- 运单查询：根据运单号查询运单详情及轨迹

### 2. 物流轨迹管理
- 物流节点更新：模拟快递在不同转运中心的状态流转
- 轨迹查询：按运单号查询完整物流轨迹

### 3. 定时任务
- 每天凌晨自动清理超过90天的历史物流轨迹数据

## 状态流转

| 物流状态 | 说明 |
|-----------|------|
| picked | 已揽收 |
| transit | 运输中 |
| arrived | 已到达 |
| delivering | 派送中 |
| delivered | 已签收 |

## 数据库配置

修改 `src/app.module.ts` 中的数据库连接配置：

```typescript
TypeOrmModule.forRoot({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'logistics',
  // ...
})
```

## 安装与运行

```bash
# 安装依赖
npm install

# 初始化数据库
mysql -u root -p < sql/schema.sql

# 开发模式
npm run start:dev

# 生产模式
npm run build
npm run start:prod
```

## API 接口

### 1. 运单录入

**POST** `/waybills`

请求体：
```json
{
  "senderName": "张三",
  "senderPhone": "13800138000",
  "senderAddress": "北京市朝阳区xxx",
  "receiverName": "李四",
  "receiverPhone": "13900139000",
  "receiverAddress": "上海市浦东新区xxx",
  "weight": 2.5,
  "remark": "易碎品"
}
```

### 2. 运单查询

**GET** `/waybills/:waybillNo`

### 3. 物流节点更新

**POST** `/trackings`

请求体：
```json
{
  "waybillNo": "SF2026051912345678",
  "status": "picked",
  "location": "北京转运中心",
  "description": "快件已揽收",
  "operator": "王师傅"
}
```

### 4. 运单轨迹查询

**GET** `/trackings/waybill/:waybillNo`
