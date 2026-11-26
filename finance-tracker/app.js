// This is the entrypoint for your application.
// node app.js
const finance = require('./finance');
finance.addTransaction({
  id: 6,
  type: 'income',
  category: 'bonus',
  amount: 700,
  description: 'Performance bonus',
  date: '2025-01-20',
});
console.log(finance.getTransactionsByCategory('food'));
finance.printAllTransactions();

finance.printSummary();
