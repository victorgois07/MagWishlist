import { ValueObject } from "./ValueObject";

export type Currency = "USD" | "EUR" | "BRL";

export interface MoneyProps {
  amount: number;
  currency: Currency;
}

export class Money extends ValueObject<MoneyProps> {
  private constructor(props: MoneyProps) {
    super(props);
  }

  public static create(amount: number, currency: Currency): Money {
    if (amount < 0) {
      throw new Error("Amount cannot be negative");
    }
    return new Money({ amount, currency });
  }

  public get amount(): number {
    return this.props.amount;
  }

  public get currency(): Currency {
    return this.props.currency;
  }

  public add(money: Money): Money {
    if (this.props.currency !== money.currency) {
      throw new Error("Cannot add money with different currencies");
    }
    return new Money({
      amount: this.props.amount + money.amount,
      currency: this.props.currency,
    });
  }

  public subtract(money: Money): Money {
    if (this.props.currency !== money.currency) {
      throw new Error("Cannot subtract money with different currencies");
    }
    if (this.props.amount < money.amount) {
      throw new Error("Result cannot be negative");
    }
    return new Money({
      amount: this.props.amount - money.amount,
      currency: this.props.currency,
    });
  }

  public multiply(multiplier: number): Money {
    if (multiplier < 0) {
      throw new Error("Multiplier cannot be negative");
    }
    return new Money({
      amount: this.props.amount * multiplier,
      currency: this.props.currency,
    });
  }
}
