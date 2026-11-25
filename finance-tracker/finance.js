import chalk from 'chalk';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween.js';
import { transactions } from './data.js';

dayjs.extend(isBetween);

// Utils
const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

export function addTransaction(transaction) {
  const data = transactions;
  if (
    typeof transaction === 'object' &&
    Object.keys(transaction).length === 6
  ) {
    transactions.push(transaction);
    console.log(chalk.green('Success'));
    console.table(transactions);
  } else {
    console.error(
      `Transaction may miss some keys! Got ${Object.keys(transaction).length} and expected 6`,
    );
  }
}
export function getTotalIncome() {
  const result = transactions
    .filter(({ type }) => type === 'income')
    .reduce((acc, { amount }) => acc + amount, 0);
  console.log(`Total income: ${result}`);
  return result;
}
export function getTotalExpenses() {
  const result = transactions
    .filter(({ type }) => type === 'expense')
    .reduce((acc, tr) => acc + tr.amount, 0);
  console.log(`Total expenses: ${result}`);
  return result;
}
export function getBalance() {
  const income = getTotalIncome();
  const expenses = getTotalExpenses();

  const balance = income - expenses;

  console.log(
    `Current Balance: ${balance > 0 ? chalk.cyan(balance) : chalk.red(balance)}`,
  );
  return balance;
}

export function getTransactionsByCategory(category) {
  const result = transactions.filter((tr) => tr.category === category);
  console.log('All transactions by a category: ' + category);
  console.log(result.length ? result : 'nothing was found');
  return result;
}

export function getLargestExpense() {
  let largestSum = 0;
  let largestIndx = 0;

  transactions.forEach((tr, indx) => {
    if (tr.type === 'expense' && tr.amount > largestSum) {
      largestSum = tr.amount;
      largestIndx = indx;
    }
  });
  console.log(
    `Largest expense: ${chalk.yellow(transactions[largestIndx].category)} (${transactions[largestIndx].amount} EUR)`,
  );
  return transactions.at(largestIndx);
}

export function printAllTransactions(data) {
  console.log(chalk.bold('All Transactions:'));

  data.forEach((transation, indx) => {
    const type =
      transation.type === 'expense'
        ? `[ ${chalk.red(transation.type.toUpperCase())} ]`
        : `[ ${chalk.green(transation.type.toUpperCase())} ]`;
    const category = chalk.yellow(capitalize(transation.category));

    console.log(
      `${indx + 1}. ${type} ${category} - ${transation.amount}EUR (${transation.description})`,
    );
  });
}

/** startDate and endDate to be given in yyyy-mm-dd format */
export const findByDateRange = ({ startDate, endDate }) => {
  const result = transactions.filter((tr) =>
    dayjs(tr.date).isBetween(startDate, endDate, 'day'),
  );

  console.log(
    result.length ? result : 'Nothing was found for the requested time-range',
  );
  return result.length ? result : [];
};

export const removeTransactionById = (id) => {
  const searchedIndx = transactions.findIndex((el) => el.id === id);

  if (searchedIndx !== -1) {
    transactions.splice(searchedIndx, 1);
    console.log(chalk.green('Transaction removed successfully'));
  } else {
    console.log(chalk.red('Transaction not found'));
  }
};
