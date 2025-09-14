// packages/account-service/src/controllers/beneficiaries.controller.ts
import { Request, Response } from "express";
import { prisma } from "../db/prismaClient";

export const listBeneficiaries = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    const beneficiaries = await prisma.beneficiary.findMany({
      where: { user_id: userId, is_active: true },
      orderBy: { created_at: "desc" },
    });

    return res.json({ beneficiaries });
  } catch (err) {
    console.error("listBeneficiaries error:", err);
    return res.status(500).json({ error: "Failed to list beneficiaries" });
  }
};

export const createBeneficiary = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    const { name, bank_name, account_number, ifsc_swift, currency } = req.body || {};

    if (!name || !account_number) {
      return res.status(400).json({ error: "Missing required fields: name, account_number" });
    }

    const b = await prisma.beneficiary.create({
      data: {
        user_id: userId,
        name,
        bank_name: bank_name || null,
        account_number,
        ifsc_swift: ifsc_swift || null,
        currency: currency || "INR",
      },
    });

    return res.status(201).json({ beneficiary: b });
  } catch (err) {
    console.error("createBeneficiary error:", err);
    return res.status(500).json({ error: "Failed to create beneficiary" });
  }
};

export const updateBeneficiary = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    const { beneficiaryId } = req.params;
    const { name, bank_name, account_number, ifsc_swift, currency, is_active } = req.body || {};

    const existing = await prisma.beneficiary.findUnique({ where: { id: beneficiaryId } });
    if (!existing) return res.status(404).json({ error: "Beneficiary not found" });
    if (existing.user_id !== userId) return res.status(403).json({ error: "Forbidden" });

    const updated = await prisma.beneficiary.update({
      where: { id: beneficiaryId },
      data: {
        name: name ?? existing.name,
        bank_name: bank_name ?? existing.bank_name,
        account_number: account_number ?? existing.account_number,
        ifsc_swift: ifsc_swift ?? existing.ifsc_swift,
        currency: currency ?? existing.currency,
        is_active: typeof is_active === "boolean" ? is_active : existing.is_active,
        updated_at: new Date(),
      },
    });

    return res.json({ beneficiary: updated });
  } catch (err) {
    console.error("updateBeneficiary error:", err);
    return res.status(500).json({ error: "Failed to update beneficiary" });
  }
};

export const deleteBeneficiary = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    const { beneficiaryId } = req.params;

    const existing = await prisma.beneficiary.findUnique({ where: { id: beneficiaryId } });
    if (!existing) return res.status(404).json({ error: "Beneficiary not found" });
    if (existing.user_id !== userId) return res.status(403).json({ error: "Forbidden" });

    // Soft delete — set is_active = false
    await prisma.beneficiary.update({
      where: { id: beneficiaryId },
      data: { is_active: false, updated_at: new Date() },
    });

    return res.status(204).send("");
  } catch (err) {
    console.error("deleteBeneficiary error:", err);
    return res.status(500).json({ error: "Failed to delete beneficiary" });
  }
};
