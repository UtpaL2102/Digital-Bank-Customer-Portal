// scripts/createAccount.ts
import { PrismaClient } from "@prisma/client";
import { randomUUID } from "crypto";
import dotenv from "dotenv";

dotenv.config(); // will read .env in this folder if present

const prisma = new PrismaClient();

async function main() {
  // === EDIT THESE BEFORE RUNNING ===
  // Put an existing auth User.id here (from your auth service). Must exist.
  const userId = process.env.TEST_USER_ID || "PUT_EXISTING_USER_ID_HERE";
  const branchId = process.env.TEST_BRANCH_ID || null; // optional
  const initialBalance = process.env.INITIAL_BALANCE || "10000.00";
  const accountType = process.env.ACCOUNT_TYPE || "checking";
  // ================================

  if (!userId || userId.includes("PUT_")) {
    throw new Error("Set TEST_USER_ID env var to an existing user id before running.");
  }

  const accountId = randomUUID();
  const txnId = randomUUID();
  const auditId = randomUUID();
  const accountNumber = `ACCT-${Date.now()}`;

  console.log("Creating account for user:", userId);

  await prisma.$transaction(async (tx) => {
    // 1) create account
    const account = await tx.account.create({
      data: {
        id: accountId,
        account_number: accountNumber,
        account_type: accountType,
        status: "active",
        balance: initialBalance,   // Decimal typed in schema — pass as string
        daily_limit: null,
        monthly_limit: null,
        user_id: userId,
        branch_id: branchId,
      },
    });

    // 2) create initial transaction (ledger entry)
    await tx.transaction.create({
      data: {
        id: txnId,
        amount: initialBalance,
        status: "completed",
        type: "deposit",
        description: "Initial balance on account creation (script)",
        idempotency_key: null,
        from_account_id: accountId, // required in your schema
        to_account_id: null,
        to_beneficiary_id: null,
        initiated_by: userId,
        started_at: new Date(),
        completed_at: new Date(),
        processing_time: 0,
        retry_count: 0,
        monitoring_status: "normal",
      },
    });

    // 3) audit log
    await tx.auditLog.create({
      data: {
        id: auditId,
        user_id: userId,
        action: "create_account",
        action_type: "create",
        resource_type: "account",
        resource_id: accountId,
        details: `Account ${accountNumber} created with initial balance ${initialBalance}`,
        performed_at: new Date(),
        status: "success",
        severity_level: "info",
      },
    });

    console.log("SUCCESS: created account id =", account.id);
  });

  await prisma.$disconnect();
}

main().catch((err) => {
  console.error("ERROR:", err);
  process.exit(1);
});
