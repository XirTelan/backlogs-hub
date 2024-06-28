"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { SubmitHandler } from "react-hook-form";
import BacklogForm from "./BacklogForm";
import { BacklogDTO } from "@/zodTypes";
import useSWR from "swr";
import { fetcher } from "@/utils";
import Title from "@/components/Common/Title";

const BacklogEditForm = ({ id }: { id: string }) => {
  const backlogData = useSWR(`/api/backlogs/${id}`, fetcher);
  const userFolders = useSWR(`/api/users/`, fetcher);
  const router = useRouter();

  const onSubmit: SubmitHandler<BacklogDTO> = async (data) => {
    if (data._id) {
      data._id;
    }
    const res = await fetch(`/api/backlogs/${data._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (res.ok) router.push("/");
  };

  if (backlogData.isLoading || userFolders.isLoading) return <div>Loading</div>;
  return (
    <>
      <Title title={`Editing backlog "${backlogData.data.backlogTitle}"`} />
      <BacklogForm
        defaultValues={backlogData.data}
        userFolders={userFolders.data}
        onSubmit={onSubmit}
      />
    </>
  );
};

export default BacklogEditForm;
