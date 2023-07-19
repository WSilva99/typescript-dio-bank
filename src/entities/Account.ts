import { Transaction } from "./Transaction";

type AccountType = "checking" | "payment" | "savings" | "business";

type AccountProps = {
  name: string;
  accountNumber: string;
  accountType: AccountType;
};

export abstract class Account {
  private _balance: number = 0;
  private _name: string;
  private readonly _accountNumber: string;
  private readonly _accountType: string;
  private _transactions: Transaction[] = [];

  constructor({
    name,
    accountNumber,
    accountType,
  } : AccountProps) {
    this._name = name;
    this._accountNumber = accountNumber;
    this._accountType = accountType;
  }

  get balance(): number {
    return this._balance;
  }

  get name(): string {
    return this._name;
  }

  get accountNumber(): string {
    return this._accountNumber;
  }

  get accountType(): string {
    return this._accountType;
  }

  get transactions(): Transaction[] {
    return this._transactions;
  }

  protected addTransaction(transaction: Transaction): void {
    this._transactions.push(transaction);
  }

  protected setBalance(amount: number): void {
    this._balance = amount;
  }

  withdraw(amount: number): void {
    if (amount > this._balance) {
      throw new Error("Insufficient funds");
    }

    this.setBalance(this._balance - amount);
    this.addTransaction(new Transaction(amount, new Date(), "withdrawal"));
  }
  
  deposit(amount: number): void {
    this.setBalance(this._balance + amount);
    this.addTransaction(new Transaction(amount, new Date(), "deposit"));
  }

  transfer(amount: number, toAccount: Account): void {
    if (amount > this._balance) {
      throw new Error("Insufficient funds");
    }

    this.setBalance(this._balance - amount);
    toAccount.deposit(amount);
    this.addTransaction(new Transaction(amount, new Date(), "transfer"));
  }

  payment(amount: number): void {
    if (amount > this._balance) {
      throw new Error("Insufficient funds");
    }

    this.setBalance(this._balance - amount);
    this.addTransaction(new Transaction(amount, new Date(), "payment"));
  }

  bankStatement(): string {
    let statement = this.toString() + "\n";
    statement += "Transactions:\n";
    this._transactions.forEach((transaction) => {
      statement += `${transaction.toString()}\n`;
    });
    return statement;
  };
  
  toString(): string {
    let accountInfo = `Account holder: ${this._name}\n`;
    accountInfo += `Account number: ${this._accountNumber}\n`;
    accountInfo += `Account type: ${this._accountType}\n`;
    accountInfo += `Balance: ${this._balance}\n`;

    return accountInfo;
  }
}
