// packages/account-service/scripts/checkLoan.ts
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";

dotenv.config();

const prisma = new PrismaClient();

async function main() {
  try {
    // Get all loans
    const loans = await prisma.loan.findMany({
      include: {
        account: true,
        branch: true
      }
    });

    console.log("All loans in database:", JSON.stringify(loans, null, 2));

    // Check specific loan
    const loanId = "99441f58-1fd4-407c-b944-2d1e8e9bc02c";
    const specificLoan = await prisma.loan.findUnique({
      where: { id: loanId },
      include: {
        account: true,
        branch: true
      }
    });

    console.log("\nSpecific loan details:", JSON.stringify(specificLoan, null, 2));

  } catch (err) {
    console.error("Error checking loans:", err);
  } finally {
    await prisma.$disconnect();
  }
}

main().catch(console.error);