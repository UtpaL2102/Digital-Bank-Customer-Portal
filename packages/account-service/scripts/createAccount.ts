import { PrismaClient } from "@prisma/client";
import { randomUUID } from "crypto";
import dotenv from "dotenv";

dotenv.config();

const prisma = new PrismaClient();

async function main() {
  const userId = process.env.TEST_USER_ID || "";
  const branchIdRaw = process.env.TEST_BRANCH_ID || "";
  const branchId = branchIdRaw && branchIdRaw !== "null" ? branchIdRaw : null;
  const initialBalance = process.env.INITIAL_BALANCE || "10000.00";
  const accountType = process.env.ACCOUNT_TYPE || "checking";

  if (!userId) {
    throw new Error("Set TEST_USER_ID env var to an existing user id before running.");
  }

  const accountId = randomUUID();
  const txnId = randomUUID();
  const auditId = randomUUID();
  const accountNumber = `ACCT-${Date.now()}`;

  console.log("Creating account for user:", userId);

  try {
    await prisma.$transaction(async (tx) => {
      // 1) create account
      const account = await tx.account.create({
        data: {
          id: accountId,
          account_number: accountNumber,
          account_type: accountType,
          status: "active",
          balance: initialBalance,
          daily_limit: null,
          monthly_limit: null,
          user_id: userId,
          branch_id: branchId,
        },
      });

      // 2) create initial transaction
      await tx.transaction.create({
        data: {
          id: txnId,
          amount: initialBalance,
          status: "completed",
          type: "deposit",
          description: "Initial balance on account creation (script)",
          idempotency_key: null,
          from_account_id: accountId,
          to_account_id: null,
          to_beneficiary_id: null,
          initiated_by: userId,
        },
      });

      // 3) audit log
      await tx.auditLog.create({
        data: {
          id: auditId,
          user_id: userId,
          action: "create_account",
          details: `Account ${accountNumber} created with initial balance ${initialBalance}`,
          performed_at: new Date(),
        },
      });

      console.log("SUCCESS: created account id =", account.id);
    });
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((err) => {
  console.error("ERROR:", err);
  process.exit(1);
});
