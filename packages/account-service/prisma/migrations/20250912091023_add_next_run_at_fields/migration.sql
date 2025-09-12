-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "last_run_at" TIMESTAMP(3),
ADD COLUMN     "next_run_at" TIMESTAMP(3);
