"use client";
import { BacklogItemDTO } from "@/types";
import Link from "next/link";
import React from "react";
import toast from "react-hot-toast";

const BacklogItemTr = ({ item, color }: BacklogItemTrProps) => {
  const onDelete = async (id: string, backlogId: string) => {
    const res = await fetch(`/api/backlogs/${backlogId}/items/${id}`, {
      method: "DELETE",
    });
    await res.json();
    toast.success(`Deleted`);
  };

  return (
    <tr key={item._id}>
      <td className="p-4" style={{ color: color }}>
        {item.title}
      </td>
      <td className="p-2">
        <Link href={`/items/edit/${item._id}`}>Edit</Link>
        <button onClick={() => onDelete(item._id, item.backlogId)}>
          Delete
        </button>
      </td>
    </tr>
  );
};

export default BacklogItemTr;

type BacklogItemTrProps = {
  item: BacklogItemDTO;
  color: string;
};
