import { Request, Response } from "express";
import { prisma } from "../db/prismaClient";

function formatAccount(a: any) {
  return {
    ...a,
    balance: undefined, // Don't expose balance in search results
    daily_limit: undefined, // Don't expose limits in search results
    monthly_limit: undefined,
  };
}

export const searchAccounts = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Log the entire request query and params
    console.log('Request query:', req.query);
    console.log('Request params:', req.params);
    console.log('Raw term from query:', req.query.term);

    // Get the search term and ensure it's a string
    const rawTerm = req.query.term;
    const term = Array.isArray(rawTerm) ? rawTerm[0] : rawTerm;
    
    console.log('Search term after processing:', term);
    console.log('Term type:', typeof term);
    console.log('Term length:', term?.length);
    
    // Remove any leading/trailing spaces and decode URI component
    const cleanTerm = term ? decodeURIComponent(term.toString()).trim() : '';
    console.log('After trim and decode:', { 
      cleanTerm,
      length: cleanTerm?.length,
      type: typeof cleanTerm
    });

    if (!cleanTerm || cleanTerm.length < 4) {
      console.log('Validation failed:', {
        hasCleanTerm: !!cleanTerm,
        cleanTermLength: cleanTerm?.length
      });
      return res.status(400).json({ 
        error: { 
          message: "Search term must be at least 4 characters",
          debug: {
            receivedTerm: term,
            cleanedTerm: cleanTerm,
            termLength: term?.length,
            cleanTermLength: cleanTerm?.length,
            query: req.query
          }
        } 
      });
    }

    // First check what accounts exist in the system
    const allAccounts = await prisma.account.findMany({
      select: { account_number: true, status: true, user_id: true },
    });
    
    console.log('Debug - All accounts in system:', {
      count: allAccounts.length,
      accounts: allAccounts.map(a => ({
        number: a.account_number,
        status: a.status,
        isCurrentUser: a.user_id === userId
      }))
    });

    // Search for accounts that:
    // 1. Match the search term in account number
    // 2. Are active
    // 3. Don't belong to the current user
    const accounts = await prisma.account.findMany({
      where: {
        AND: [
          { 
            account_number: {
              contains: cleanTerm,
              mode: 'insensitive' // Case insensitive search
            }
          },
          { status: "active" },
          { user_id: { not: userId } },
        ],
      },
      include: {
        branch: {
          select: {
            name: true,
            code: true,
          },
        },
      },
      take: 5, // Limit results
    });

    console.log('Search results:', { 
      userId,
      searchTerm: cleanTerm,
      resultCount: accounts.length,
      results: accounts.map(a => ({
        number: a.account_number,
        matched: a.account_number.includes(cleanTerm),
        status: a.status,
        owner: a.user_id
      }))
    });

    return res.json({ 
      accounts: accounts.map(formatAccount)
    });
  } catch (err) {
    console.error("searchAccounts error:", err);
    return res.status(500).json({ 
      error: { 
        message: "Failed to search accounts",
        details: err instanceof Error ? err.message : String(err)
      } 
    });
  }
};