import chalk from 'chalk';
import { transactions } from './data.js';

const data = { transactions };

// Add a new transaction using the spread operator
export function addTransaction(newTransaction) {
  data.transactions = [...data.transactions, newTransaction];
}

// Calculate total income using for...of and destructuring
export function getTotalIncome() {
  let totalIncome = 0;

  for (const transaction of data.transactions) {
    const { type, amount } = transaction;

    if (type === 'income') {
      totalIncome += amount;
    }
  }

  return totalIncome;
}

// Calculate total expenses using a traditional for loop
export function getTotalExpenses() {
  let totalExpenses = 0;

  for (let index = 0; index < data.transactions.length; index++) {
    const transaction = data.transactions[index];

    if (transaction.type === 'expense') {
      totalExpenses += transaction.amount;
    }
  }

  return totalExpenses;
}

// Calculate the balance
export function getBalance() {
  return getTotalIncome() - getTotalExpenses();
}

// Find all transactions matching a specific category
export function getTransactionsByCategory(category) {
  const matchingTransactions = [];

  for (const transaction of data.transactions) {
    if (transaction.category === category) {
      matchingTransactions.push(transaction);
    }
  }

  return matchingTransactions;
}

// Find the largest expense using a while loop
export function getLargestExpense() {
  let largestExpense = null;
  let index = 0;

  while (index < data.transactions.length) {
    const transaction = data.transactions[index];
    // Only compare expenses and keep the highest amount found
    if (transaction.type === 'expense') {
      if (!largestExpense || transaction.amount > largestExpense.amount) {
        largestExpense = transaction;
      }
    }
    index++;
  }

  return largestExpense;
}

// Display all transactions with Chalk formatting
export function printAllTransactions() {
  console.log(chalk.bold('\n--- All Transactions ---\n'));

  for (const transaction of data.transactions) {
    const { id, type, category, amount, description, date } = transaction;

    // Use different colors for income and expenses
    const formattedAmount =
      type === 'income' ? chalk.green(`+€${amount}`) : chalk.red(`-€${amount}`);

    console.log(`ID: ${id}`);
    console.log(`Type: ${type}`);
    console.log(`Category: ${chalk.yellow(category)}`);
    console.log(`Amount: ${formattedAmount}`);
    console.log(`Description: ${description}`);
    console.log(`Date: ${date}`);
    console.log('------------------------');
  }
}

// Display a summary of the financial situation
export function printSummary() {
  const totalIncome = getTotalIncome();
  const totalExpenses = getTotalExpenses();
  const balance = getBalance();
  const largestExpense = getLargestExpense();

  console.log(chalk.bold('\n--- Financial Summary ---'));

  console.log(chalk.bold(`Total Income: ${chalk.green(`€${totalIncome}`)}`));
  console.log(chalk.bold(`Total Expenses: ${chalk.red(`€${totalExpenses}`)}`));

  // Show a red balance if expenses exceed income
  const balanceColor = balance >= 0 ? chalk.cyan : chalk.red;

  console.log(chalk.bold(`Current Balance: ${balanceColor(`€${balance}`)}`));
  console.log(
    chalk.bold(`Number of Transactions: ${data.transactions.length}`)
  );

  if (largestExpense) {
    console.log(
      chalk.bold(
        `Largest Expense: ${chalk.red(`€${largestExpense.amount}`)} - ${largestExpense.description}`
      )
    );
  } else {
    console.log(chalk.bold('Largest Expense: No expenses found'));
  }

  console.log(chalk.bold('-------------------------\n'));
}
