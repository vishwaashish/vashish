import { clsx, ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...input: ClassValue[]) => {
  return twMerge(clsx(input));
};


export const getRandom = (charSet: string) => {
  const randomIndex = Math.floor(Math.random() * charSet.length)
  return { index: randomIndex, char: charSet[randomIndex] }
}