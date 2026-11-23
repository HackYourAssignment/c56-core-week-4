import { transactions } from "./data.js";
import chalk from "chalk";

export function addTransaction(transaction) {
  transactions.push({ ...transaction });
}

export function getTotalIncome() {
  let totalIncome = 0;
  for (const transaction of transactions) {
    if (transaction.type === "income") {
      totalIncome += transaction.amount;
    }
  }
  return chalk.green(totalIncome);
}

export function getTotalExpenses() {
  let totalExpenses = 0;
  for (const transaction of transactions) {
    if (transaction.type === "expense") {
      totalExpenses += transaction.amount;
    }
  }
  return chalk.red(totalExpenses);
}

export function getBalance() {
  let balance = 0;
  let index = 0;

  while (index < transactions.length) {
    const { type, amount } = transactions[index];
    // Income increases the balance, anything else (expense) decreases it
    if (type === "income") {
      balance += amount;
    } else {
      balance -= amount;
    }
    index++;
  }
  return balance >= 0 ? chalk.cyan(balance) : chalk.red(balance);
}

export function getTransactionsByCategory(category) {
  const matchingTransactions = [];
  for (const transaction of transactions) {
    if (transaction.category === category) {
      matchingTransactions.push(transaction);
    }
  }
  return matchingTransactions;
}

export function getLargestExpense() {
  let largestExpenseAmount = 0;
  let largestExpense;

  for (let transaction of transactions) {
    if (
      transaction.type === "expense" &&
      largestExpenseAmount < transaction.amount
    ) {
      largestExpenseAmount = transaction.amount;
      largestExpense = transaction.category;
    }
  }
  return `${chalk.yellow(largestExpense)} (${chalk.red(largestExpenseAmount)})`;
}

export function printAllTransactions() {
  let finalMessage = "💰 PERSONAL FINANCE TRACKER 💰\n\nAll Transactions:\n";
  for (let transaction of transactions) {
    finalMessage += `${transactions.indexOf(transaction) + 1}.`;
    if (transaction.type === "income") {
      finalMessage += `[INCOME] `;
    } else {
      finalMessage += `[EXPENSE] `;
    }
    finalMessage += `${chalk.yellow(transaction.category)} - €${transaction.type === "income" ? chalk.green(transaction.amount) : chalk.red(transaction.amount)} (${transaction.description})
`;
  }
  return finalMessage;
}

export function printSummary() {
  return `📊 FINANCIAL SUMMARY 📊
  Total Income: €${getTotalIncome()}
  Total Expenses: €${getTotalExpenses()}
  Current Balance: €${getBalance()}
  
  Largest Expense: ${getLargestExpense()}
  Total Transactions: ${transactions.length}`;
}
