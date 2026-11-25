const transactions = require("./data");

function recordTransaction(transaction) {
  transactions.push(transaction);
}

function getTotalIncome() {
  return transactions
    .filter((transaction) => transaction.type === "income")
    .reduce((total, transaction) => total + transaction.amount, 0);
}

function getTotalExpenses() {
  return transactions
    .filter((transaction) => transaction.type === "expense")
    .reduce((total, transaction) => total + transaction.amount, 0);
}

function getBalance() {
  return getTotalIncome() - getTotalExpenses();
}

function getTransactionsByCategory(category) {
  return transactions.filter(
    (transaction) => transaction.category === category
  );
}

function getLargestExpense() {
  const expenses = transactions.filter(
    (transaction) => transaction.type === "expense"
  );

  if (expenses.length === 0) {
    return null;
  }

  return expenses.reduce((largest, transaction) => {
    return transaction.amount > largest.amount ? transaction : largest;
  });
}

function printAllTransactions() {
  transactions.forEach((transaction) => {
    console.log(transaction);
  });
}

module.exports = {
  recordTransaction,
  getTotalIncome,
  getTotalExpenses,
  getBalance,
  getTransactionsByCategory,
  getLargestExpense,
  printAllTransactions,
};