/*
  Warnings:

  - Added the required column `action_type` to the `AuditLog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `resource_type` to the `AuditLog` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AuditLog" ADD COLUMN     "action_type" TEXT NOT NULL,
ADD COLUMN     "error_details" TEXT,
ADD COLUMN     "ip_address" TEXT,
ADD COLUMN     "related_user_id" UUID,
ADD COLUMN     "resource_id" UUID,
ADD COLUMN     "resource_type" TEXT NOT NULL,
ADD COLUMN     "severity_level" TEXT NOT NULL DEFAULT 'info',
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'success',
ADD COLUMN     "user_agent" TEXT;

-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "completed_at" TIMESTAMP(3),
ADD COLUMN     "error_code" TEXT,
ADD COLUMN     "error_message" TEXT,
ADD COLUMN     "last_retry_at" TIMESTAMP(3),
ADD COLUMN     "monitoring_status" TEXT NOT NULL DEFAULT 'normal',
ADD COLUMN     "processing_time" INTEGER,
ADD COLUMN     "retry_count" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "started_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "TransferMonitoring" (
    "id" UUID NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "interval_start" TIMESTAMP(3) NOT NULL,
    "interval_end" TIMESTAMP(3) NOT NULL,
    "total_transfers" INTEGER NOT NULL,
    "successful_transfers" INTEGER NOT NULL,
    "failed_transfers" INTEGER NOT NULL,
    "total_amount" DECIMAL(19,2) NOT NULL,
    "avg_processing_time" INTEGER NOT NULL,
    "max_processing_time" INTEGER NOT NULL,
    "error_count" INTEGER NOT NULL,
    "warning_count" INTEGER NOT NULL,
    "most_common_error" TEXT,
    "most_common_error_count" INTEGER,
    "system_health_status" TEXT NOT NULL DEFAULT 'healthy',

    CONSTRAINT "TransferMonitoring_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SystemConfig" (
    "id" UUID NOT NULL,
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "description" TEXT,
    "category" TEXT NOT NULL,
    "last_updated_at" TIMESTAMP(3) NOT NULL,
    "last_updated_by" UUID NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "max_retry_attempts" INTEGER NOT NULL DEFAULT 3,
    "processing_time_threshold" INTEGER NOT NULL DEFAULT 30000,
    "error_rate_threshold" DECIMAL(5,4) NOT NULL DEFAULT 0.05,
    "warning_threshold" DECIMAL(5,4) NOT NULL DEFAULT 0.10,
    "default_daily_limit" DECIMAL(19,2) NOT NULL DEFAULT 100000,
    "default_monthly_limit" DECIMAL(19,2) NOT NULL DEFAULT 1000000,
    "max_daily_limit" DECIMAL(19,2) NOT NULL DEFAULT 500000,
    "max_monthly_limit" DECIMAL(19,2) NOT NULL DEFAULT 5000000,

    CONSTRAINT "SystemConfig_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "TransferMonitoring_timestamp_idx" ON "TransferMonitoring"("timestamp");

-- CreateIndex
CREATE INDEX "TransferMonitoring_interval_start_interval_end_idx" ON "TransferMonitoring"("interval_start", "interval_end");

-- CreateIndex
CREATE UNIQUE INDEX "SystemConfig_key_key" ON "SystemConfig"("key");

-- CreateIndex
CREATE INDEX "SystemConfig_category_idx" ON "SystemConfig"("category");

-- CreateIndex
CREATE INDEX "AuditLog_user_id_performed_at_idx" ON "AuditLog"("user_id", "performed_at");

-- CreateIndex
CREATE INDEX "AuditLog_action_type_performed_at_idx" ON "AuditLog"("action_type", "performed_at");

-- CreateIndex
CREATE INDEX "AuditLog_resource_type_resource_id_idx" ON "AuditLog"("resource_type", "resource_id");

-- CreateIndex
CREATE INDEX "AuditLog_severity_level_performed_at_idx" ON "AuditLog"("severity_level", "performed_at");
