import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const formattedDate = (date: Date) => date.toLocaleString("en-US", { month: "long", year: "numeric" });
export function formatPrice(
  price: number | string,
  options: { currency?: "USD" | "EUR" | "GBT" | "BDT"; notation?: Intl.NumberFormatOptions["notation"] } = {}
) {
  const { currency = "USD", notation = "compact" } = options;
  const numericPrice = typeof price === "string" ? parseFloat(price) : price;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
    notation,
    maximumFractionDigits: 2,
  }).format(numericPrice);
}
