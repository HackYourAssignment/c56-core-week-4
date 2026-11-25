import { transactions } from './data.js';
import chalk from 'chalk';

export function addTransaction(newTransaction) {
  transactions = [...transactions, newTransaction];
}
export function getTotalIncome() {
  let total = 0;
  for (const transaction of transactions) {
    if (transaction.type === 'income') {
      total += transaction.amount;
    }
  }
  return total;
}
export function getTotalExpenses() {
  let total = 0;
  for (const transaction of transactions) {
    if (transaction.type === 'expense') {
      total += transaction.amount;
    }
  }
  return total;
}
export function getBalance() {
  return getTotalIncome() - getTotalExpenses();
}
export function getTransactionsByCategory(category) {
  const result = [];
  for (const transaction of transactions) {
    if (transaction.category === category) {
      result.push(transaction);
    }
  }
  return result;
}
export function getLargestExpense() {
  let largest = null;
  for (const transaction of transactions) {
    if (
      transaction.type === 'expense' &&
      (largest === null || transaction.amount > largest.amount)
    ) {
      largest = transaction;
    }
  }
  return largest;
}
export function printAllTransactions() {
  console.log(
    chalk.bold('💰 PERSONAL FINANCE TRACKER 💰\n\nAll Transactions: \n')
  );
  for (const transaction of transactions) {
    const { id, type, category, amount, description } = transaction;
    const amountColor =
      type === 'income' ? chalk.green(`€${amount}`) : chalk.red(`€${amount}`);
    console.log(
      `${id}. ${type.toUpperCase()} ${chalk.yellow(category)} - ${amountColor} ${description}`
    );
  }
}
export function printSummary() {
  const totalIncome = getTotalIncome();
  const totalExpenses = getTotalExpenses();
  const balance = getBalance();
  const largestExpense = getLargestExpense();
  const totalTransactions = transactions.length;

  const balanceColor =
    balance >= 0 ? chalk.cyan(`€${balance}`) : chalk.red(`€${balance}`);

  console.log('\n📊 FINANCIAL SUMMARY 📊\n');
  console.log(`Total Income: ${chalk.green(`€${totalIncome}`)}`);
  console.log(`Total Expenses: ${chalk.red(`€${totalExpenses}`)}`);
  console.log(`Current Balance: ${balanceColor}`);
  console.log(`Total Transactions: ${totalTransactions} \n`);

  if (largestExpense) {
    console.log(
      `Largest Expense: ${largestExpense.description} (€${largestExpense.amount})`
    );
  } else {
    console.log('Largest Expense: No expenses found');
  }
  console.log(`Total Transactions: ${totalTransactions}`);
}
