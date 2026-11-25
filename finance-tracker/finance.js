import { transactions } from './data.js';
import chalk from 'chalk';

function addTransaction(transaction) {
  transactions.push({ ...transaction });
}

function getTotalIncome() {
  let total = 0;
  for (let i = 0; i < transactions.length; i++) {
    if (transactions[i].type === 'income') {
      total += transactions[i].amount;
    }
  }
  return total;
}

function getTotalExpenses() {
  let expense = 0;
  for (let i = 0; i < transactions.length; i++) {
    if (transactions[i].type === 'expense') {
      expense += transactions[i].amount;
    }
  }
  return expense;
}

function getBalance() {
  return getTotalIncome() - getTotalExpenses();
}

function getTransactionsByCategory(category) {
  const matches = [];
  for (let i = 0; i < transactions.length; i++) {
    if (transactions[i].category === category) {
      matches.push(transactions[i]);
    }
  }
  return matches;
}

function getLargestExpense() {
  let largestExpense = null;
  for (let i = 0; i < transactions.length; i++) {
    if (transactions[i].type === 'expense') {
      if (
        largestExpense === null ||
        transactions[i].amount > largestExpense.amount
      ) {
        largestExpense = transactions[i];
      }
    }
  }
  return largestExpense;
}

function printAllTransactions() {
  console.log(`All Transactions: `);
  for (let i = 0; i < transactions.length; i++) {
    const { type, description, amount, category } = transactions[i];

    let kind = '';
    if (type === 'income') {
      kind = '[INCOME]';
    } else {
      kind = '[EXPENSE]';
    }
    const coloredKind = type === 'income' ? chalk.green(kind) : chalk.red(kind);
    const coloredCategory = chalk.yellow(category);
    const coloredAmount =
      type === 'income' ? chalk.green(`€${amount}`) : chalk.red(`€${amount}`);
    console.log(
      `${i + 1}. ${coloredKind} ${description} - ${coloredAmount} (${coloredCategory})`,
    );
  }
}

function printSummary() {
  console.log(``);
  console.log(chalk.bold(`FINANCIAL SUMMARY`));
  console.log(chalk.bold(`Total Income: €${chalk.green(getTotalIncome())}`));
  console.log(chalk.bold(`Total Expenses: €${chalk.red(getTotalExpenses())}`));
  console.log(
    chalk.bold(
      `Current Balance: €${getBalance() >= 0 ? chalk.cyan(getBalance()) : chalk.red(getBalance())}`,
    ),
  );
  console.log(``);
  const largestExpense = getLargestExpense();

  if (largestExpense !== null) {
    console.log(
      chalk.bold(
        `Largest Expense: ${largestExpense.description} (€${largestExpense.amount})`,
      ),
    );
  } else {
    console.log(chalk.bold('Largest Expense: No expenses'));
  }
  console.log(chalk.bold(`Total Transactions: ${transactions.length} `));
}
export { printAllTransactions, printSummary };
