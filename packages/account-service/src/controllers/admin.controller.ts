// packages/account-service/src/controllers/admin.controller.ts
import { Request, Response } from "express";
import { prisma } from "../db/prismaClient";


function fmtLimitRequest(r: any) {
  return {
    id: r.id,
    user_id: r.user_id,
    account_id: r.account_id,
    current_daily_limit: r.current_daily_limit?.toString?.() ?? null,
    current_monthly_limit: r.current_monthly_limit?.toString?.() ?? null,
    requested_daily_limit: r.requested_daily_limit?.toString?.() ?? null,
    requested_monthly_limit: r.requested_monthly_limit?.toString?.() ?? null,
    reason: r.reason,
    status: r.status,
    created_at: r.created_at?.toISOString?.(),
    decided_at: r.decided_at?.toISOString?.() ?? null,
    reviewer_employee_id: r.reviewer_employee_id ?? null,
    decision_note: r.decision_note ?? null,
  };
}

/**
 * GET /api/v1/admin/limit-requests
 */
export const listLimitRequests = async (req: Request, res: Response) => {
  try {
    const page = Math.max(1, parseInt((req.query.page as string) || "1", 10));
    const pageSize = Math.min(100, Math.max(1, parseInt((req.query.pageSize as string) || "50", 10)));
    const skip = (page - 1) * pageSize;

    const [total, items] = await Promise.all([
      prisma.limitRequest.count(),
      prisma.limitRequest.findMany({
        skip,
        take: pageSize,
        orderBy: { created_at: "desc" },
      }),
    ]);

    return res.json({
      meta: { total, page, pageSize, totalPages: Math.ceil(total / pageSize) },
      limit_requests: items.map(fmtLimitRequest),
    });
  } catch (err) {
    console.error("admin.listLimitRequests error:", err);
    return res.status(500).json({ error: "Failed to list limit requests" });
  }
};

/**
 * PUT /api/v1/admin/limit-requests/:id/approve
 * Body: { note?: string, reviewer_employee_id?: string, daily_limit?: number, monthly_limit?: number }
 *
 * Behavior:
 * - Update limit request status -> approved
 * - Optionally update account.daily_limit/monthly_limit (atomic)
 * - Create LimitRequestEvent and AuditLog (atomic)
 */
export const approveLimitRequest = async (req: Request, res: Response) => {
  try {
    const { limitRequestId } = req.params;
    const body = req.body as { note?: string; reviewer_employee_id?: string; daily_limit?: string; monthly_limit?: string };

    // fetch request
    const lr = await prisma.limitRequest.findUnique({ where: { id: limitRequestId } });
    if (!lr) return res.status(404).json({ error: "Limit request not found" });

    if (lr.status !== "pending") {
      return res.status(400).json({ error: "Limit request is not pending" });
    }

    // atomic update
    const result = await prisma.$transaction(async (tx) => {
      // update account limits if provided otherwise use requested amounts
      const newDaily = body.daily_limit ?? lr.requested_daily_limit;
      const newMonthly = body.monthly_limit ?? lr.requested_monthly_limit;

      // update account (we assume account belongs to same user)
      await tx.account.update({
        where: { id: lr.account_id },
        data: {
          daily_limit: newDaily ? String(newDaily) : null,
          monthly_limit: newMonthly ? String(newMonthly) : null,
        },
      });

      // mark limit request approved
      const updated = await tx.limitRequest.update({
        where: { id: limitRequestId },
        data: {
          status: "approved",
          decided_at: new Date(),
          reviewer_employee_id: body.reviewer_employee_id || null,
          decision_note: body.note || "Approved",
          current_daily_limit: newDaily ? String(newDaily) : null,
          current_monthly_limit: newMonthly ? String(newMonthly) : null,
        },
      });

      // event
      await tx.limitRequestEvent.create({
        data: {
          id: undefined, // will be generated
          limit_request_id: limitRequestId,
          action: "approve",
          actor_user_id: null,
          actor_employee_id: body.reviewer_employee_id || null,
          note: body.note || "Approved",
          created_at: new Date(),
        },
      });

      // audit log
      await tx.auditLog.create({
        data: {
          id: undefined,
          user_id: updated.user_id,
          action: "limit_request_approved",
          details: `Limit request ${limitRequestId} approved`,
          performed_at: new Date(),
        },
      });

      return updated;
    });

    return res.json({ limit_request: fmtLimitRequest(result) });
  } catch (err) {
    console.error("approveLimitRequest error:", err);
    return res.status(500).json({ error: "Failed to approve limit request" });
  }
};

