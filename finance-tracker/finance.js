const chalk = require('chalk');
const transactions = require('./data');

// Add a new transaction (spread copies all fields + adds an id)
function addTransaction(transaction) {
  const newTransaction = { id: transactions.length + 1, ...transaction };
  transactions.push(newTransaction);
  return newTransaction;
}

// Add up all income (for loop)
function getTotalIncome() {
  let total = 0;
  for (let i = 0; i < transactions.length; i++) {
    if (transactions[i].type === 'income') {
      total += transactions[i].amount;
    }
  }
  return total;
}

// Add up all expenses (for...of loop)
function getTotalExpenses() {
  let total = 0;
  for (const transaction of transactions) {
    if (transaction.type === 'expense') {
      total += transaction.amount;
    }
  }
  return total;
}

// Income minus expenses
function getBalance() {
  return getTotalIncome() - getTotalExpenses();
}

// Get all transactions of one category (loop + push)
function getTransactionsByCategory(category) {
  const result = [];
  for (const transaction of transactions) {
    if (transaction.category === category) {
      result.push(transaction);
    }
  }
  return result;
}

// Find the expense with the highest amount (while loop)
function getLargestExpense() {
  let largest = null;
  let i = 0;
  while (i < transactions.length) {
    const transaction = transactions[i];
    if (
      transaction.type === 'expense' &&
      (largest === null || transaction.amount > largest.amount)
    ) {
      largest = transaction;
    }
    i++;
  }
  return largest;
}

// Print every transaction with colors (uses object destructuring)
function printAllTransactions() {
  console.log(chalk.bold('All Transactions:'));
  transactions.forEach((transaction, index) => {
    const { type, category, amount, description } = transaction;
    const color = type === 'income' ? chalk.green : chalk.red;
    console.log(
      `${index + 1}. [${type.toUpperCase()}] ${description} - ${color(
        '€' + amount
      )} (${chalk.yellow(category)})`
    );
  });
}

// Print the financial summary report
function printSummary() {
  const balance = getBalance();
  const balanceColor = balance < 0 ? chalk.red : chalk.cyan;
  const largest = getLargestExpense();

  console.log(chalk.bold('\n📊 FINANCIAL SUMMARY 📊'));
  console.log(
    chalk.bold('Total Income: ') + chalk.green('€' + getTotalIncome())
  );
  console.log(
    chalk.bold('Total Expenses: ') + chalk.red('€' + getTotalExpenses())
  );
  console.log(chalk.bold('Current Balance: ') + balanceColor('€' + balance));

  if (largest) {
    console.log(
      `\n${chalk.bold('Largest Expense:')} ${largest.description} (${chalk.red(
        '€' + largest.amount
      )})`
    );
  }
  console.log(chalk.bold('Total Transactions: ') + transactions.length);
}

module.exports = {
  addTransaction,
  getTotalIncome,
  getTotalExpenses,
  getBalance,
  getTransactionsByCategory,
  getLargestExpense,
  printAllTransactions,
  printSummary,
};
