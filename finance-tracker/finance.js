import promptSync from "prompt-sync";
import chalk from "chalk";
const green = chalk.green;
const red = chalk.red;
const yellow = chalk.yellow;
const cyan = chalk.cyan;
const bold = chalk.bold;
const prompt = promptSync();

import transactions from "./data.js";
function addTransaction(transaction) {
  console.log("Welcome to Enter your expenses");

  let transactionId = transaction.length + 1;
  let type = prompt(
    "Choose type of the transaction: \n 1. for income \n 2. for expense. \n 3.for Other \n",
  );
  switch (Number(type)) {
    case 1:
      type = "income";
      break;
    case 2:
      type = "expense";
      break;
    default:
      type = "other";
  }

  let category = prompt(
    "Choose category of the transaction:\n 1. Salary \n 2. Loan \n 3. Gift  \n 4. for Lottery \n 5. for Other\n",
  );
  switch (Number(category)) {
    case 1:
      category = "Salary";
      break;
    case 2:
      category = "Loan";
      break;
    case 3:
      category = "Gift";
      break;
    case 4:
      category = "Lottery";
      break;
    default:
      category = "other";
  }
  let amount = prompt("Enter amount: ");
  let description = prompt("Enter description: ");
  const date = new Date().toISOString().split("T")[0];
  const newTransaction = {
    id: transactionId,
    type: type,
    category: category,
    amount: amount,
    description: description,
    date: date,
  };

  return newTransaction;
}

function getTotalIncome(transactions) {
  let totalIncome = 0;

  transactions.forEach((transaction) => {
    const { type, amount } = transaction;
    if (type === "income") {
      totalIncome += amount;
    }
  });

  return totalIncome;
}

function getTotalExpenses() {
  let totalExpense = 0;

  transactions.forEach((transaction) => {
    const { type, amount } = transaction;
    if (type === "expense") {
      totalExpense += amount;
    }
  });
  return totalExpense;
}

function getBalance(income, expense) {
  let balance;
  balance = income - expense;
  return balance;
}

function getTransactionsByCategory(transactions) {
  const totals = {};
  const categoryTypes = {};

  for (const transaction of transactions) {
    const { category, amount, type } = transaction;
    const cleanedAmount =
      Number(String(amount ?? "").replace(/[^0-9.-]+/g, "")) || 0;

    if (!totals[category]) {
      totals[category] = 0;
      categoryTypes[category] = type;
    }

    totals[category] += cleanedAmount;
  }

  console.clear();

  console.log("---------------------------");
  console.log("Transactions by Category:");
  for (const category in totals) {
    const total = totals[category];
    const type = categoryTypes[category];
    const coloredAmount = type === "expense" ? chalk.red : chalk.green;
    console.log(`${yellow(category)}: €${coloredAmount(total)}`);
  }
}

function getLargestExpense(transactions) {
  let largest = null;

  for (const transaction of transactions) {
    const { type, amount } = transaction;
    const cleanedAmount =
      Number(String(amount ?? "").replace(/[^0-9.-]+/g, "")) || 0;

    if (type !== "expense") continue;

    if (!largest || cleanedAmount > largest.amount) {
      largest = {
        ...transaction,
        amount: cleanedAmount,
      };
    }
  }
  return largest;
}
function printAllTransactions(transactions) {
  console.log("---------------------------");
  console.log("All Transactions:");
  transactions.forEach((transaction, index) => {
    const { type, amount, category, description, date } = transaction;
    const coloredAmount = type === "expense" ? chalk.red : chalk.green;
    console.log(
      `${index + 1}.[${type}] ${chalk.yellow(category)}  - €${coloredAmount(amount)}( ${chalk.bold(description)} at ${chalk.underline(date)})`,
    );
  });
}

export {
  addTransaction,
  printAllTransactions,
  getBalance,
  getLargestExpense,
  getTransactionsByCategory,
  getTotalIncome,
  getTotalExpenses,
};
