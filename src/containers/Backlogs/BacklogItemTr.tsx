"use client";
import ButtonBase from "@/components/Common/UI/ButtonBase";
import { BacklogItemDTO } from "@/types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";
import { MdEdit, MdDeleteForever } from "react-icons/md";
import { FaFileLines } from "react-icons/fa6";

const BacklogItemTr = ({ item, color, showActions }: BacklogItemTrProps) => {
  const router = useRouter();
  const onDelete = async (id: string, backlogId: string) => {
    const res = await fetch(`/api/backlogs/${backlogId}/items/${id}`, {
      method: "DELETE",
    });

    if (res.status === 200) toast.success(`Deleted`);
    else {
      const { message } = await res.json();
      toast.error(message);
    }
    router.refresh();
  };
  return (
    <tr>
      <td className="p-4" style={{ color: color }}>
        {item.title}
      </td>
      <td className="ms-auto flex p-2 ">
        <ButtonBase
          title="Delete"
          size="small"
          variant="ghost"
          icon={<FaFileLines size={20} />}
          onClick={() => console.error("Not implemented")}
        />
        {showActions && (
          <>
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
          </>
        )}
      </td>
    </tr>
  );
};

export default BacklogItemTr;

type BacklogItemTrProps = {
  item: BacklogItemDTO;
  color: string;
  showActions: boolean;
};
