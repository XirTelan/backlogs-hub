"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { SubmitHandler } from "react-hook-form";
import useSWR from "swr";
import { fetcher } from "@/shared/lib/utils";

import NotFound from "@/pages_fsd/notFound/NotFound";
import { apiRoutesList } from "@/shared/constants/routesList";
import { LoadingAnimation, TopTitle } from "@/shared/ui";
import { BacklogDTO } from "@/shared/model";
import { BacklogForm } from "@/widgets/backlog/BacklogForm";

const BacklogEditForm = ({ id }: { id: string }) => {
  const {
    isLoading: backlogIsLoading,
    data: backlogData,
    mutate,
  } = useSWR<BacklogDTO>(`${apiRoutesList.backlogs}/${id}`, fetcher);
  const { isLoading: foldersIsLoading, data: userFolders } = useSWR(
    `/api/users/`,
    fetcher
  );
  const router = useRouter();

  if (backlogIsLoading || foldersIsLoading) return <LoadingAnimation />;

  const onSubmit: SubmitHandler<BacklogDTO> = async (data) => {
    const res = await fetch(`${apiRoutesList.backlogs}/${data._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      mutate();
      router.push(`/user/${userFolders.data.username}/backlogs/${data.slug}`);
    }
  };

  if (!backlogData?.backlogTitle) return <NotFound />;
  backlogData.categories.sort((a, b) => a.order - b.order);

  return (
    <>
      <TopTitle title={`Editing backlog "${backlogData.backlogTitle}"`} />
      <main id="maincontent" className="container self-center px-4">
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
