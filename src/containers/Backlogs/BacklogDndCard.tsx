"use client";
import * as React from "react";
import { MdDragIndicator, MdEdit } from "react-icons/md";
import { MdRemove } from "react-icons/md";

import ActionButton from "@/components/ActionButton";
import { BacklogDTO } from "@/zodTypes";
import ButtonBase from "@/components/Common/UI/ButtonBase";
import { MdOutlineDriveFileMove } from "react-icons/md";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface Props {
  editAction: () => void;
  // deleteAction: (id: string) => void;
  item: BacklogDTO;
}

const BacklogDndCard = ({ editAction, item }: Props) => {
  const router = useRouter();
  async function onDelete(id: string) {
    const res = await fetch(`/api/backlogs/${id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      toast.success("Deleted");
    }
  }

  return (
    <div className=" flex w-full items-center  border border-neutral-700 bg-neutral-800  p-2">
      {/* <MdDragIndicator
        className=" me-2 text-neutral-600 hover:cursor-grab "
        size={24}
      /> */}
      <span>{item.backlogTitle}</span>
      <div className=" ms-auto flex gap-2 ">
        <ButtonBase
          onClick={() => router.push(`/backlog/edit/${item._id}`)}
          size="small"
          variant="ghost"
        >
          <MdEdit />
        </ButtonBase>
        <ButtonBase
          onClick={() => router.push(`/backlog/edit/${item._id}`)}
          size="small"
          variant="dangerGhost"
        >
          <MdOutlineDriveFileMove />
        </ButtonBase>

        <ActionButton
          title="Delete"
          variant="danger"
          onClick={() => onDelete(item._id)}
        >
          <MdRemove size={20} />
        </ActionButton>
      </div>
    </div>
  );
};

export default BacklogDndCard;
