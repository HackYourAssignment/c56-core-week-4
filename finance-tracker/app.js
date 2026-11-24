import chalk from 'chalk';
import { transactions } from './data.js';
import {
  getTotalIncome,
  getTotalExpenses,
  getBalance,
  getLargestExpense,
  printAllTransactions,
} from './finance.js';

function printSummmry() {
  const income = getTotalIncome();
  const expenses = getTotalExpenses();
  const balance = getBalance();
  const count = transactions.length;
  const largestExpense = getLargestExpense();

  console.log('💰 PERSONAL FINANCE TRACKER 💰');
  printAllTransactions();
  console.log(`
    📊 FINANCIAL SUMMARY 📊
    Total income: €${chalk.green(income)}
    Total expenses: €${chalk.red(expenses)}
    Current budget: €${chalk.yellow(balance)}
    
    Largest Expense: ${largestExpense}
    Total Transactions: ${chalk.blue(count)}`);
}

printSummmry();
