import { transactions } from './data.js';

export function addTransaction(transaction) {
  if (
    typeof transaction === 'object' &&
    Object.keys(transaction).length === 6
  ) {
    transactions.push(transaction);
  } else {
    console.error(
      `Transaction may miss some keys! Got ${Object.keys(transaction).length} and expected 6`,
    );
  }
}
export function getTotalIncome() {
  const result = transactions
    .filter(({ type }) => type === 'income')
    .reduce((acc, { amount }) => acc + amount, 0);
  return result;
}
export function getTotalExpenses() {
  const result = transactions
    .filter(({ type }) => type === 'expense')
    .reduce((acc, tr) => acc + tr.amount, 0);
  return result;
}
export function getBalance() {
  // TODO: Implement this function
}

export function getTransactionsByCategory(category) {
  const result = transactions.filter((tr) => tr.category === category);

  return result.length ? result : [];
}
export function getLargestExpense() {
  let largestSum = 0;
  let largestIndx = 0;

  transactions.forEach((tr, indx) => {
    if (tr.type === 'expense' && tr.amount > largestSum) {
      largestSum = tr.amount;
      largestIndx = indx;
    }
  });
  console.log(
    `Largest expense: ${transactions[largestIndx].description} (${transactions[largestIndx].amount} EUR)`,
  );
  return transactions.at(largestIndx);
}
export function printAllTransactions() {
  // TODO: Implement this function
}
