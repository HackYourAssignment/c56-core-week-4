// This is the entrypoint for your application.
// node app.js
import promptSync from "prompt-sync";
import chalk from "chalk";
const green = chalk.green;
const red = chalk.red;
const yellow = chalk.yellow;
const cyan = chalk.cyan;
const bold = chalk.bold;
const prompt = promptSync();

import transactions from "./data.js";

import {
  addTransaction,
  printAllTransactions,
  getBalance,
  getLargestExpense,
  getTransactionsByCategory,
  getTotalIncome,
  getTotalExpenses,
} from "./finance.js";

console.log("💰 PERSONAL FINANCE TRACKER 💰");
let wantContinue = true;
while (wantContinue) {
  const userChoice = prompt(
    "Press \n 1. Log All your transactions \n 2. Log total Income \n 3. Add New Transaction \n 4. Log Total Expenses \n 5. Log Balance \n 6. Log transaction by category \n 7. Log Largest Expenses \n 8. Print Summery\n",
  );

  switch (userChoice.toLocaleLowerCase()) {
    case "1":
      userChoice: getAllTransactions();
      break;

    case "2":
      userChoice: printTotalIncome();
      break;

    case "3":
      userChoice: addNewTransaction();
      break;

    case "4":
      userChoice: printTotalExpense();
      break;

    case "5":
      userChoice: printBalance();
      break;
    case "6":
      userChoice: getTransactionsByCategory(transactions);
      break;
    case "7":
      userChoice: printLargestExpense();
      break;
    case "8":
      userChoice: printSummery();
      break;
    default:
      userChoice: printSummery();
      break;
  }
  console.log("---------------------------");
  wantContinue = prompt(`do you want to continue?`).toLowerCase();
  if (wantContinue === "n") {
    wantContinue = false;
    console.log("Good Bye!");
  } else {
    wantContinue = true;
  }
}

function printTotalIncome() {
  const totalIncome = getTotalIncome(transactions);
  const coloredIncome = totalIncome > 0 ? green : red;
  console.log("---------------------------");
  console.log(`Total income is €${coloredIncome(totalIncome)}`);
}
function printTotalExpense() {
  const totalExpense = getTotalExpenses(transactions);
  console.clear();
  console.log("---------------------------");
  console.log(`The total expense is: €${red(totalExpense)}`);
}
function printBalance() {
  const income = getTotalIncome(transactions);
  const expense = getTotalExpenses(transactions);
  const balance = getBalance(income, expense);

  const coloredBalance = balance > 0 ? green : red;
  console.log("---------------------------");
  console.log(`The total balance is: €${coloredBalance(balance)}`);
}
function getAllTransactions() {
  printAllTransactions(transactions);
}
function addNewTransaction() {
  const newTransaction = addTransaction(transactions);
  transactions.push(newTransaction);
  console.log("---------------------------");
  console.log(`Transaction is successfully added.`);
  for (const [key, value] of Object.entries(newTransaction)) {
    console.log(`${key}: ${value}`);
  }
}
function printLargestExpense() {
  const { amount, category, description } = getLargestExpense(transactions);
  console.log("---------------------------");
  console.log(`Maximum expense is : ${amount} for ${category}`);
}
function printSummery() {
  const totIncome = getTotalIncome(transactions);
  const totExpense = getTotalExpenses(transactions);
  const balance = getBalance(totIncome, totExpense);
  const { amount, category, description } = getLargestExpense(transactions);
  console.clear();
  console.log("---------------------------");
  console.log(`Summery of your transactions.`);

  const coloredIncome = totIncome >= 0 ? green(totIncome) : red(totIncome);
  const coloredExpense = totExpense <= 0 ? green(totExpense) : red(totExpense);
  const coloredBalance = balance >= 0 ? green(balance) : red(balance);
  const coloredMaxAmount = amount >= 0 ? red(amount) : green(amount);

  console.log(`
    Total Income: €${bold(coloredIncome)}
    Total Expense: €${bold(coloredExpense)}
    Total Balance: €${bold(coloredBalance)}
    Maximum Expense is: €${bold(coloredMaxAmount)} for the ${bold.yellow(category)}-${bold(description)}
    `);
}
