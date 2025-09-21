// packages/account-service/src/controllers/loans.controller.ts
import { Request, Response } from "express";
import { prisma } from "../db/prismaClient";

function fmtLoan(l: any) {
  // Handle potential null/undefined loan object
  if (!l) return null;

  const formatted: any = {
    id: l.id,
    user_id: l.user_id,
    account_id: l.account?.id || l.account_id,
    branch_id: l.branch?.id || l.branch_id,
    amount: l.amount?.toString?.() ?? l.amount,
    interest_rate: l.interest_rate?.toString?.() ?? l.interest_rate,
    start_date: l.start_date?.toISOString?.() ?? l.start_date,
    end_date: l.end_date?.toISOString?.() ?? l.end_date,
    status: l.status || 'active',  // Default to active if not set
    created_at: l.created_at?.toISOString?.() ?? l.created_at,
  };

  // Add account details if available
  if (l.account) {
    formatted.account = {
      id: l.account.id,
      account_number: l.account.account_number,
      type: l.account.type,
    };
    console.log("Account details found:", formatted.account);
  }

  // Add branch details if available
  if (l.branch) {
    formatted.branch = {
      id: l.branch.id,
      name: l.branch.name,
      code: l.branch.code,
    };
    console.log("Branch details found:", formatted.branch);
  }

  console.log("Formatting loan:", l.id, "Account:", !!l.account, "Branch:", !!l.branch);
  return formatted;
}
function generateAmortizationSchedule(principal: number, annualRatePct: number, startDate: Date, months: number) {
  const monthlyRate = (annualRatePct / 100) / 12;
  const n = months;
  // monthly payment using annuity formula
  const monthlyPayment = monthlyRate === 0 ? principal / n : (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -n));
  let balance = principal;
  const schedule: any[] = [];

  for (let i = 1; i <= n; i++) {
    const interest = monthlyRate * balance;
    const principalPortion = monthlyPayment - interest;
    balance = Math.max(0, balance - principalPortion);

    const due = new Date(startDate);
    due.setMonth(due.getMonth() + i - 1);

    schedule.push({
      installment_number: i,
      due_date: due.toISOString(),
      principal: principalPortion.toFixed(2),
      interest: interest.toFixed(2),
      total_payment: monthlyPayment.toFixed(2),
      remaining_balance: balance.toFixed(2),
    });
  }

  return {
    monthly_payment: monthlyPayment.toFixed(2),
    term_months: n,
    schedule,
  };
}

/** GET /api/v1/loans - list loans for authenticated user */
export const listLoans = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    if (!userId) return res.status(401).json({ error: "Unauthorized" });
    
    console.log("Auth context:", {
      userId,
      headers: req.headers,
      user: (req as any).user
    });

    // First check if the loan exists directly
    const allLoans = await prisma.loan.findMany({});
    console.log("All loans in system:", allLoans);

    // Then try with the user filter
    const loans = await prisma.loan.findMany({
      where: { user_id: userId },
      orderBy: { created_at: "desc" },
      include: {
        account: true,
        branch: true,
      },
    });

    console.log("Found loans:", JSON.stringify(loans, null, 2));
    
    return res.json({
      loans: loans.map(loan => {
        const formatted = fmtLoan(loan);
        console.log("Formatted loan:", JSON.stringify(formatted, null, 2));
        return formatted;
      })
    });
  } catch (err) {
    console.error("listLoans error:", err);
    return res.status(500).json({ error: "Failed to retrieve loans" });
  }
};

/** GET /api/v1/loans/:loanId - loan detail */
export const getLoan = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    const { loanId } = req.params;
    const loan = await prisma.loan.findUnique({
      where: { id: loanId },
      include: { account: true, branch: true },
    });

    if (!loan) return res.status(404).json({ error: "Loan not found" });
    if (loan.user_id !== userId) return res.status(403).json({ error: "Forbidden" });

    return res.json({ loan: fmtLoan(loan) });
  } catch (err) {
    console.error("getLoan error:", err);
    return res.status(500).json({ error: "Failed to retrieve loan" });
  }
};

/** GET /api/v1/loans/:loanId/schedule - amortization schedule */
export const getLoanSchedule = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    const { loanId } = req.params;
    const loan = await prisma.loan.findUnique({ where: { id: loanId } });
    if (!loan) return res.status(404).json({ error: "Loan not found" });
    if (loan.user_id !== userId) return res.status(403).json({ error: "Forbidden" });

    // If loan has start_date and end_date, compute months
    const start = loan.start_date;
    const end = loan.end_date || new Date(start.getTime());
    // compute months difference (round to nearest whole months)
    const months = Math.max(1, Math.round(((end.getFullYear() - start.getFullYear()) * 12) + (end.getMonth() - start.getMonth())));
    const principal = parseFloat((loan.amount as any).toString());
    const schedule = generateAmortizationSchedule(principal, parseFloat((loan.interest_rate as any).toString()), start, months);

    return res.json({
      loan: fmtLoan(loan),
      schedule,
    });
  } catch (err) {
    console.error("getLoanSchedule error:", err);
    return res.status(500).json({ error: "Failed to generate schedule" });
  }
};
