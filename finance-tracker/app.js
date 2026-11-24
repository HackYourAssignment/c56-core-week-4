// This is the entrypoint for your application.
// node app.js

import {
  addTransaction,
  getTransactionsByCategory,
  printAllTransactions,
  printSummary,
} from './finance.js';

// Display all transactions
printAllTransactions();

// Display the financial summary
printSummary();

// Find transactions by category
console.log(chalkHeading('--- Rent Transactions ---'));
console.log(getTransactionsByCategory('rent'));

// Add a new transaction
addTransaction({
  id: 6,
  type: 'expense',
  category: 'transport',
  amount: 50,
  description: 'Monthly bus ticket',
  date: '2025-01-25',
});

// Display the updated summary
console.log(chalkHeading('--- Updated Summary ---'));
printSummary();

// Helper function for section headings
function chalkHeading(text) {
  return `\n${text}\n`;
}
