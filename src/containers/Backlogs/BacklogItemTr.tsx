"use client";
import ButtonBase from "@/components/Common/UI/ButtonBase";
import { BacklogItemDTO } from "@/types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";
import { MdEdit, MdDeleteForever } from "react-icons/md";

const BacklogItemTr = ({ item, color }: BacklogItemTrProps) => {
  const router = useRouter();
  const onDelete = async (id: string, backlogId: string) => {
    const res = await fetch(`/api/backlogs/${backlogId}/items/${id}`, {
      method: "DELETE",
    });
    await res.json();
    toast.success(`Deleted`);
    router.refresh();
  };
  return (
    <tr>
      <td className="p-4" style={{ color: color }}>
        {item.title}
      </td>
      <td className="ms-auto flex p-2 ">
        <Link href={`/items/edit/${item._id}`}>
          <ButtonBase
            size="small"
            variant="ghost"
            icon={<MdEdit size={20} />}
          />
        </Link>
        <ButtonBase
          title="Delete"
          size="small"
          variant="dangerGhost"
          icon={<MdDeleteForever size={20} />}
          onClick={() => onDelete(item._id, item.backlogId)}
        />
      </td>
    </tr>
  );
};

export default BacklogItemTr;

type BacklogItemTrProps = {
  item: BacklogItemDTO;
  color: string;
};
