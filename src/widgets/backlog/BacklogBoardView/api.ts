import { FormattedData } from "./model/types";

export async function putBoard(dataFormatted: FormattedData) {
  try {
    const res = await fetch(`/api/items/board`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataFormatted),
    });
    if (res.ok) {
      return { success: true };
    } else {
      return { success: false, data: ((await res.json()) as string) ?? "" };
    }
  } catch (error) {
    console.error(error);
    return { success: false, data: "error. Check logs" };
  }
}
