// packages/account-service/scripts/attachBranchToAccount.ts
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";

dotenv.config();
const prisma = new PrismaClient();

async function main() {
  const accountId = process.env.TEST_ACCOUNT_ID; // set in .env before running
  const branchId = process.env.TEST_BRANCH_ID;   // set in .env before running

  if (!accountId || !branchId) {
    throw new Error("Please set TARGET_ACCOUNT_ID and TARGET_BRANCH_ID in .env");
  }

  // Optional: verify branch and account exist and that account belongs to expected user
  const [acct, br] = await Promise.all([
    prisma.account.findUnique({ where: { id: accountId } }),
    prisma.branch.findUnique({ where: { id: branchId } }),
  ]);

  if (!acct) throw new Error(`Account not found: ${accountId}`);
  if (!br) throw new Error(`Branch not found: ${branchId}`);

  // Atomic update (simple update inside transaction)
  await prisma.$transaction(async (tx) => {
    await tx.account.update({
      where: { id: accountId },
      data: { branch_id: branchId },
    });

    // optional audit log
    await tx.auditLog.create({
      data: {
        user_id: acct.user_id,
        action: "assign_branch",
        details: `Assigned branch ${br.code} (${branchId}) to account ${acct.account_number}`,
      },
    });
  });

  console.log(`Success: account ${accountId} now assigned to branch ${branchId}`);
  await prisma.$disconnect();
}

main().catch((err) => {
  console.error("ERROR:", err);
  process.exit(1);
});
