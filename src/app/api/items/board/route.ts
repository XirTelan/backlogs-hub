import { getCurrentUserInfo } from "@/entities/auth/utils/utils";
import { Backlog } from "@/entities/backlog";
import { updateMany } from "@/shared/api/backlogItem";
import { sendMsg } from "@/shared/lib/utils";
import { BacklogItemDTO, BacklogCategory } from "@/shared/model";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest) {
  const {
    backlogId,
    categories,
    items,
  }: {
    backlogId: string;
    categories: string[];
    items: BacklogItemDTO[];
  } = await request.json();
  try {
    const user = await getCurrentUserInfo();

    if (!user) return sendMsg.error("", 401);

    const backlog = await Backlog.findById(backlogId).select({
      categories: 1,
      userId: 1,
    });
    if (!backlog) return sendMsg.error("Backlog was not found");
    if (backlog.userId != user.id)
      return sendMsg.error("You dont have rights", 403);

    const hash = backlog.categories.reduce((acc, cat) => {
      acc.set(cat.name, cat);
      return acc;
    }, new Map<string, BacklogCategory>());

    categories.forEach((cat, indx) => {
      const current = hash.get(cat);
      if (!current) {
        backlog.categories.push({
          order: indx,
          name: cat,
          color: "#ffffff",
          protected: false,
        });
      } else {
        current.order = indx;
      }
    });
    await backlog.save();

    const res = await updateMany(backlog._id, items);
    if (!res.success) return sendMsg.error("Something wrong");

    return NextResponse.json({ message: "Updated", res }, { status: 200 });
  } catch (error) {
    return sendMsg.error(error);
  }
}
