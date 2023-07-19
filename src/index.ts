import { CheckingAccount } from "./entities/CheckingAccount"; 
import { SavingsAccount } from "./entities/SavingsAccount";
import { PaymentAccount } from "./entities/PaymentAccount";
import { BusinessAccount } from "./entities/BusinessAccount";

// Create a checking account with an overdraft limit of 1000
const checkingAccount = new CheckingAccount({
  name: "John Doe",
  accountNumber: "123",
  overdraftLimit: 500,
});

// Create a savings account
const savingsAccount = new SavingsAccount({
  name: "John Doe",
  accountNumber: "456",
});

// Create a payment account
const paymentAccount = new PaymentAccount({
  name: "John Doe",
  accountNumber: "789",
});

// Create a business account with a loan limit of 20000
const businessAccount = new BusinessAccount({
  name: "John Doe",
  accountNumber: "101112",
  loanLimit: 20000,
});

console.group("Checking account");
console.group("Initial status:");
console.log(checkingAccount.toString());
console.groupEnd();

console.group("Transactions:")
// Deposit 1000 to checking account
// Withdraw 500 from checking account
// Transfer 500 from checking account to savings account
// Payment 500 from checking account
// These transactions must occur correctly
try {
  console.log("Deposit 1000 to checking account");
  checkingAccount.deposit(1000);
  console.log("Withdraw 500 from checking account");
  checkingAccount.withdraw(500);
  console.log("Transfer 500 from checking account to savings account");
  checkingAccount.transfer(500, savingsAccount);
  console.log("Payment 500 from checking account");
  checkingAccount.payment(500);
} catch (error) {
  console.log(error.message);
}

// This transaction should report insufficient balance error
try {
  console.log("Withdraw 500 from checking account (insufficient balance)");
  checkingAccount.withdraw(500);
} catch (error) {
  console.log(error.message);
}

console.groupEnd();

console.group("Final status:");
// The balance of checking account must be 0
console.log(checkingAccount.bankStatement());
console.groupEnd();
console.groupEnd();

console.group("Savings account");
console.group("Initial status:");
// The balance of savings account must be 500
console.log(savingsAccount.toString());
console.groupEnd();

console.group("Transactions:")
// Deposit 500 to checking account
// Withdraw 200 from checking account
// These transactions must occur correctly
try {
  console.log("Deposit 500 to savings account");
  savingsAccount.deposit(500);
  console.log("Withdraw 200 from savings account");
  savingsAccount.withdraw(200);
} catch (error) {
  console.log(error.message);
}

console.log("Apply earnings to savings account");
// Let's assume that the end of the month has arrived and we apply the income from the account
// Savings account balance before earnings should be 800, after amount should be 840
savingsAccount.applyEarnings();

// This transaction must occur correctly
try {
  console.log("Transfer 500 from savings account to payment account");
  savingsAccount.transfer(500, paymentAccount);
} catch (error) {
  console.log(error.message);
}

console.groupEnd();

console.group("Final status:");
// The balance of savings account must be 340
console.log(savingsAccount.bankStatement());
console.groupEnd();
console.groupEnd();

console.group("Payment account");
console.group("Initial status:");
// The balance of payment account must be 500
console.log(paymentAccount.toString());
console.groupEnd();

console.group("Transactions:")
// Deposit 500 to payment account
// Payment 200 from payment account
// These transactions must occur correctly
try {
  console.log("Deposit 500 to payment account");
  paymentAccount.deposit(500);
  console.log("Payment 200 from payment account");
  paymentAccount.payment(200);
} catch (error) {
  console.log(error.message);
}

// Transfer 500 from payment account to checking account
// This transaction should report disallowed error
try {
  console.log("Transfer 500 from payment account to checking account (disallowed)");
  paymentAccount.transfer(500, checkingAccount);
} catch (error) {
  console.log(error.message);
}

// Withdraw 500 from payment account
// This transaction should report disallowed error
try {
  console.log("Withdraw 500 from payment account (disallowed)");
  paymentAccount.withdraw(500);
} catch (error) {
  console.log(error.message);
}

console.groupEnd();

console.group("Final status:");
// The balance of payment account must be 800
console.log(paymentAccount.bankStatement());
console.groupEnd();
console.groupEnd();


console.group("Business account");
console.group("Initial status:");
// The balance of business account must be 0
console.log(businessAccount.toString());
console.groupEnd();

console.group("Transactions:")
// Deposit 1000 to business account
// Borrow 15000 from business account
// These transactions must occur correctly
try {
  console.log("Deposit 1000 to business account");
  businessAccount.deposit(1000);
  console.log("Borrow 15000 from business account");
  businessAccount.borrow(15000);
} catch (error) {
  console.log(error.message);
}

// Borrow 10000 from business account
// This transaction should report insufficient limit error
try {
  console.log("Borrow 10000 from business account (insufficient limit)");
  businessAccount.borrow(10000);
} catch (error) {
  console.log(error.message);
}

// Pay loan 18000 from business account
// This transaction must occur correctly
try {
  console.log("Pay loan 8000 from business account");
  businessAccount.payLoan(8000);
} catch (error) {
  console.log(error.message);
}

console.groupEnd();

console.group("Final status:");
// The balance of business account must be 8000
// The loan business account must be 7000
console.log(businessAccount.bankStatement());
console.groupEnd();
console.groupEnd();
