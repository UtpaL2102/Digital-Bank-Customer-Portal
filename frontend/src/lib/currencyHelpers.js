// Format currency in Indian Rupee format
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 2
  }).format(amount);
};

// Format number in Indian format (with commas)
export const formatIndianNumber = (num) => {
  return new Intl.NumberFormat('en-IN').format(num);
};

// Convert string amount to number, handling currency symbols and commas
export const parseAmount = (amountStr) => {
  return parseFloat(amountStr.replace(/[^\d.-]/g, ''));
};