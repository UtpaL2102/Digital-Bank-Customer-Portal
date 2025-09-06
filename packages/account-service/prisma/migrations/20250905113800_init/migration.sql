-- CreateTable
CREATE TABLE "Branch" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "address" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Branch_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Employee" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "branch_id" UUID NOT NULL,
    "position" TEXT,

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Account" (
    "id" UUID NOT NULL,
    "account_number" TEXT NOT NULL,
    "account_type" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'active',
    "balance" DECIMAL(19,2) NOT NULL,
    "daily_limit" DECIMAL(19,2),
    "monthly_limit" DECIMAL(19,2),
    "user_id" UUID NOT NULL,
    "branch_id" UUID,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "closed_at" TIMESTAMP(3),

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Beneficiary" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "bank_name" TEXT,
    "account_number" TEXT NOT NULL,
    "ifsc_swift" TEXT,
    "currency" TEXT NOT NULL DEFAULT 'INR',
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Beneficiary_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transaction" (
    "id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "amount" DECIMAL(19,2) NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "type" TEXT NOT NULL DEFAULT 'transfer',
    "description" TEXT,
    "idempotency_key" TEXT,
    "from_account_id" UUID NOT NULL,
    "to_account_id" UUID,
    "to_beneficiary_id" UUID,
    "initiated_by" UUID NOT NULL,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Statement" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "account_id" UUID NOT NULL,
    "date_from" TIMESTAMP(3) NOT NULL,
    "date_to" TIMESTAMP(3) NOT NULL,
    "format" TEXT NOT NULL DEFAULT 'PDF',
    "delivery" TEXT NOT NULL DEFAULT 'download',
    "file_url" TEXT,
    "status" TEXT NOT NULL DEFAULT 'completed',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Statement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ScheduledTransfer" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "from_account_id" UUID NOT NULL,
    "to_account_id" UUID,
    "to_beneficiary_id" UUID,
    "amount" DECIMAL(19,2) NOT NULL,
    "description" TEXT,
    "frequency" TEXT NOT NULL DEFAULT 'monthly',
    "next_run_at" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3),
    "occurrences_left" INTEGER,
    "status" TEXT NOT NULL DEFAULT 'active',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ScheduledTransfer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Dispute" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "transaction_id" UUID NOT NULL,
    "reason" TEXT NOT NULL,
    "description" TEXT,
    "status" TEXT NOT NULL DEFAULT 'submitted',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "resolved_at" TIMESTAMP(3),
    "resolution_note" TEXT,

    CONSTRAINT "Dispute_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DisputeAttachment" (
    "id" UUID NOT NULL,
    "dispute_id" UUID NOT NULL,
    "file_url" TEXT NOT NULL,
    "file_hash" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DisputeAttachment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LimitRequest" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "account_id" UUID NOT NULL,
    "current_daily_limit" DECIMAL(19,2),
    "current_monthly_limit" DECIMAL(19,2),
    "requested_daily_limit" DECIMAL(19,2),
    "requested_monthly_limit" DECIMAL(19,2),
    "reason" TEXT,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "decided_at" TIMESTAMP(3),
    "reviewer_employee_id" UUID,
    "decision_note" TEXT,

    CONSTRAINT "LimitRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LimitRequestEvent" (
    "id" UUID NOT NULL,
    "limit_request_id" UUID NOT NULL,
    "action" TEXT NOT NULL,
    "actor_user_id" UUID,
    "actor_employee_id" UUID,
    "note" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LimitRequestEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Loan" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "account_id" UUID NOT NULL,
    "branch_id" UUID NOT NULL,
    "amount" DECIMAL(19,2) NOT NULL,
    "interest_rate" DECIMAL(5,2) NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3),
    "status" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Loan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notification" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "type" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'unread',
    "sent_at" TIMESTAMP(3),

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuditLog" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "action" TEXT NOT NULL,
    "details" TEXT,
    "performed_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AuditLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Branch_code_key" ON "Branch"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Account_account_number_key" ON "Account"("account_number");

-- CreateIndex
CREATE INDEX "Transaction_from_account_id_created_at_idx" ON "Transaction"("from_account_id", "created_at");

-- CreateIndex
CREATE INDEX "Transaction_to_account_id_created_at_idx" ON "Transaction"("to_account_id", "created_at");

-- CreateIndex
CREATE INDEX "Transaction_to_beneficiary_id_created_at_idx" ON "Transaction"("to_beneficiary_id", "created_at");

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_branch_id_fkey" FOREIGN KEY ("branch_id") REFERENCES "Branch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_branch_id_fkey" FOREIGN KEY ("branch_id") REFERENCES "Branch"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_from_account_id_fkey" FOREIGN KEY ("from_account_id") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_to_account_id_fkey" FOREIGN KEY ("to_account_id") REFERENCES "Account"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_to_beneficiary_id_fkey" FOREIGN KEY ("to_beneficiary_id") REFERENCES "Beneficiary"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Statement" ADD CONSTRAINT "Statement_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScheduledTransfer" ADD CONSTRAINT "ScheduledTransfer_from_account_id_fkey" FOREIGN KEY ("from_account_id") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScheduledTransfer" ADD CONSTRAINT "ScheduledTransfer_to_account_id_fkey" FOREIGN KEY ("to_account_id") REFERENCES "Account"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScheduledTransfer" ADD CONSTRAINT "ScheduledTransfer_to_beneficiary_id_fkey" FOREIGN KEY ("to_beneficiary_id") REFERENCES "Beneficiary"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dispute" ADD CONSTRAINT "Dispute_transaction_id_fkey" FOREIGN KEY ("transaction_id") REFERENCES "Transaction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DisputeAttachment" ADD CONSTRAINT "DisputeAttachment_dispute_id_fkey" FOREIGN KEY ("dispute_id") REFERENCES "Dispute"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LimitRequest" ADD CONSTRAINT "LimitRequest_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LimitRequest" ADD CONSTRAINT "LimitRequest_reviewer_employee_id_fkey" FOREIGN KEY ("reviewer_employee_id") REFERENCES "Employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LimitRequestEvent" ADD CONSTRAINT "LimitRequestEvent_limit_request_id_fkey" FOREIGN KEY ("limit_request_id") REFERENCES "LimitRequest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Loan" ADD CONSTRAINT "Loan_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Loan" ADD CONSTRAINT "Loan_branch_id_fkey" FOREIGN KEY ("branch_id") REFERENCES "Branch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
