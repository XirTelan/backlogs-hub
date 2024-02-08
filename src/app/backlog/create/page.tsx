"use client";
import { useUser } from "@clerk/nextjs";

import { useRouter } from "next/navigation";
import React from "react";
import { SubmitHandler } from "react-hook-form";
import { BacklogFormData } from "@/types";
import BacklogForm from "@/containers/Backlogs/BacklogForm";

const CreateBacklog = () => {
  const { user } = useUser();
  const router = useRouter();
  if (!user) return <div>Loading</div>;

  const defaultCategories = [
    { name: "Completed", color: "#00ff00" },
    { name: "Playing", color: "#00ff00" },
    { name: "Backlog", color: "#00ff00" },
    { name: "Retired", color: "#00ff00" },
  ];
  const defaultValues: BacklogFormData = {
    userId: user?.id,
    userName: user?.username || "",
    backlogTitle: "",
    categories: defaultCategories,
    fields: [],
  };

  const onSubmit: SubmitHandler<BacklogFormData> = async (data) => {
    if (user) {
      data.userName = user.username!;
      data.userId = user?.id;
    }
    const res = await fetch("/api/backlogs/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (res.ok) router.push("/");
  };

  return (
    <div>
      <BacklogForm defaultValues={defaultValues} onSubmit={onSubmit} />
    </div>
  );
};
export default CreateBacklog;
