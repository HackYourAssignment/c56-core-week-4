// This is the entrypoint for your application.
// node app.js

const finance = require("./finance");
console.log("💰 PERSONAL FINANCE TRACKER 💰");
console.log("\nAll Transactions:");
finance.printAllTransactions();
finance.printSummary();
