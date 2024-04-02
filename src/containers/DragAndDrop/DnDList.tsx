"use client";
import React, { useState } from "react";
import { Reorder } from "framer-motion";
import BacklogDndCard from "../Backlogs/BacklogDndCard";
import ActionButton from "@/components/ActionButton";
import { RiSave3Fill } from "react-icons/ri";

import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { BacklogDTO } from "@/zodTypes";

const DnDList = ({ data }: { data: BacklogDTO[] }) => {
  const [isDirty, setIsDirty] = useState(false);

  const [backlogs, setBacklogs] = useState<BacklogDTO[]>(data);
  const router = useRouter();

  const onDelete = async (id: string) => {
    const res = await fetch(`/api/backlogs/${id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      toast.success("Deleted");
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
      setIsDirty(false);
    }
  };
  return (
    <>
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
