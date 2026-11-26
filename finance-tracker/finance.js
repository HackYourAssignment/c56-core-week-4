const transactions = require('./data');
const chalk = require('chalk');

function addTransaction(transaction) {
  transactions.push({ ...transaction });
}

function getTotalIncome() {
  let total = 0;

  for (const { type, amount } of transactions) {
    if (type === 'income') {
      total = total + amount;
    }
  }

  return total;
}

function getTotalExpenses() {
  let total = 0;

  for (const transaction of transactions) {
    if (transaction.type === 'expense') {
      total = total + transaction.amount;
    }
  }

  return total;
}

function getBalance() {
  return getTotalIncome() - getTotalExpenses();
}

function getTransactionsByCategory(category) {
  const results = [];

  for (const transaction of transactions) {
    if (transaction.category === category) {
      results.push(transaction);
    }
  }

  return results;
}

function getLargestExpense() {
  let largestExpense = null;

  for (const transaction of transactions) {
    if (transaction.type === 'expense') {
      if (
        largestExpense === null ||
        transaction.amount > largestExpense.amount
      ) {
        largestExpense = transaction;
      }
    }
  }

  return largestExpense;
}

function printAllTransactions() {
  for (const transaction of transactions) {
    if (transaction.type === 'income') {
      console.log(chalk.green(transaction.description));
    } else {
      console.log(chalk.red(transaction.description));
    }

    console.log(transaction.amount);
    console.log(chalk.yellow(transaction.category));
  }
}

function printSummary() {
  console.log(chalk.bold('FINANCE SUMMARY'));
  console.log(chalk.bold.green('Total Income:'), chalk.green(getTotalIncome()));
  console.log(chalk.bold.red('Total Expenses:'), chalk.red(getTotalExpenses()));
  if (getBalance() >= 0) {
    console.log(chalk.bold.cyan('Current Balance:'), chalk.cyan(getBalance()));
  } else {
    console.log(chalk.bold.red('Current Balance:'), chalk.red(getBalance()));
  }
  console.log(
    chalk.bold('Number of Transactions:'),
    chalk.bold(transactions.length)
  );
  const largestExpense = getLargestExpense();

  console.log(
    chalk.bold('Largest Expense:'),
    largestExpense.description,
    chalk.red(largestExpense.amount)
  );
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
