"use client";
import { BacklogDTO } from "@/types";
import React, { useEffect, useState } from "react";
import { Reorder } from "framer-motion";
import BacklogDndCard from "../Backlogs/BacklogDndCard";
import ActionButton from "@/components/ActionButton";
import { IoAdd } from "react-icons/io5";
import { RiSave3Fill } from "react-icons/ri";

import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Title from "@/components/Common/Title";

const DnDList = ({ userName }: { userName: string }) => {
  const [backlogs, setBacklogs] = useState<BacklogDTO[]>([]);
  const [isDirty, setIsDirty] = useState(false);

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

  const onSave = async () => {
    backlogs.forEach((backlog, index) => {
      backlog.order = index;
    });
    const res = await fetch(`/api/backlogs/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(backlogs),
    });
    if (res.ok) {
      toast.success("Saved");
      loadData(userName, setBacklogs);
      setIsDirty(false);
    }
  };

  return (
    <>
      <div className="rounded border border-neutral-800 bg-neutral-900 px-2 pb-2 ">
        <Title title="Manage backlogs">
          <ActionButton
            title={"Create backlog"}
            onClick={() => router.push("/backlog/create")}
          >
            <IoAdd />
          </ActionButton>
        </Title>
        <div>
          <Reorder.Group
            className="flex flex-col gap-2"
            axis="y"
            values={backlogs}
            onReorder={(newOrder) => {
              if (!isDirty) setIsDirty(true);
              setBacklogs(newOrder);
            }}
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
      {isDirty && (
        <div className="mt-2 flex w-full justify-center">
          <ActionButton shrink={false} title="Save changes" onClick={onSave}>
            <RiSave3Fill />
          </ActionButton>
        </div>
      )}
    </>
  );
};

export default DnDList;

const loadData = async (
  userName: string,
  setBacklogs: (data: BacklogDTO[]) => void,
) => {
  const res = await fetch(`/api/backlogs?userName=${userName}&type=baseInfo`, {
    next: { tags: ["backlogs"] },
  });
  const data = await res.json();
  setBacklogs(data);
};
