import { clsx, type ClassValue } from "clsx";
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
export const getPasswordStrength = (password: string) => {
  let score = 0;
  if (password.length >= 8) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/[0-9]/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;

  switch (score) {
    case 4:
      return { score, label: "Strong", color: "bg-green-500", text: "text-green-500" };
    case 3:
      return { score, label: "Good", color: "bg-yellow-500", text: "text-yellow-500" };
    case 2:
      return { score, label: "Fair", color: "bg-orange-500", text: "text-orange-500" };
    default:
      return { score, label: "Weak", color: "bg-red-500", text: "text-red-500" };
  }
};
export const catchError = async (fn: () => Promise<any>) => {
  try {
    return await fn();
  } catch (error) {
    console.error("An error occurred:", error);
    throw new Error("Something went wrong. Please try again.");
  }
};
