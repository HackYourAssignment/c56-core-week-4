const chalk = require('chalk');
const transactions = require('./data');

// Add transaction
function addTransaction(newTransaction) {
  transactions.push({ ...newTransaction });
}

// Calculate total income
function getTotalIncome() {
  let total = 0;

  for (let item of transactions) {
    if (item.type === 'income') {
      total += item.amount;
    }
  }

  return total;
}

// Calculate total expenses
function getTotalExpenses() {
  let total = 0;

  for (let item of transactions) {
    if (item.type === 'expense') {
      total += item.amount;
    }
  }

  return total;
}

// Calculate balance
function getBalance() {
  return getTotalIncome() - getTotalExpenses();
}

// Find transactions by category
function getTransactionsByCategory(category) {
  let result = [];

  for (let item of transactions) {
    if (item.category === category) {
      result.push(item);
    }
  }

  return result;
}

// Find largest expense
function getLargestExpense() {
  let largest = null;

  for (let item of transactions) {
    if (item.type === 'expense') {
      if (largest === null || item.amount > largest.amount) {
        largest = item;
      }
    }
  }

  return largest;
}

// Print all transactions
function printAllTransactions() {
  console.log(chalk.bold('=== All Transactions ==='));

  for (let item of transactions) {
    const { description, category, amount, type } = item;

    let coloredAmount;

    if (type === 'income') {
      coloredAmount = chalk.green('€' + amount);
    } else {
      coloredAmount = chalk.red('€' + amount);
    }

    console.log(
      description + ' | ' + chalk.yellow(category) + ' | ' + coloredAmount,
    );
  }
}

// Print summary
function printSummary() {
  console.log(chalk.bold('\n=== Financial Summary ==='));

  console.log(
    chalk.bold('Total Income: ') + chalk.green('€' + getTotalIncome()),
  );

  console.log(
    chalk.bold('Total Expenses: ') + chalk.red('€' + getTotalExpenses()),
  );

  let balance = getBalance();

  if (balance >= 0) {
    console.log(chalk.bold('Balance: ') + chalk.cyan('€' + balance));
  } else {
    console.log(chalk.bold('Balance: ') + chalk.red('€' + balance));
  }

  console.log('Number of Transactions: ' + transactions.length);

  let largest = getLargestExpense();

  if (largest !== null) {
    console.log(
      'Largest Expense: ' + largest.description + ' - €' + largest.amount,
    );
  }
}

// Export functions
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
