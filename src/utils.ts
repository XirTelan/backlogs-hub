import { NextResponse } from "next/server";

export const sendMsg = {
  success: (message: string = "success", status: number = 200) => {
    return NextResponse.json({ message }, { status });
  },
  error: (
    error: unknown,
    status: number = 400,
    data: unknown | undefined = undefined,
  ) => {
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

export const colors = {
  rgbStringToArray(value: string) {
    return value
      .slice(4, value.length - 1)
      .split(",")
      .map(Number);
  },
  rgbToHex(value: string) {
    const newColor = value.slice(4, value.length - 1).split(",");
    newColor.forEach((val, i, arr) => {
      arr[i] = (+val).toString(16);
      arr[i] = arr[i].padStart(2, "0");
    });
    return `#${newColor.join("")}`;
  },
  hexToRgb(hex: string) {
    let newStr = hex.replace("#", "");
    switch (true) {
      case newStr.length === 0:
        newStr = "000000";
        break;
      case newStr.length === 3:
        newStr = `${newStr[0].repeat(2)}${newStr[1].repeat(2)}${newStr[2].repeat(2)}}`;
        break;
    }
    const r = parseInt(newStr.substring(0, 2), 16);
    const g = parseInt(newStr.substring(2, 4), 16);
    const b = parseInt(newStr.substring(4, 6), 16);
    return [r, g, b];
  },
  rgbToHsv(rgb: number[]) {
    const RGB = [];
    RGB[0] = rgb[0] / 255;
    RGB[1] = rgb[1] / 255;
    RGB[2] = rgb[2] / 255;
    const cmax = Math.max(...RGB);
    const delta = cmax - Math.min(...RGB);
    let hue = 0;
    switch (true) {
      case cmax === RGB[0]:
        hue = (RGB[1] - RGB[2]) / delta;
        break;
      case cmax === RGB[1]:
        hue = (RGB[2] - RGB[0]) / delta + 2;
        break;
      case cmax === RGB[2]:
        hue = (RGB[0] - RGB[1]) / delta + 4;
        break;
      default:
        if (delta == 0) hue = 0;
        break;
    }

    const sat = cmax == 0 ? 0 : delta / cmax;
    const v = cmax;
    return {
      hue: (hue * 360) % 360,
      sat: sat * 100,
      v: v * 100,
    };
  },
  rgbToHsl(rgb: number[]) {
    const r = rgb[0] / 255;
    const g = rgb[1] / 255;
    const b = rgb[2] / 255;

    const min = Math.min(r, g, b);
    const max = Math.max(r, g, b);
    const delta = max - min;

    let h = 0;
    let s = 0;
    let l = (max + min) / 2;

    if (delta !== 0) {
      if (max === r) {
        h = ((g - b) / delta) % 6;
      } else if (max === g) {
        h = (b - r) / delta + 2;
      } else {
        h = (r - g) / delta + 4;
      }

      s = delta / (1 - Math.abs(2 * l - 1));

      h = Math.round(h * 60);
      if (h < 0) h += 360;
      s *= 100;
      l *= 100;
    }

    return {
      h,
      s: Math.round(s),
      l: Math.round(l),
    };
  },
};

export const math = {
  mapRange(
    value: number,
    low1: number,
    high1: number,
    low2: number,
    high2: number,
  ) {
    return low2 + ((high2 - low2) * (value - low1)) / (high1 - low1);
  },
};
