import { ColorRGB } from "../types/types";

export const colors = {
  rgbStringToArray(value: string) {
    return value
      .slice(4, value.length - 1)
      .split(",")
      .map(Number);
  },
  rgbToHex(value: ColorRGB) {
    const arr: string[] = [];
    Object.values(value).forEach((value, i) => {
      arr[i] = value.toString(16).padStart(2, "0");
    });
    return `#${arr.join("")}`;
  },
  /**
   *
   * @param param0 0 ≤ H < 360, 0 ≤ S ≤ 1 and 0 ≤ V ≤ 1
   * @returns [r,g,b]
   */
  hsvToRgb({ h, s, v }: { h: number; s: number; v: number }) {
    const C = v * s;
    const X = C * (1 - Math.abs(((h / 60) % 2) - 1));
    const m = v - C;
    let rgb_a = [0, 0, 0];
    switch (true) {
      case h >= 0 && h < 60:
        rgb_a = [C, X, 0];
        break;
      case h >= 60 && h < 120:
        rgb_a = [X, C, 0];
        break;
      case h >= 120 && h < 180:
        rgb_a = [0, C, X];
        break;
      case h >= 180 && h < 240:
        rgb_a = [0, X, C];
        break;
      case h >= 240 && h < 300:
        rgb_a = [X, 0, C];
        break;
      case h >= 300 && h < 360:
        rgb_a = [C, 0, X];
        break;
    }
    return rgb_a.map((val) => (val + m) * 255);
  },
  hexToRgb(hex: string): ColorRGB {
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
    return { r, g, b };
  },
  rgbToHsv({ r, g, b }: ColorRGB) {
    const ra = r / 255;
    const ga = g / 255;
    const ba = b / 255;
    const cmax = Math.max(ra, ga, ba);
    const delta = cmax - Math.min(ra, ga, ba);
    let hue = 0;
    switch (true) {
      case cmax === ra:
        hue = (ga - ba) / delta;
        break;
      case cmax === ga:
        hue = (ba - ra) / delta + 2;
        break;
      case cmax === ba:
        hue = (ra - ga) / delta + 4;
        break;
    }
    if (isNaN(hue)) hue = 0;
    const sat = cmax == 0 ? 0 : delta / cmax;
    const v = cmax;
    return {
      hue: (hue * 60 + 360) % 360,
      sat: sat * 100,
      v: v * 100,
    };
  },
  rgbToHsl({ r, g, b }: ColorRGB) {
    const ra = r / 255;
    const ga = g / 255;
    const ba = b / 255;
    const min = Math.min(ra, ga, ba);
    const max = Math.max(ra, ga, ba);
    const delta = max - min;

    let h = 0;
    let s = 0;
    let l = (max + min) / 2;

    if (delta !== 0) {
      if (max === ra) {
        h = (ga - ba) / delta;
      } else if (max === ga) {
        h = (ba - ra) / delta + 2;
      } else {
        h = (ra - ga) / delta + 4;
      }
      s = delta / (1 - Math.abs(2 * l - 1));
    }

    h *= 60;
    if (h < 0) h += 360;

    s *= 100;
    l *= 100;

    return {
      h,
      s: Math.round(s),
      l: Math.round(l),
    };
  },
};
