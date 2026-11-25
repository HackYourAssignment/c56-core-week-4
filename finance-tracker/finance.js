import chalk from 'chalk';
import { transactions } from './data.js';


function formatAmount(amount) {
  return Number.isInteger(amount) ? `€${amount}` : `€${amount.toFixed(2)}`;
}

function colourBalance(balance) {
  const formattedBalance =
    balance < 0 ? `-${formatAmount(-balance)}` : formatAmount(balance);
  return balance < 0
    ? chalk.red(formattedBalance)
    : chalk.cyan(formattedBalance);
}


export function addTransaction(newTransaction) {
  transactions.push({ ...newTransaction });
}

export function getTotalIncome() {
  let totalIncome = 0;
  for (const transaction of transactions) {
    if (transaction.type === 'income') {
      totalIncome += transaction.amount;
    }
  }
  return totalIncome;
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
  return getTotalIncome() - getTotalExpenses();
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
    if (transaction.type !== 'expense') {
      continue;
    }
    if (largestExpense === null || transaction.amount > largestExpense.amount) {
      largestExpense = transaction;
    }
  }
  return largestExpense;
}

export function printAllTransactions() {
  console.log(chalk.bold('All Transactions:'));

  for (let index = 0; index < transactions.length; index++) {
    const { type, category, amount, description } = transactions[index];

    const isIncome = type === 'income';
    const typeLabel = `[${type.toUpperCase()}]`;
    const colouredAmount = isIncome
      ? chalk.green(formatAmount(amount))
      : chalk.red(formatAmount(amount));

    console.log(
      `${index + 1}. ${typeLabel} ${description} - ${colouredAmount} (${chalk.yellow(category)})`
    );
  }
}

export function printSummary() {
  const largestExpense = getLargestExpense();

  console.log(chalk.bold('📊 FINANCIAL SUMMARY 📊'));
  console.log(
    chalk.bold('Total Income: ') + chalk.green(formatAmount(getTotalIncome()))
  );
  console.log(
    chalk.bold('Total Expenses: ') + chalk.red(formatAmount(getTotalExpenses()))
  );
  console.log(chalk.bold('Current Balance: ') + colourBalance(getBalance()));
  console.log();

  if (largestExpense === null) {
    console.log(chalk.bold('Largest Expense: ') + 'none');
  } else {
    const { description, amount } = largestExpense;
    console.log(
      chalk.bold('Largest Expense: ') +
        `${description} (${chalk.red(formatAmount(amount))})`
    );
  }
  console.log(chalk.bold(`Total Transactions: ${transactions.length}`));
}


export function removeTransactionById(id) {
  let index = 0;
  while (index < transactions.length) {
    if (transactions[index].id === id) {
      const [removedTransaction] = transactions.splice(index, 1);
      return removedTransaction;
    }
    index++;
  }
  return null;
}
