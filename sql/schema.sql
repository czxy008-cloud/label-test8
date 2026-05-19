-- =============================================
-- 物流快递追踪系统 - 数据库建表脚本
-- 数据库: MySQL 8.0+
-- =============================================

-- 创建数据库
CREATE DATABASE IF NOT EXISTS logistics DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE logistics;

-- =============================================
-- 表1: waybills - 运单主表
-- 描述: 存储运单的基本信息
-- =============================================
DROP TABLE IF EXISTS waybills;
CREATE TABLE waybills (
    id BIGINT NOT NULL AUTO_INCREMENT COMMENT '主键ID',
    waybill_no VARCHAR(32) NOT NULL COMMENT '运单号（唯一）',
    sender_name VARCHAR(50) NOT NULL COMMENT '寄件人姓名',
    sender_phone VARCHAR(20) NOT NULL COMMENT '寄件人电话',
    sender_address VARCHAR(255) NOT NULL COMMENT '寄件人地址',
    receiver_name VARCHAR(50) NOT NULL COMMENT '收件人姓名',
    receiver_phone VARCHAR(20) NOT NULL COMMENT '收件人电话',
    receiver_address VARCHAR(255) NOT NULL COMMENT '收件人地址',
    weight DECIMAL(10,2) DEFAULT 0.00 COMMENT '货物重量(kg)',
    status ENUM('pending', 'picked', 'transit', 'delivering', 'delivered') DEFAULT 'pending' COMMENT '运单状态: pending-待揽收, picked-已揽收, transit-运输中, delivering-派送中, delivered-已签收',
    remark TEXT NULL COMMENT '备注',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    PRIMARY KEY (id),
    UNIQUE KEY uk_waybill_no (waybill_no),
    KEY idx_status (status),
    KEY idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='运单主表';

-- =============================================
-- 表2: trackings - 物流轨迹表
-- 描述: 存储运单的物流节点流转信息
-- =============================================
DROP TABLE IF EXISTS trackings;
CREATE TABLE trackings (
    id BIGINT NOT NULL AUTO_INCREMENT COMMENT '主键ID',
    waybill_id BIGINT NOT NULL COMMENT '运单ID（关联waybills表）',
    status ENUM('picked', 'transit', 'arrived', 'delivering', 'delivered') NOT NULL COMMENT '物流状态: picked-已揽收, transit-运输中, arrived-已到达, delivering-派送中, delivered-已签收',
    location VARCHAR(100) NOT NULL COMMENT '节点名称（转运中心/站点）',
    description VARCHAR(255) NULL COMMENT '详细描述',
    operator VARCHAR(50) NULL COMMENT '操作员',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    PRIMARY KEY (id),
    KEY idx_waybill_id (waybill_id),
    KEY idx_created_at (created_at),
    CONSTRAINT fk_trackings_waybill FOREIGN KEY (waybill_id) REFERENCES waybills(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='物流轨迹表';

-- =============================================
-- 索引说明:
-- 1. waybills.uk_waybill_no: 确保运单号唯一
-- 2. waybills.idx_status: 按状态快速筛选运单
-- 3. waybills.idx_created_at: 按创建时间范围查询
-- 4. trackings.idx_waybill_id: 按运单ID快速查询轨迹
-- 5. trackings.idx_created_at: 定时任务清理历史数据使用
-- =============================================
