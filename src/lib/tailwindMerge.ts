import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function tm(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
