"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { SubmitHandler } from "react-hook-form";
import BacklogForm from "./BacklogForm";
import { BacklogDTO } from "@/zodTypes";
import useSWR from "swr";
import { fetcher } from "@/utils";
import TopTitle from "@/components/Common/UI/TopTitle";
import Loading from "@/components/Common/UI/Loading/Loading";

const BacklogEditForm = ({ id }: { id: string }) => {
  const {
    isLoading: backlogIsLoading,
    data: backlogData,
    mutate,
  } = useSWR(`/api/backlogs/${id}`, fetcher);
  const { isLoading: foldersIsLoading, data: userFolders } = useSWR(
    `/api/users/`,
    fetcher,
  );
  const router = useRouter();

  if (backlogIsLoading || foldersIsLoading) return <Loading />;

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
    if (res.ok) {
      mutate();
      router.push(
        `/user/${userFolders.data.username}/backlogs/${backlogData.slug}`,
      );
    }
  };

  return (
    <>
      <TopTitle title={`Editing backlog "${backlogData.backlogTitle}"`} />
      <main className="container self-center px-4">
        <BacklogForm
          defaultValues={backlogData}
          userFolders={userFolders.data.folders}
          onSubmit={onSubmit}
        />
      </main>
    </>
  );
};

export default BacklogEditForm;
