import { Account } from "./Account";
import { Transaction } from "./Transaction";

type SavingsAccountProps = {
  name: string;
  accountNumber: string;
};

export class SavingsAccount extends Account {
  constructor({
    name,
    accountNumber,
  }: SavingsAccountProps) {
    super({
      name,
      accountNumber,
      accountType: "savings",
    });
  }

  // Savings account has automatic earnings that increase the balance based on the amount in the account over a period of time
  applyEarnings(): void {
    const earnings = this.balance * 0.05;
    this.setBalance(this.balance + earnings);
    this.addTransaction(new Transaction(earnings, new Date(), "earnings"));
  }

  toString(): string {
    return `${this.name} has a balance of ${this.balance}`;
  }
}
