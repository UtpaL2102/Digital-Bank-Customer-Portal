// packages/account-service/scripts/createLoan.ts
import { PrismaClient } from "@prisma/client";
import { randomUUID } from "crypto";
import dotenv from "dotenv";

dotenv.config();

const prisma = new PrismaClient();

function isNonEmptyString(v?: string) {
  return typeof v === "string" && v.trim().length > 0;
}

async function main() {
  // Read environment / edit as needed
  const loanId = process.env.TEST_LOAN_ID || randomUUID();
  const userId = process.env.TEST_USER_ID;
  const accountId = process.env.TEST_ACCOUNT_ID;
  const branchId = process.env.TEST_BRANCH_ID || null; // optional
  const principal = process.env.LOAN_PRINCIPAL || "50000.00";
  const interest = process.env.LOAN_INTEREST || "8.5";
  const startDate = new Date(process.env.LOAN_START || new Date().toISOString());
  const endDate = new Date(process.env.LOAN_END || new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString()); // 1y default

  if (!userId) throw new Error("Set TEST_USER_ID in env");
  if (!accountId) throw new Error("Set TEST_ACCOUNT_ID in env (existing account id)");

  console.log("Creating loan with:", {
    loanId, userId, accountId, branchId, principal, interest, startDate: startDate.toISOString(), endDate: endDate.toISOString(),
  });

  try {
    // Build data object — connect relations explicitly
    const data: any = {
      id: loanId,
      user_id: userId,
      // connect the account relation (ensures Prisma knows the relation target)
      account: { connect: { id: accountId } },
      amount: principal,         // Prisma Decimal accepts string
      interest_rate: interest,   // string is okay; Prisma will coerce Decimal
      start_date: startDate,
      end_date: endDate,
      status: "active",
      created_at: new Date(),
      branch: null, // Add this line
    };

    // If branchId provided (non-empty), connect it too
    if (branchId !== null && isNonEmptyString(branchId)) {
    data.branch = { connect: { id: branchId } };
    }

    const loan = await prisma.loan.create({ data });
    console.log("SUCCESS: created loan:", {
      id: loan.id,
      amount: loan.amount?.toString?.(),
      interest_rate: loan.interest_rate?.toString?.(),
    });
  } catch (err) {
    console.error("ERROR creating loan:", err);
    throw err;
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((e) => {
  console.error("FATAL:", e);
  process.exit(1);
});