/**
 * PUT /api/v1/admin/limit-requests/:id/decline
 * Body: { note?: string, reviewer_employee_id?: string }
 */
export const declineLimitRequest = async (req: Request, res: Response) => {
  try {
    const { limitRequestId } = req.params;
    const body = req.body as { note?: string; reviewer_employee_id?: string };

    const lr = await prisma.limitRequest.findUnique({ where: { id: limitRequestId } });
    if (!lr) return res.status(404).json({ error: "Limit request not found" });

    if (lr.status !== "pending") return res.status(400).json({ error: "Limit request is not pending" });

    const updated = await prisma.$transaction(async (tx) => {
      const u = await tx.limitRequest.update({
        where: { id: limitRequestId },
        data: {
          status: "declined",
          decided_at: new Date(),
          reviewer_employee_id: body.reviewer_employee_id || null,
          decision_note: body.note || "Declined",
        },
      });

      await tx.limitRequestEvent.create({
        data: {
          id: undefined,
          limit_request_id: limitRequestId,
          action: "decline",
          actor_user_id: null,
          actor_employee_id: body.reviewer_employee_id || null,
          note: body.note || "Declined",
          created_at: new Date(),
        },
      });

      await tx.auditLog.create({
        data: {
          id: undefined,
          user_id: u.user_id,
          action: "limit_request_declined",
          details: `Limit request ${limitRequestId} declined`,
          performed_at: new Date(),
        },
      });

      return u;
    });

    return res.json({ limit_request: fmtLimitRequest(updated) });
  } catch (err) {
    console.error("declineLimitRequest error:", err);
    return res.status(500).json({ error: "Failed to decline limit request" });
  }
};

/**
 * Employees CRUD
 */
export const listEmployees = async (_req: Request, res: Response) => {
  try {
    const employees = await prisma.employee.findMany({ orderBy: { id: "asc" } });
    return res.json({ employees });
  } catch (err) {
    console.error("listEmployees error:", err);
    return res.status(500).json({ error: "Failed to list employees" });
  }
};

export const createEmployee = async (req: Request, res: Response) => {
  try {
    const body = req.body as { user_id: string; branch_id: string; position?: string };
    if (!body.user_id || !body.branch_id) return res.status(400).json({ error: "Missing user_id or branch_id" });

    const e = await prisma.employee.create({
      data: {
        user_id: body.user_id,
        branch_id: body.branch_id,
        position: body.position ?? null,
      },
    });
    return res.status(201).json({ employee: e });
  } catch (err) {
    console.error("createEmployee error:", err);
    return res.status(500).json({ error: "Failed to create employee" });
  }
};

export const updateEmployee = async (req: Request, res: Response) => {
  try {
    const { employeeId } = req.params;
    const body = req.body as { position?: string };
    const e = await prisma.employee.update({
      where: { id: employeeId },
      data: {
        position: body.position ?? undefined,
      },
    });
    return res.json({ employee: e });
  } catch (err) {
    console.error("updateEmployee error:", err);
    return res.status(500).json({ error: "Failed to update employee" });
  }
};

