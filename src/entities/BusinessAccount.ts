import { Account } from "./Account";
import { Transaction } from "./Transaction";

type BusinessAccountProps = {
  name: string;
  accountNumber: string;
  loanLimit: number;
};

export class BusinessAccount extends Account {
  private _loanLimit: number = 2000;
  private _loan: number = 0;

  constructor({
    name,
    accountNumber,
    loanLimit,
  }: BusinessAccountProps) {
    super({
      name,
      accountNumber,
      accountType: "business",
    });
    this._loanLimit = loanLimit;
  }

  get loanLimit(): number {
    return this._loanLimit;
  }

  get loan(): number {
    return this._loan;
  }

  protected updateLoanLimit(value: number): void {
    this._loanLimit = value;
  }

  protected setLoan(amount: number): void {
    this._loan = amount;
  }

  // Business account has a loan feature that allows the account holder to take out a loan
  borrow(amount: number): void {
    if (amount + this._loan > this.loanLimit) {
      throw new Error("Loan amount exceeds limit");
    }

    this.setLoan(this.loan + amount);
    this.setBalance(this.balance + amount);
    this.addTransaction(new Transaction(amount, new Date(), "borrow"));
  }

  // Business account has a loan feature that allows the account holder to pay back the loan
  payLoan(amount: number): void {
    if (amount > this.balance) {
      throw new Error("Insufficient funds");
    }

    if (amount > this.loan) {
      const remainder = amount - this.loan;
      this.setLoan(0);
      this.setBalance(this.balance - amount + remainder);
      this.addTransaction(new Transaction(amount - remainder, new Date(), "loan"));
    } else {
      this.setLoan(this.loan - amount);
      this.setBalance(this.balance - amount);
      this.addTransaction(new Transaction(amount, new Date(), "loan"));
    }
  }

  toString(): string {
    let accountInfo = super.toString();
    accountInfo += `Loan limit: ${this._loanLimit}\n`;
    accountInfo += `Loan: ${this._loan}\n`;

    return accountInfo;
  }
}