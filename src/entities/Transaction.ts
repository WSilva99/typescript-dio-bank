export type TransactionType = 'deposit' | 'withdrawal' | 'transfer' | 'payment' | 'earnings' | 'borrow' | 'loan';

export class Transaction {
  private _amount: number;
  private _date: Date;
  private _type: TransactionType;

  constructor(amount: number, date: Date, type: TransactionType) {
    this._amount = amount;
    this._date = date;
    this._type = type;
  }

  get amount(): number {
    return this._amount;
  }

  get date(): Date {
    return this._date;
  }

  get type(): TransactionType {
    return this._type;
  }

  toString(): string {
    const prefix = {
      deposit: '+',
      withdrawal: '-',
      transfer: '-',
      payment: '-',
      earnings: '+',
      borrow: '+',
      loan: '-',
    }
    return `${this._type} of ${prefix[this._type]}${this._amount} on ${this._date}`;
  }
}
