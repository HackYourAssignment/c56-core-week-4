const chalk = require("chalk");
let { transactions } = require("./data");
function addTransaction(newTransaction) {
  transactions = [...transactions, newTransaction];
}

function getTotalIncome() {
  let totalIncome = 0;
  for (const transaction of transactions) {
    if (transaction.type === "income") {
      totalIncome += transaction.amount;
    }
  }
  return totalIncome;
}

function getTotalExpenses() {
  let totalExpenses = 0;
  for (const transaction of transactions) {
    if (transaction.type === "expense") {
      totalExpenses += transaction.amount;
    }
  }
  return totalExpenses;
}

function getBalance() {
  return getTotalIncome() - getTotalExpenses();
}

function getTransactionsByCategory(category) {
  const matchingTransactions = [];
  for (const transaction of transactions) {
    if (transaction.category === category) {
      matchingTransactions.push(transaction);
    }
  }
  return matchingTransactions;
}

function getLargestExpense() {
  // Find the largest expense using the "king of the hill" idea:
  // keep the biggest expense seen so far, and replace it when we find a bigger one.
  let largestExpense = null;
  let index = 0;
  while (index < transactions.length) {
    const transaction = transactions[index];
    if (transaction.type === "expense") {
      if (
        largestExpense === null ||
        transaction.amount > largestExpense.amount
      ) {
        largestExpense = transaction;
      }
    }
    index++;
  }
  return largestExpense;
}

function printAllTransactions() {
  for (let i = 0; i < transactions.length; i++) {
    const { type, category, amount, description } = transactions[i];
    let amountText = `€${amount}`;
    if (type === "income") {
      amountText = chalk.green(amountText);
    } else {
      amountText = chalk.red(amountText);
    }
    console.log(
      `${i + 1}. [${type.toUpperCase()}] ${description} - ${amountText} (${chalk.yellow(category)})`,
    );
  }
}

function printSummary() {
  const totalIncome = getTotalIncome();
  const totalExpenses = getTotalExpenses();
  const balance = getBalance();
  const largestExpense = getLargestExpense();
  const transactionCount = transactions.length;
  console.log(chalk.bold("\n📊 FINANCIAL SUMMARY 📊"));
  console.log(chalk.bold(`Total Income: €${totalIncome}`));
  console.log(chalk.bold(`Total Expenses: €${totalExpenses}`));
  if (balance < 0) {
    console.log(chalk.red(`Current Balance: €${balance}`));
  } else {
    console.log(chalk.cyan(`Current Balance: €${balance}`));
  }
  console.log("");
  if (largestExpense !== null) {
    console.log(
      `Largest Expense: ${largestExpense.description} (€${largestExpense.amount})`,
    );
  }
  console.log(`Total Transactions: ${transactionCount}`);
}

module.exports = {
  addTransaction,
  getTotalIncome,
  getTotalExpenses,
  getBalance,
  getTransactionsByCategory,
  getLargestExpense,
  printAllTransactions,
  printSummary,
};
