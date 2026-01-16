import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const generateSlug = (prefix: string, content: string) => {
  const slugBase = content
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

  const randomNumber = Math.floor(1000 + Math.random() * 9000);

  return `${prefix}_${slugBase}_${randomNumber}`;
};
export const nullToUndefined = <T extends Record<string, any>>(obj: T) => {
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [
      key,
      value === null ? undefined : value,
    ])
  ) as {
    [K in keyof T]: T[K] extends null ? undefined : T[K];
  };
};
