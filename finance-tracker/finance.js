import chalk from 'chalk';
import { transactions } from './data.js';

export function addTransaction(transaction) {
  const nextId =
    transactions.length > 0 ? transactions[transactions.length - 1].id + 1 : 1;

  const entry = {
    id: nextId,
    ...transaction,
  };

  transactions.push(entry);
  return entry;
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

  for (let i = 0; i < transactions.length; i++) {
    if (transactions[i].type === 'expense') {
      totalExpenses += transactions[i].amount;
    }
  }

  return totalExpenses;
}
export function getBalance() {
  let balance = 0;
  let index = 0;

  while (index < transactions.length) {
    const { type, amount } = transactions[index];

    if (type === 'income') {
      balance += amount;
    } else if (type === 'expense') {
      balance -= amount;
    }

    index++;
  }

  return balance;
}

export function getTransactionsByCategory(category) {
  const matches = [];
  const search = category.toLowerCase();

  for (const transaction of transactions) {
    if (transaction.category.toLowerCase() === search) {
      matches.push(transaction);
    }
  }

  return matches;
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

  return largestExpense;
}

export function printAllTransactions() {
  console.log(chalk.bold('💰 PERSONAL FINANCE TRACKER 💰'));
  console.log('');
  console.log(chalk.bold('All Transactions:'));

  for (let i = 0; i < transactions.length; i++) {
    const { type, description, amount, category } = transactions[i];
    const kind = type === 'income' ? '[INCOME]' : '[EXPENSE]';
    const coloredKind = type === 'income' ? chalk.green(kind) : chalk.red(kind);
    const coloredAmount =
      type === 'income' ? chalk.green(`€${amount}`) : chalk.red(`€${amount}`);
    const coloredCategory = chalk.yellow(`(${category})`);

    console.log(
      `${i + 1}. ${coloredKind} ${description} - ${coloredAmount} ${coloredCategory}`,
    );
  }
}

export function printSummary() {
  const totalIncome = getTotalIncome();
  const totalExpenses = getTotalExpenses();
  const balance = getBalance();
  const largestExpense = getLargestExpense();

  const coloredBalance =
    balance >= 0 ? chalk.cyan(`€${balance}`) : chalk.red(`€${balance}`);

  console.log('');
  console.log(chalk.bold('📊 FINANCIAL SUMMARY 📊'));
  console.log(chalk.bold(`Total Income: ${chalk.green(`€${totalIncome}`)}`));
  console.log(chalk.bold(`Total Expenses: ${chalk.red(`€${totalExpenses}`)}`));
  console.log(chalk.bold(`Current Balance: ${coloredBalance}`));
  console.log('');

  if (largestExpense !== null) {
    console.log(
      chalk.bold(
        `Largest Expense: ${largestExpense.description} (${chalk.red(`€${largestExpense.amount}`)})`,
      ),
    );
  } else {
    console.log(chalk.bold('Largest Expense: No expenses'));
  }

  console.log(chalk.bold(`Total Transactions: ${transactions.length}`));
}
