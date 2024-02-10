"use client";
import { BacklogDTO } from "@/types";
import React, { useEffect, useState } from "react";
import { Reorder } from "framer-motion";
import BacklogDndCard from "./Backlogs/BacklogDndCard";
import ActionButton from "@/components/ActionButton";
import { IoAdd } from "react-icons/io5";

import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const DnDList = ({ userName }: { userName: string }) => {
  const [backlogs, setBacklogs] = useState<BacklogDTO[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (!userName) return;
    loadData(userName, setBacklogs);
  }, [userName]);

  const onDelete = async (id: string) => {
    const res = await fetch(`/api/backlogs/${id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      toast.success("Deleted");
      loadData(userName, setBacklogs);
    }
  };

  return (
    <>
      <div className="rounded border border-neutral-800 bg-neutral-900 px-2 pb-2 ">
        <div className="my-2 flex items-center border-b border-neutral-800 py-2  ">
          <h2 className=" text-2xl font-bold">Manage Backlogs</h2>
          <div className="ms-auto">
            <ActionButton
              title={"Create backlog"}
              onClick={() => router.push("/backlog/create")}
            >
              <IoAdd />
            </ActionButton>
          </div>
        </div>
        <div>
          <Reorder.Group
            className="flex flex-col gap-2"
            axis="y"
            values={backlogs}
            onReorder={setBacklogs}
          >
            {backlogs.map((backlog) => (
              <BacklogDndCard
                editAction={() => router.push(`/backlog/edit/${backlog._id}`)}
                deleteAction={onDelete}
                key={backlog._id}
                item={backlog}
              />
            ))}
          </Reorder.Group>
        </div>
      </div>
    </>
  );
};

export default DnDList;

const loadData = async (
  userName: string,
  setBacklogs: (data: BacklogDTO[]) => void,
) => {
  const res = await fetch(`/api/backlogs?userName=${userName}`, {
    next: { tags: ["backlogs"] },
  });
  const data = await res.json();
  setBacklogs(data);
};
