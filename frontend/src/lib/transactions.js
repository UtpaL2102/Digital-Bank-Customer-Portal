// Helper function to format transactions consistently across the app
export const formatTransaction = (tx) => ({
  id: tx.id,
  date: tx.created_at,
  description: tx.description || 'Unknown transaction',
  type: tx.type === 'deposit' ? 'Credit' : 'Debit',
  status: tx.status.charAt(0).toUpperCase() + tx.status.slice(1).toLowerCase(),
  reference: tx.reference || '-',
  amount: tx.type === 'deposit' ? 
    `+${parseFloat(tx.amount).toFixed(2)}` : 
    `-${parseFloat(tx.amount).toFixed(2)}`,
  category: tx.category || 'Other'
});

// Helper function to fetch transactions from API
export const fetchTransactionsFromApi = async ({ 
  accountId, 
  token, 
  page = 1, 
  pageSize = 20,
  filters = {} 
}) => {
  if (!accountId || !token) {
    throw new Error('Account ID and token are required');
  }

  // Build API URL with parameters
  const baseUrl = process.env.REACT_APP_API_URL || 'http://localhost:4000';
  const params = new URLSearchParams({
    accountId,
    page: page.toString(),
    pageSize: pageSize.toString()
  });

  // Add date range if provided
  if (filters.dateRange && filters.dateRange !== "All") {
    const now = new Date();
    let days = 30;
    if (filters.dateRange === "Last 60 days") days = 60;
    if (filters.dateRange === "Last 90 days") days = 90;
    const startDate = new Date(now);
    startDate.setDate(now.getDate() - days + 1);
    params.append('startDate', startDate.toISOString());
    params.append('endDate', now.toISOString());
  }

  // Add other filters
  if (filters.type && filters.type !== "All") {
    params.append('type', filters.type.toLowerCase());
  }
  if (filters.status && filters.status !== "All") {
    params.append('status', filters.status.toLowerCase());
  }

  // Make API request
  const url = `${baseUrl}/api/v1/transactions?${params.toString()}`;
  console.log('Fetching transactions from:', url);

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
  }

  const data = await response.json();
  console.log('Transactions response:', data);

  if (!data || !data.transactions) {
    return [];
  }

  return data.transactions.map(formatTransaction);
};