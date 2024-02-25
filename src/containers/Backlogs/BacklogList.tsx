"use client";
import { BacklogItemDTO } from "@/types";
import { fetcher } from "@/utils";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useSWR from "swr";

export default function Backloglist({ id, categoriesMap }: BackloglistProps) {
  const [search, setSearch] = useState("");
  const { data, isLoading } = useSWR(
    `/api/backlogs/${id}/items${search}`,
    fetcher,
  );
  const searchParams = useSearchParams();

  useEffect(() => {
    let query = "?";
    searchParams.forEach((value, key) => {
      query += `${key}=${value}&`;
    });
    query = query.slice(0, -1);
    setSearch(query);
  }, [searchParams]);

  if (isLoading) return <div>Loadbg</div>;

  const onDelete = async (id: string, backlogId: string) => {
    const res = await fetch(`/api/backlogs/${backlogId}/items/${id}`, {
      method: "DELETE",
    });
    await res.json();
    toast.success(`Deleted`);
  };
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
        {data.map((item: BacklogItemDTO) => (
          <tbody className="" key={item._id}>
            <tr>
              <td
                className="p-2"
                style={{ color: categoriesMap.get(item.category) }}
              >
                {item.title}
              </td>
              <td className="p-2">
                <Link href={`/items/edit/${item._id}`}>Edit</Link>
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
              Count: {data.length}
            </td>
          </tr>
        </tfoot>
      </table>
    </>
  );
}

interface BackloglistProps {
  id: string;
  // onDelete: (id: string, backlogId: string) => void;
  categoriesMap: Map<string, string>;
}
