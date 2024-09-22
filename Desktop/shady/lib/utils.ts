import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function splitStringUsingRegex(string: string): string[] {
  // Match any character, including Unicode characters like emojis, Arabic characters, etc.
  const regex = /[\s\S]/gu;
  const characters: string[] = [];
  let match;

  // Use the regex to find each character in the string
  while ((match = regex.exec(string))) {
    characters.push(match[0]);
  }

  return characters;
}
export function formatPrice(
  price: number | string,
  options: { currency?: "EGP"; notation?: Intl.NumberFormatOptions["notation"] } = {}
) {
  const { currency = "EGP", notation = "compact" } = options;
  const numericPrice = typeof price === "string" ? parseFloat(price) : price;
  return new Intl.NumberFormat("en-EG", {
    style: "currency",
    currency: currency,
    notation,
    maximumFractionDigits: 2,
  }).format(numericPrice);
}
