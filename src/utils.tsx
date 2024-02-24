import { NextResponse } from "next/server";
import toast, { Toast } from "react-hot-toast";
import { FaCheckCircle } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

export const sendErrorMsg = (error: unknown, status = 400) => {
  let message = "Unknown error";
  if (error instanceof Error) {
    message = error.message;
  } else if (typeof error === "string") {
    message = error;
  }
  return NextResponse.json({ message: message }, { status: status });
};
export const cleanParamString = (str: string) => {
  return str.replace(/["\\]/g, "");
};
export const generateSlug = (name: string): string => {
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

  const slug = name
    .toLowerCase()
    .split("")
    .map((char) => cyrillicToLatinMap[char] || char) // Use mapping object for replacements
    .join("")
    .replace(/[^\w-]/g, ""); // Remove special characters except hyphens

  return slug;
};

export const fetcher = (
  ...args: [string | URL | Request, RequestInit | undefined]
) => fetch(...args).then((res) => res.json());

export const toastCustom = (
  text: string,
  type: string,
  options?:
    | Partial<
        Pick<
          Toast,
          | "style"
          | "className"
          | "id"
          | "icon"
          | "duration"
          | "ariaProps"
          | "position"
          | "iconTheme"
        >
      >
    | undefined,
) => {
  return toast.custom(
    (t) => (
      <div className="flex h-12 items-center gap-4 border border-s-4 border-support-success/50 border-s-support-success bg-layer-1">
        <div className="ms-4 text-support-success">
          <FaCheckCircle />
        </div>
        <div>{text}</div>
        <button className="p-4" onClick={() => toast.dismiss(t.id)}>
          <IoMdClose />
        </button>
      </div>
    ),
    options,
  );
};
