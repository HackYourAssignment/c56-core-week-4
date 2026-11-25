const transactions = require('./data.js');
const chalk = require('chalk');

function addTransaction(transaction) {
  transactions.push(...transaction);
}

function getTotalIncome() {
  let total = 0;
  for (const transaction of transactions) {
    if (transaction.type === 'income') total += transaction.amount;
  }
  return total;
}

function getTotalExpenses() {
  let total = 0;
  for (const transaction of transactions) {
    if (transaction.type === 'expense') total += transaction.amount;
  }
  return total;
}

function getBalance() {
  return getTotalIncome() - getTotalExpenses();
}

function getTransactionsByCategory(category) {
  const result = [];
  for (const transaction of transactions) {
    if (transaction.category === category) {
      result.push(transaction);
    }
  }
  return result;
}

function getLargestExpense() {
  let largest = null;
  for (const transaction of transactions) {
    if (transaction.type === 'expense') {
      if (largest === null || transaction.amount > largest.amount) {
        largest = transaction;
      }
    }
  }
  return largest;
}

function printAllTransactions() {
  console.log('All Transactions:');
  for (const transaction of transactions) {
    // Object destructuring: pull the fields out of the transaction
    const { id, type, category, amount, description } = transaction;
    const amountColor = type === 'income' ? chalk.green : chalk.red;
    console.log(
      `${id}. [${type.toUpperCase()}] ${description} - ${amountColor('€' + amount)} (${chalk.yellow(category)})`,
    );
  }
}

function printSummary() {
  const totalIncome = getTotalIncome();
  const totalExpenses = getTotalExpenses();
  const balance = getBalance();
  const largestExpense = getLargestExpense();
  const balanceColor = balance < 0 ? chalk.red : chalk.cyan;

  console.log(chalk.bold('📊 FINANCIAL SUMMARY 📊'));
  console.log(chalk.bold('Total Income: ') + chalk.green('€' + totalIncome));
  console.log(chalk.bold('Total Expenses: ') + chalk.red('€' + totalExpenses));
  console.log(chalk.bold('Current Balance: ') + balanceColor('€' + balance));
  console.log();
  console.log(
    chalk.bold('Largest Expense: ') +
      `${largestExpense.description} (${chalk.red('€' + largestExpense.amount)})`,
  );
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
