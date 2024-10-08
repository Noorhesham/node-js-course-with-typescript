import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function splitStringUsingRegex(string: string): string[] {
  const regex = /[\S]+|\s/gu; // Match words and spaces separately
  const characters: string[] = [];
  let match;

  while ((match = regex.exec(string))) {
    characters.push(match[0]);
  }

  return characters;
}
