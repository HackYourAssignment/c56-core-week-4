import chalk from 'chalk';
import { transactions } from './data.js';

export function addTransaction(newTransaction) {
  transactions.push(newTransaction);
}
addTransaction({
  id: 2,
  type: 'expense',
  category: 'housing',
  amount: 1200,
  description: 'Rent',
  date: '2026-01-16',
});
addTransaction({
  id: 3,
  type: 'expense',
  category: 'food',
  amount: 300,
  description: 'Groceries',
  date: '2026-01-16',
});
addTransaction({
  id: 4,
  type: 'income',
  category: 'side-income',
  amount: 500,
  description: 'Freelance',
  date: '2026-01-20',
});
addTransaction({
  id: 5,
  type: 'expense',
  category: 'bills',
  amount: 150,
  description: 'Utilities',
  date: '2026-02-03',
});
export function getTotalIncome() {
  let totalIncome = 0;
  for (const transaction of transactions) {
    if (transaction.type === 'income') {
      totalIncome += transaction.amount;
    }

    return totalIncome;
  }
}

export function getTotalExpenses() {
  let totalExpenses = 0;
  for (const transaction of transactions) {
    if (transaction.type === 'expense') {
      totalExpenses += transaction.amount;
    }
  }

  return totalExpenses;
}

export function getBalance() {
  const income = getTotalIncome();
  const expenses = getTotalExpenses();
  const totalBalance = income - expenses;
  return totalBalance;
}

export function getTransactionsByCategory(category) {
  const matchingTransactions = [];
  for (const transaction of transactions) {
    if (transaction.category === category) {
      matchingTransactions.push(transaction);
    }
  }
  return matchingTransactions;
}

export function getLargestExpense() {
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
  return (
    largestExpense.description +
    ' ' +
    '(€' +
    chalk.red(largestExpense.amount) +
    ')'
  );
}

export function printAllTransactions() {
  console.log('All transactions:');
  for (const transaction of transactions) {
    const type = transaction.type.toUpperCase();
    console.log(
      `${transaction.id}. [${type}] ${transaction.description} - €${chalk.green(transaction.amount)} (${transaction.category})`
    );
  }
}
