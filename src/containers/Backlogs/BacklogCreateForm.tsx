"use client";
import { BacklogCategory, BacklogFormData } from "@/types";
import { useRouter } from "next/navigation";
import { SubmitHandler } from "react-hook-form";
import BacklogForm from "./BacklogForm";
import { generateSlug } from "@/utils";
import Title from "@/components/Common/Title";
import { useState } from "react";
import BacklogTemplate from "./BacklogTemplate";
import ButtonBase from "@/components/Common/UI/ButtonBase";

const BacklogCreateForm = () => {
  const [useTemplate, setUseTemplate] = useState(false);
  const user = { id: "1", username: "user" }; //stub
  const router = useRouter();
  if (!user) return <div>Loading</div>;

  const defaultCategories: BacklogCategory[] = [
    { name: "Completed", color: "#00ff00", protected: false },
    { name: "Playing", color: "#00ff00", protected: false },
    { name: "Backlog", color: "#00ff00", protected: false },
    { name: "Retired", color: "#00ff00", protected: false },
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
          <BacklogTemplate
            onSubmit={onSubmit}
            user={{
              usename: user.username || "",
              id: user.id,
            }}
          />
        </>
      ) : (
        <BacklogForm defaultValues={defaultValues} onSubmit={onSubmit} />
      )}
    </>
  );
};

export default BacklogCreateForm;
