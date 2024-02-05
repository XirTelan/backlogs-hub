"use client";
import { BacklogItemDTO } from "@/types";
import React, { useEffect, useState } from "react";

export default function Backloglist({
  items,
  categoriesMap,
  onDelete,
}: BackloglistProps) {
  const [itemsList, setItemList] = useState<BacklogItemDTO[]>(items); //todo

  useEffect(() => {
    setItemList(items);
  }, [items]);

  return (
    <>
      <table className="w-full">
        <thead>
          <tr className=" my-1 border-b border-neutral-800 p-1">
            <th className="w-full p-1 text-left" scope="col">
              Title
            </th>
            <th className=" w-10" scope="col">
              Actions
            </th>
          </tr>
        </thead>
        {itemsList.map((item) => (
          <tbody className="" key={item._id}>
            <tr>
              <td
                className="p-2"
                style={{ color: categoriesMap.get(item.category) }}
              >
                {item.title}
              </td>
              <td className="p-2">
                <button onClick={() => onDelete(item._id, item.backlogId)}>
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        ))}
        <tfoot>
          <tr>
            <td className=" text-sm text-neutral-600" colSpan={3}>
              {" "}
              Count: {itemsList.length}
            </td>
          </tr>
        </tfoot>
      </table>
    </>
  );
}

interface BackloglistProps {
  items: BacklogItemDTO[];
  onDelete: (id: string, backlogId: string) => void;
  categoriesMap: Map<string, string>;
}
