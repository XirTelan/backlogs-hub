"use client";
import { useRouter } from "next/navigation";
import { SubmitHandler } from "react-hook-form";
import BacklogForm from "./BacklogForm";
import { generateSlug } from "@/utils";
import Title from "@/components/Common/Title";
import { useState } from "react";
import BacklogTemplate from "./BacklogTemplate";
import ButtonBase from "@/components/Common/UI/ButtonBase";
import useSession from "@/hooks/useSession";
import { BacklogCategory, BacklogFormData } from "@/zodTypes";

const BacklogCreateForm = () => {
  const router = useRouter();
  const [useTemplate, setUseTemplate] = useState(false);
  const { user, isLoading } = useSession();
  if (isLoading) return <div>Loading</div>;
  if (!user) {
    router.push("/");
  }
  const defaultCategories: BacklogCategory[] = [
    { name: "Completed", color: "#11380B", protected: false },
    { name: "Playing", color: "#11380B", protected: false },
    { name: "Backlog", color: "#11380B", protected: false },
    { name: "Retired", color: "#11380B", protected: false },
  ];
  const defaultValues: BacklogFormData = {
    order: 99,
    backlogTitle: "",
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
      if (res.ok) router.push("/");
    } catch (error) {
      console.error("error", error);
    }
  };

  return (
    <>
      <Title title="Creating backlog ">
        <>
          <ButtonBase
            onClick={() => setUseTemplate((prev) => !prev)}
            variant="tertiary"
            text={useTemplate ? "Create my own backlog" : "Select template"}
          />
        </>
      </Title>
      {useTemplate ? (
        <>
          <BacklogTemplate onSubmit={onSubmit} />
        </>
      ) : (
        <BacklogForm defaultValues={defaultValues} onSubmit={onSubmit} />
      )}
    </>
  );
};

export default BacklogCreateForm;
