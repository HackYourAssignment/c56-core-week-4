// This is the entrypoint for your application.
// node app.js
import chalk from 'chalk';
import { printAllTransactions, printSummary } from './finance.js';

console.log(chalk.bold('💰 PERSONAL FINANCE TRACKER 💰'));
console.log('');
printAllTransactions();
printSummary();
