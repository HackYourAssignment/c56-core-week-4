const finance = require('./finance');

// Show all transactions
finance.printAllTransactions();

// Show financial summary
finance.printSummary();

// Add a new transaction
finance.addTransaction({
  id: 6,
  type: 'expense',
  category: 'shopping',
  amount: 150,
  description: 'New clothes',
  date: '2025-01-20',
});

// Show updated summary
console.log('\nAfter adding a new transaction:');
finance.printSummary();

// Search by category
console.log('\nFood transactions:');
console.log(finance.getTransactionsByCategory('food'));
