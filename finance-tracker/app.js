// This is the entrypoint for your application.
// node app.js

const chalk = require('chalk');
const { printAllTransactions, printSummary } = require('./finance');

console.log(chalk.bold('💰 PERSONAL FINANCE TRACKER 💰\n'));
printAllTransactions();
printSummary();
