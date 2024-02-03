import { NextResponse } from "next/server";

export const sendErrorMsg = (error: unknown, status = 400) => {
  let message = "Unknonw error";
  if (error instanceof Error) {
    message = error.message;
  }
  return NextResponse.json({ message: message }, { status: status });
};
