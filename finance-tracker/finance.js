let transactions = require('./data.js');

function addTransaction(newTransaction) {
  transactions = [...transactions, newTransaction];
}

function getTotalIncome() {
  let totalIncome = 0;
  for (let transaction of transactions) {
    if (transaction.type === 'income') {
      totalIncome += transaction.amount;
    }
  }
  return totalIncome;
}

function getTotalExpenses() {
  let totalExpenses = 0;
  for (let transaction of transactions) {
    if (transaction.type === 'expense') {
      totalExpenses += transaction.amount;
    }
  }
  return totalExpenses;
}

function getBalance() {
  return getTotalIncome() - getTotalExpenses();
}

function getTransactionsByCategory(category) {
  const filteredTransactions = [];
  for (let transaction of transactions) {
    if (transaction.category === category) {
      filteredTransactions.push(transaction);
    }
  }
  return filteredTransactions;
}

function getLargestExpense() {
  const expenses = transactions.filter(
    (transaction) => transaction.type === 'expense',
  );
  return expenses.reduce(
    (max, transaction) => (transaction.amount > max.amount ? transaction : max),
    { amount: 0 },
  );
}
function printAllTransactions() {
  console.log('\n💰 PERSONAL FINANCE TRACKER 💰');
  console.log('All Transactions:');

  const chalk = require('chalk');
  let number = 1;
  for (const { type, category, amount, description, date } of transactions) {
    const formattAmount =
      type === 'income' ? chalk.green(`$${amount}`) : chalk.red(`$${amount}`);
    console.log(
      `${number}. [${type.toUpperCase()}] - ${category} - $${amount} - ${description} - ${date}`,
    );

    number++;
  }
}

function printSummary() {
  console.log('\n📊 FINANCIAL SUMMARY 📊');
  console.log(`Total Income: $${getTotalIncome()}`);
  console.log(`Total Expenses: $${getTotalExpenses()}`);
  console.log(`Balance: $${getBalance()}`);
  console.log(`Total Transactions: ${transactions.length}`);
  const largestExpense = getLargestExpense();
  console.log(
    `Largest Expense: ${largestExpense.description} - $${largestExpense.amount}`,
  );
}

printAllTransactions();
printSummary();
