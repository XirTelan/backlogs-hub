import {
  addBacklogItem,
  getBacklogItemsByBacklogId,
  getBacklogItemsByQuery,
} from "@/services/backlogItem";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params: { id } }: { params: { id: string } },
) {
  const categories = request.nextUrl.searchParams.get("categories")?.split("-");
  const search = request.nextUrl.searchParams.get("search");
  let backlogData;
  try {
    if (search || categories) {
      backlogData = await getBacklogItemsByQuery({
        backlogId: id,
        categories: categories,
        search: search,
      });
    } else {
      backlogData = await getBacklogItemsByBacklogId({
        backlogId: id,
      });
    }
    if (backlogData) {
      return NextResponse.json(backlogData);
    } else {
      return NextResponse.json(
        {
          data: null,
          error: {
            message: "The requested objects were not found.",
            details: "Please check your parameters and ensure they are correct",
          },
        },
        { status: 404 },
      );
    }
  } catch (error) {
    throw new Error("error");
  }
}

export async function POST(
  request: NextRequest,
  { params: { id } }: { params: { id: string } },
) {
  const data = await request.json();
  data.backlogId = id;
  try {
    const res = await addBacklogItem(data);
    return NextResponse.json({ message: "created", res }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
