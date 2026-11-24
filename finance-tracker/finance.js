const chalk = require('chalk');
const transactions = require('./data');

// Add transaction
function addTransaction(newTransaction) {
  transactions.push({ ...newTransaction });
}

// Calculate total income
function getTotalIncome() {
  let total = 0;

  for (let item of transactions) {
    if (item.type === 'income') {
      total += item.amount;
    }
  }

  return total;
}

// Calculate total expenses
function getTotalExpenses() {
  let total = 0;

  for (let item of transactions) {
    if (item.type === 'expense') {
      total += item.amount;
    }
  }

  return total;
}

// Calculate balance
function getBalance() {
  return getTotalIncome() - getTotalExpenses();
}

// Find transactions by category
function getTransactionsByCategory(category) {
  let result = [];

  for (let item of transactions) {
    if (item.category === category) {
      result.push(item);
    }
  }

  return result;
}

// Find largest expense
function getLargestExpense() {
  let largest = null;

  for (let item of transactions) {
    if (item.type === 'expense') {
      if (largest === null || item.amount > largest.amount) {
        largest = item;
      }
    }
  }

  return largest;
}

// Print all transactions
function printAllTransactions() {
  console.log(chalk.bold('=== All Transactions ==='));

  for (let item of transactions) {
    const { description, category, amount, type } = item;

    let coloredAmount;

    if (type === 'income') {
      coloredAmount = chalk.green('€' + amount);
    } else {
      coloredAmount = chalk.red('€' + amount);
    }

    console.log(
      description + ' | ' + chalk.yellow(category) + ' | ' + coloredAmount,
    );
  }
}

// Print summary
function printSummary() {
  console.log(chalk.bold('\n=== Financial Summary ==='));

  console.log(
    chalk.bold('Total Income: ') + chalk.green('€' + getTotalIncome()),
  );

  console.log(
    chalk.bold('Total Expenses: ') + chalk.red('€' + getTotalExpenses()),
  );

  let balance = getBalance();

  if (balance >= 0) {
    console.log(chalk.bold('Balance: ') + chalk.cyan('€' + balance));
  } else {
    console.log(chalk.bold('Balance: ') + chalk.red('€' + balance));
  }

  console.log('Number of Transactions: ' + transactions.length);

  let largest = getLargestExpense();

  if (largest !== null) {
    console.log(
      'Largest Expense: ' + largest.description + ' - €' + largest.amount,
    );
  }
}


function getTransactionsByDate(startDate, endDate) {
  if (startDate > endDate) {
    return [];
  }

  let sorted = [...transactions];

  sorted.sort((a, b) => a.date.localeCompare(b.date));

  let startIndex = sorted.findIndex(item => item.date >= startDate);
  let endIndex = sorted.findIndex(item => item.date > endDate);

  if (startIndex === -1) {
    return [];
  }

  if (endIndex === -1) {
    endIndex = sorted.length;
  }

  return sorted.slice(startIndex, endIndex);
}


function groupTransactionsByMonth() {
  let months = {};

  for (let item of transactions) {
    let month = item.date.slice(0, 7);

    if (!months[month]) {
      months[month] = {
        income: [],
        expenses: [],
      };
    }

    if (item.type === 'income') {
      months[month].income.push(item);
    } else {
      months[month].expenses.push(item);
    }
  }

  return months;
}

function getAverageExpenseByCategory() {
  let categories = {};

  for (let item of transactions) {
    if (item.type === 'expense') {
      if (!categories[item.category]) {
        categories[item.category] = {
          total: 0,
          count: 0,
        };
      }

      categories[item.category].total += item.amount;
      categories[item.category].count++;
    }
  }

  let averages = {};

  for (let category in categories) {
    averages[category] =
      categories[category].total / categories[category].count;
  }

  return averages;
}


function removeTransaction(id) {
  for (let i = 0; i < transactions.length; i++) {
    if (transactions[i].id === id) {
      transactions.splice(i, 1);
      return true;
    }
  }

  return false;
}


/*
  This function finds consecutive expensive months.

  First, we calculate total expenses for each month.
  Then, we sort the months in chronological order.
  Finally, a while loop checks whether two or more
  consecutive calendar months exceed the expense limit.
*/
function findConsecutiveExpensiveMonths(limit = 1200) {
  let monthlyTotals = {};

  for (let item of transactions) {
    if (item.type === 'expense') {
      let month = item.date.slice(0, 7);

      if (!monthlyTotals[month]) {
        monthlyTotals[month] = 0;
      }

      monthlyTotals[month] += item.amount;
    }
  }

  let months = Object.keys(monthlyTotals).sort();
  let result = [];
  let currentGroup = [];
  let i = 0;

  while (i < months.length) {
    let month = months[i];

    if (monthlyTotals[month] > limit) {
      let previousMonth = currentGroup[currentGroup.length - 1];

      if (previousMonth) {
        let nextDate = new Date(previousMonth + '-01');
        nextDate.setUTCMonth(nextDate.getUTCMonth() + 1);
        let expectedMonth = nextDate.toISOString().slice(0, 7);

        if (month !== expectedMonth) {
          if (currentGroup.length >= 2) {
            result.push(currentGroup);
          }
          currentGroup = [];
        }
      }

      currentGroup.push(month);
    } else {
      if (currentGroup.length >= 2) {
        result.push(currentGroup);
      }

      currentGroup = [];
    }

    i++;
  }

  if (currentGroup.length >= 2) {
    result.push(currentGroup);
  }

  return result;
}



// Export functions

module.exports = {
  addTransaction,
  getTotalIncome,
  getTotalExpenses,
  getBalance,
  getTransactionsByCategory,
  getLargestExpense,
  printAllTransactions,
  printSummary,
  getTransactionsByDate,
  groupTransactionsByMonth,
  getAverageExpenseByCategory,
  removeTransaction,
  findConsecutiveExpensiveMonths,
};

