import { PrismaClient } from "@prisma/client";
import { randomUUID } from "crypto";
import dotenv from "dotenv";
dotenv.config();

const prisma = new PrismaClient();

async function main() {
  const id = randomUUID();
  const name = process.env.TEST_BRANCH_NAME || "Local Branch";
  const code = process.env.TEST_BRANCH_CODE || `BR-${Date.now()}`;

  const br = await prisma.branch.create({
    data: {
      id,
      name,
      code,
      address: process.env.TEST_BRANCH_ADDRESS || null,
    }
  });
  console.log("Created branch:", br);
  await prisma.$disconnect();
}

main().catch(e => { console.error(e); process.exit(1); });
