export function formatCurrencyVND(
  amount: number,
  showCurrency: boolean = false
): string {
  const formattedAmount = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    currencyDisplay: showCurrency ? "symbol" : "code",
    minimumFractionDigits: 0,
  }).format(amount);

  const customFormattedAmount = formattedAmount.replace(/\./g, ",");

  return showCurrency
    ? customFormattedAmount
    : customFormattedAmount.replace("₫", "").trim();
}