export const deleteEmployee = async (req: Request, res: Response) => {
  try {
    const { employeeId } = req.params;
    await prisma.employee.delete({ where: { id: employeeId } });
    return res.json({ success: true });
  } catch (err) {
    console.error("deleteEmployee error:", err);
    return res.status(500).json({ error: "Failed to delete employee" });
  }
};

/**
 * Branches
 */
export const listBranches = async (_req: Request, res: Response) => {
  try {
    const branches = await prisma.branch.findMany({ orderBy: { created_at: "desc" } });
    return res.json({ branches });
  } catch (err) {
    console.error("listBranches error:", err);
    return res.status(500).json({ error: "Failed to list branches" });
  }
};

export const createBranch = async (req: Request, res: Response) => {
  try {
    const body = req.body as { name: string; code: string; address?: string };
    if (!body.name || !body.code) return res.status(400).json({ error: "Missing name or code" });

    const b = await prisma.branch.create({ data: { name: body.name, code: body.code, address: body.address ?? null } });
    return res.status(201).json({ branch: b });
  } catch (err) {
    console.error("createBranch error:", err);
    return res.status(500).json({ error: "Failed to create branch" });
  }
};

export const updateBranch = async (req: Request, res: Response) => {
  try {
    const { branchId } = req.params;
    const body = req.body as { name?: string; code?: string; address?: string };
    const b = await prisma.branch.update({
      where: { id: branchId },
      data: {
        name: body.name ?? undefined,
        code: body.code ?? undefined,
        address: body.address ?? undefined,
      },
    });
    return res.json({ branch: b });
  } catch (err) {
    console.error("updateBranch error:", err);
    return res.status(500).json({ error: "Failed to update branch" });
  }
};

export const deleteBranch = async (req: Request, res: Response) => {
  try {
    const { branchId } = req.params;
    await prisma.branch.delete({ where: { id: branchId } });
    return res.json({ success: true });
  } catch (err) {
    console.error("deleteBranch error:", err);
    return res.status(500).json({ error: "Failed to delete branch" });
  }
};

/**
 * Audit logs listing - GET /api/v1/admin/audit-logs?page=1&service=auth-service&action=KYC_SUBMITTED
 */
export const listAuditLogs = async (req: Request, res: Response) => {
  try {
    const page = Math.max(1, parseInt((req.query.page as string) || "1", 10));
    const pageSize = Math.min(200, Math.max(1, parseInt((req.query.pageSize as string) || "50", 10)));
    const skip = (page - 1) * pageSize;

    // Build where clause for filtering
    const where: any = {};
    
    // Filter by service
    if (req.query.service) {
      where.action = { startsWith: `${req.query.service}:` };
    }

    // Filter by specific action
    if (req.query.action) {
      where.action = req.query.service 
        ? { equals: `${req.query.service}:${req.query.action}` }
        : { equals: req.query.action };
    }

    // Filter by date range
    if (req.query.from) {
      where.performed_at = { ...where.performed_at, gte: new Date(req.query.from as string) };
    }
    if (req.query.to) {
      where.performed_at = { ...where.performed_at, lte: new Date(req.query.to as string) };
    }

    // Filter by user
    if (req.query.userId) {
      where.user_id = req.query.userId;
    }

    console.log('Fetching audit logs with filters:', where);

    const [total, items] = await Promise.all([
      prisma.auditLog.count({ where }),
      prisma.auditLog.findMany({
        where,
        skip,
        take: pageSize,
        orderBy: { performed_at: "desc" },
      }),
    ]);

    return res.json({
      meta: { 
        total, 
        page, 
        pageSize, 
        totalPages: Math.ceil(total / pageSize),
        filters: {
          service: req.query.service || null,
          action: req.query.action || null,
          from: req.query.from || null,
          to: req.query.to || null,
          userId: req.query.userId || null
        }
      },
      audit_logs: items,
    });
  } catch (err) {
    console.error("listAuditLogs error:", err);
    return res.status(500).json({ error: "Failed to list audit logs" });
  }
};
