import { Account } from "./Account";
import { Transaction } from "./Transaction";

type CheckingAccountProps = {
  name: string;
  accountNumber: string;
  overdraftLimit: number;
};

export class CheckingAccount extends Account {
  private _overdraftLimit: number = 0;

  constructor({
    name,
    accountNumber,
    overdraftLimit,
  }: CheckingAccountProps) {
    super({
      name,
      accountNumber,
      accountType: "checking",
    });
    this._overdraftLimit = overdraftLimit;
  }

  get overdraftLimit(): number {
    return this._overdraftLimit;
  }

  protected updateOverdraftLimit(value: number): void {
    this._overdraftLimit = value;
  }

  // Checking account has an overdraft limit that allows the account to go into negative balance
  withdraw(amount: number): void {
    if (amount > this.balance + this._overdraftLimit) {
      throw new Error("Insufficient funds");
    }

    this.setBalance(this.balance - amount);
    this.addTransaction(new Transaction(amount, new Date(), "withdrawal"));
  }

  // Checking account has an overdraft limit that allows the account to go into negative balance
  transfer(amount: number, toAccount: Account): void {
    if (amount > this.balance + this._overdraftLimit) {
      throw new Error("Insufficient funds");
    }

    this.setBalance(this.balance - amount);
    toAccount.deposit(amount);
    this.addTransaction(new Transaction(amount, new Date(), "transfer"));
  }

  // Checking account has an overdraft limit that allows the account to go into negative balance
  payment(amount: number): void {
    if (amount > this.balance + this._overdraftLimit) {
      throw new Error("Insufficient funds");
    }

    this.setBalance(this.balance - amount);
    this.addTransaction(new Transaction(amount, new Date(), "payment"));
  }

  toString(): string {
    let accountInfo = super.toString();
    accountInfo += `Overdraft limit: ${this._overdraftLimit}`

    return accountInfo;
  }
}
