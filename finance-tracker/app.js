import chalk from 'chalk';
import {
  addTransaction,
  getTransactionsByCategory,
  printAllTransactions,
  printSummary,
} from './finance.js';

printAllTransactions();

printSummary();
console.log(chalkHeading('--- Rent Transactions ---'));
console.log(getTransactionsByCategory('rent'));

addTransaction({
  type: 'expense',
  category: 'transport',
  amount: 50,
  description: 'Monthly bus ticket',
  date: '2025-01-25',
});

console.log(chalkHeading('--- Updated Summary ---'));
printSummary();

function chalkHeading(text) {
  return `\n${chalk.bold(text)}\n`;
}
