import { Account } from "./Account";

type PaymentAccountProps = {
  name: string;
  accountNumber: string;
};

export class PaymentAccount extends Account {
  constructor({
    name,
    accountNumber,
  }: PaymentAccountProps) {
    super({
      name,
      accountNumber,
      accountType: "payment",
    });
  }

  // Payment account not allowed to withdraw
  withdraw(_amount: number): void {
    throw new Error("Payment account not allowed to withdraw");
  }
  
  // Payment account not allowed to transfer
  transfer(_amount: number, _toAccount: Account): void {
    throw new Error("Payment account not allowed to transfer");
  }

  toString(): string {
    return `${this.name} has a balance of ${this.balance}`;
  }
}