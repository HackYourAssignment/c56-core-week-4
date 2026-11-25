const {
  recordTransaction,
  getTotalIncome,
  getTotalExpenses,
  getBalance,
  getTransactionsByCategory,
  getLargestExpense,
  printAllTransactions,
} = require("./finance");


recordTransaction({
  id: 1,
  type: "income",
  amount: 5000,
  category: "salary",
  description: "Monthly salary",
});

recordTransaction({
  id: 2,
  type: "expense",
  amount: 1000,
  category: "food",
  description: "Groceries",
});

recordTransaction({
  id: 3,
  type: "expense",
  amount: 500,
  category: "transport",
  description: "train ticket",
});

// Display results
console.log("Total income:", getTotalIncome());
console.log("Total expenses:", getTotalExpenses());
console.log("Balance:", getBalance());
console.log("Food transactions:", getTransactionsByCategory("food"));
console.log("Largest expense:", getLargestExpense());

console.log("All transactions:");
printAllTransactions();
