import config from "@/config";

export default function currencyFormat(value: string | number): string {
  const parsed = Number(value) / 10 ** config.currency.minorUnitExponent;
  const formatted = parsed.toLocaleString("en-US", {
    style: "decimal",
    maximumFractionDigits: config.currency.minorUnitExponent,
    minimumFractionDigits: config.currency.minorUnitExponent,
  });
  return `${config.currency.symbol} ${formatted}`;
}
