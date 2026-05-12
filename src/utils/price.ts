/** Parses the first numeric amount from strings like "$62.00 USD" or "$58.00". */
export function parsePriceUsd(label: string): number {
  const normalized = label.replace(/,/g, "");
  const match = normalized.match(/(\d+(?:\.\d+)?)/);
  if (!match) return 0;
  const n = Number.parseFloat(match[1]);
  return Number.isFinite(n) ? n : 0;
}

export function formatUsd(amount: number): string {
  const rounded = Math.round(amount * 100) / 100;
  return `$${rounded.toFixed(2)} USD`;
}
