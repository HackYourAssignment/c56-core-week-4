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



console.log('\n=== BONUS CHALLENGES ===');

// Bonus 1: Search by date
console.log('\nTransactions in February:');
console.log(finance.getTransactionsByDate('2025-02-01', '2025-02-28'));

// Bonus 2: Group by month
console.log('\nTransactions grouped by month:');
console.dir(finance.groupTransactionsByMonth(), { depth: null });

// Bonus 3: Average expenses
console.log('\nAverage expense by category:');
console.log(finance.getAverageExpenseByCategory());

// Bonus 4: Remove transaction
console.log('\nRemove transaction 2:');
console.log(finance.removeTransaction(2));

// Bonus 5: Consecutive expensive months
console.log('\nConsecutive expensive months:');
console.log(finance.findConsecutiveExpensiveMonths(1200));

// Show updated summary
console.log('\nUpdated summary:');
finance.printSummary();
