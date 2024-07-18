"use client";
import { useRouter } from "next/navigation";
import { SubmitHandler } from "react-hook-form";
import BacklogForm from "./BacklogForm";
import { fetcher, generateSlug } from "@/utils";
import { BacklogCategory, BacklogFormData } from "@/zodTypes";
import { toastCustom } from "@/lib/toast";
import useSWR from "swr";

const BacklogCreateForm = () => {
  const router = useRouter();
  const userFolders = useSWR(`/api/users/`, fetcher);
  if (userFolders.isLoading) return <div>Loading</div>;
  if (!userFolders.data.isSuccess) return <div>Error</div>;
  const defaultCategories: BacklogCategory[] = [
    { name: "Completed", color: "#0043CE", protected: false },
    { name: "Playing", color: "#6929C4", protected: false },
    { name: "Backlog", color: "#4D5358", protected: false },
    { name: "Retired", color: "#A2191F", protected: false },
  ];
  const defaultValues: BacklogFormData = {
    order: 99,
    backlogTitle: "",
    description: "",
    folder: userFolders.data.data.folders[0],
    slug: "",
    visibility: "public",
    categories: defaultCategories,
    fields: [],
  };
  const onSubmit: SubmitHandler<BacklogFormData> = async (data) => {
    data.slug = generateSlug(data.backlogTitle);
    try {
      const res = await fetch("/api/backlogs/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        toastCustom.success(`Backlog ${data.backlogTitle} created`);
        router.push("/");
      } else {
        toastCustom.error(await res.json().then((data) => data.message));
      }
    } catch (error) {
      console.error("error", error);
    }
  };

  return (
    <>
      <BacklogForm
        defaultValues={defaultValues}
        onSubmit={onSubmit}
        userFolders={userFolders.data.data.folders}
      />
    </>
  );
};

export default BacklogCreateForm;
