// packages/account-service/src/services/transfers.service.ts
import { prisma } from "../db/prismaClient";
import { Decimal } from "@prisma/client/runtime/library";
import { TransferBodyT } from "../schemas/transfer.schema";

export class TransferError extends Error {
  code?: string;
  constructor(message: string, code?: string) { super(message); this.code = code; }
}

/**
 * performTransfer
 * - Ensures idempotency must be handled by caller (we also write IdempotencyKey here if needed)
 * - Use a serializable transaction to avoid race conditions
 */
export async function performTransfer({
  userId,
  body,
  idempotencyKey,
}: {
  userId: string;
  body: TransferBodyT;
  idempotencyKey?: string | null;
}) {
  // validate: either to_account_id XOR to_beneficiary_id must be present
  if (!body.to_account_id && !body.to_beneficiary_id) {
    throw new TransferError("Either to_account_id or to_beneficiary_id required", "INVALID_DEST");
  }
  if (body.to_account_id && body.to_beneficiary_id) {
    throw new TransferError("Specify only one of to_account_id or to_beneficiary_id", "INVALID_DEST");
  }

  // wrap in transaction with serializable isolation
  const result = await prisma.$transaction(async (tx) => {
    // idempotency: check if key exists
    if (idempotencyKey) {
      const existing = await tx.idempotencyKey.findUnique({ where: { key: idempotencyKey } });
      if (existing) {
        if (existing.status === "completed") {
          // return previous response if stored
          return { idempotent: true, response: existing.response };
        }
        // If in progress, we can wait or reject — here we reject with 409
        throw new TransferError("Request in progress", "IN_PROGRESS");
      }
      // create a placeholder
      await tx.idempotencyKey.create({
        data: { key: idempotencyKey, user_id: userId, request: body as any, status: "in_progress" },
      });
    }

    // load from account and lock row (select for update)
    // Prisma does locking implicitly when using serializable; to ensure, we will select for update with raw query if needed.
    const fromAcct = await tx.account.findUnique({ where: { id: body.from_account_id } });
    if (!fromAcct) throw new TransferError("From account not found", "FROM_NOT_FOUND");
    if (fromAcct.user_id !== userId) throw new TransferError("Forbidden", "FORBIDDEN");
    if (fromAcct.status !== "active") throw new TransferError("From account is not active", "BAD_STATUS");

    // check sufficient balance
    // convert Decimal to number safely using .toNumber() if Decimal object
    const amountDecimal = new Decimal(String(body.amount));
    if (fromAcct.balance < amountDecimal) throw new TransferError("Insufficient funds", "INSUFFICIENT_FUNDS");

    // prepare to create transaction
    const txnData: any = {
      amount: amountDecimal,
      status: "pending" as const,
      type: body.to_account_id ? "transfer" : "external",
      description: body.description || null,
      idempotency_key: idempotencyKey || null,
      from_account_id: body.from_account_id,
      to_account_id: body.to_account_id || null,
      to_beneficiary_id: body.to_beneficiary_id || null,
      initiated_by: userId,
    };

    // if internal transfer, verify destination account exists and active
    let toAccount: any = null;
    if (body.to_account_id) {
      toAccount = await tx.account.findUnique({ where: { id: body.to_account_id } });
      if (!toAccount) throw new TransferError("Destination account not found", "TO_NOT_FOUND");
      if (toAccount.status !== "active") throw new TransferError("Destination account not active", "BAD_STATUS");
    } else {
      // external transfer: verify beneficiary exists and is active
      const beneficiary = await tx.beneficiary.findUnique({ where: { id: body.to_beneficiary_id! } });
      if (!beneficiary || !beneficiary.is_active) throw new TransferError("Beneficiary not found or inactive", "BEN_NOT_FOUND");
    }

    // debit from account
    const newFromBalance = fromAcct.balance.minus(amountDecimal);
    await tx.account.update({ where: { id: fromAcct.id }, data: { balance: newFromBalance } });

    // credit to account if internal
    if (toAccount) {
      const newToBalance = toAccount.balance.plus(amountDecimal);
      await tx.account.update({ where: { id: toAccount.id }, data: { balance: newToBalance } });
    }

    // create transaction record (status completed)
    const createdTx = await tx.transaction.create({
      data: {
        ...txnData,
        status: "completed",
      },
      include: {
        fromAccount: { select: { id: true, account_number: true, user_id: true } },
        toAccount: { select: { id: true, account_number: true, user_id: true } },
        toBeneficiary: { select: { id: true, name: true, account_number: true } },
      },
    });

    // write idempotency response and mark completed
    if (idempotencyKey) {
      await tx.idempotencyKey.update({
        where: { key: idempotencyKey },
        data: { status: "completed", response: createdTx },
      });
    }

    // optionally write audit log (recommended)
    await tx.auditLog.create({
      data: {
        user_id: userId,
        action: "transfer.create",
        details: JSON.stringify({ transactionId: createdTx.id, amount: amountDecimal.toString() }),
      },
    });

    return { idempotent: false, transaction: createdTx };
  }, { isolationLevel: "Serializable" });

  // if service returned idempotent previous response
  if ((result as any).idempotent) return (result as any).response;
  return (result as any).transaction;
}
