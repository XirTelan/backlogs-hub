import { NextResponse } from "next/server";

export const sendMsg = {
  success: (message: string = "success", status: number = 200) => {
    return NextResponse.json({ message }, { status });
  },
  error: (error: unknown, status: number = 400, data: unknown = {}) => {
    let message = "Unknown error";
    if (error instanceof Error) {
      message = error.message;
    } else if (typeof error === "string") {
      message = error;
    }
    return NextResponse.json({ message, error: data }, { status });
  },
};

export const clamp = (value: number, min: number, max: number) => {
  return Math.min(Math.max(min, value), max);
};

export const parseToSeconds = (h: number, m: number, s: number) => {
  return h * 60 * 60 + m * 60 + s;
};
export const parseSeconds = (seconds: number) => {
  const ss = seconds % 60;
  const min = (seconds / 60) | 0;
  const mm = min % 60;
  const hh = (min / 60) | 0;
  return { hh, mm, ss };
};
export const cleanParamString = (str: string) => {
  return str.replace(/["\\]/g, "");
};
const cyrillicToLatinMap: { [key: string]: string } = {
  а: "a",
  б: "b",
  в: "v",
  г: "g",
  д: "d",
  е: "e",
  ё: "e",
  ж: "zh",
  з: "z",
  и: "i",
  й: "y",
  к: "k",
  л: "l",
  м: "m",
  н: "n",
  о: "o",
  п: "p",
  р: "r",
  с: "s",
  т: "t",
  у: "u",
  ф: "f",
  х: "h",
  ц: "ts",
  ч: "ch",
  ш: "sh",
  щ: "sch",
  ъ: "",
  ы: "y",
  ь: "",
  э: "e",
  ю: "yu",
  я: "ya",
  " ": "-",
};
export const generateSlug = (name: string): string => {
  const slug = name
    .trim()
    .toLowerCase()
    .split("")
    .map((char) => cyrillicToLatinMap[char] || char)
    .join("")
    .replace(/[^\w-]/g, ""); // Remove special characters except hyphens

  return slug;
};

export const fetcher = (...args: Parameters<typeof fetch>) =>
  fetch(...args).then((res) => res.json());

export const math = {
  mapRange(
    value: number,
    low1: number,
    high1: number,
    low2: number,
    high2: number
  ) {
    return low2 + ((high2 - low2) * (value - low1)) / (high1 - low1);
  },
};
