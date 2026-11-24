import chalk from 'chalk';
import { transactions } from './data.js';

export function addTransaction(transaction) {
  // TODO: Implement this function
  transactions.push({ ...transaction });
}

export function getTotalIncome(transactions) {
  // TODO: Implement this function
  let totalIncome = 0;
  for (const transaction of transactions) {
    if (transaction.type === 'income') {
      totalIncome += transaction.amount;
    }
  }
  return totalIncome;
}

export function getTotalExpenses(transactions) {
  // TODO: Implement this function
  let totalExpenses = 0;
  for (const transaction of transactions) {
    if (transaction.type === 'expense') {
      totalExpenses += transaction.amount;
    }
  }
  return totalExpenses;
}

export function getBalance(totalIncome, totalExpenses) {
  // TODO: Implement this function
  const balance = totalIncome - totalExpenses;
  return balance;
}

export function getTransactionsByCategory(transactions, category) {
  // TODO: Implement this function
  const filteredTransactions = [];
  for (const transaction of transactions) {
    if (transaction.category === category) {
      filteredTransactions.push(transaction);
    }
  }
  return filteredTransactions;
}

export function getLargestExpense(transactions) {
  // TODO: Implement this function
  let largestExpense = 0;
  for (const transaction of transactions) {
    if (transaction.type === 'expense') {
      if (transaction.amount > largestExpense) {
        largestExpense = transaction.amount;
      }
    }
  }
  return largestExpense;
}

export function printAllTransactions(transactions) {
  console.log('💰 PERSONAL FINANCE TRACKER 💰');
  console.log('All Transactions:');
  // TODO: Implement this function
  for (let i = 0; i < transactions.length; i++) {
    const transaction = transactions[i];
    console.log(
      `${i + 1}. [${transaction.type.toUpperCase()}] ${chalk.yellow(`${transaction.category}`)} - €${transaction.amount} (${transaction.description}) `
    );
  }
}

export function printSummary(transactions) {
  const totalIncome = getTotalIncome(transactions);
  const totalExpenses = getTotalExpenses(transactions);
  const currentBalance = getBalance(totalIncome, totalExpenses);
  const largestExpense = getLargestExpense(transactions);
  const totalTransactions = transactions.length;
  let largestExpenseDescription = '';
  for (const transaction of transactions) {
    if (
      transaction.amount === largestExpense &&
      transaction.type === 'expense'
    ) {
      largestExpenseDescription = transaction.description;
    }
  }
  console.log('📊 FINANCIAL SUMMARY 📊');
  console.log(`Total Income: ${chalk.green(`€${totalIncome}`)}`);
  console.log(`Total Expenses: ${chalk.red(`€${totalExpenses}`)}`);
  console.log(`Current Balance: ${chalk.cyan(`€${currentBalance}`)}`);
  console.log('');
  console.log(
    `Largest Expense: ${largestExpenseDescription} (€${largestExpense})`
  );
  console.log(`Total Transactions: ${chalk.bold(`${totalTransactions}`)}`);
}
