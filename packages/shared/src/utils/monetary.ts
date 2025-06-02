export type Currency = "USD" | "EUR" | "BRL";

export function formatMoney(amount: number, currency: Currency): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(amount);
}

export function convertCurrency(
  amount: number,
  fromCurrency: Currency,
  toCurrency: Currency,
  exchangeRates: Record<Currency, number>,
): number {
  const amountInUSD = amount / exchangeRates[fromCurrency];
  return amountInUSD * exchangeRates[toCurrency];
}

export function validateAmount(amount: number): boolean {
  return amount >= 0 && Number.isFinite(amount);
}

export function roundToTwoDecimals(amount: number): number {
  return Math.round(amount * 100) / 100;
}
