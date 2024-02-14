"use client";
import { BacklogCategory, BacklogFormData } from "@/types";
import { useRouter } from "next/navigation";
import { SubmitHandler } from "react-hook-form";
import BacklogForm from "./BacklogForm";
import { generateSlug } from "@/utils";
import { useUser } from "@clerk/nextjs";
import Title from "@/components/Common/Title";
import { useState } from "react";
import BacklogTemplate from "./BacklogTemplate";

const BacklogCreateForm = () => {
  const [useTemplate, setUseTemplate] = useState(false);
  const { user } = useUser();
  const router = useRouter();
  if (!user) return <div>Loading</div>;

  const defaultCategories: BacklogCategory[] = [
    { name: "Completed", color: "#00ff00", protected: false },
    { name: "Playing", color: "#00ff00", protected: false },
    { name: "Backlog", color: "#00ff00", protected: false },
    { name: "Retired", color: "#00ff00", protected: false },
  ];
  const defaultValues: BacklogFormData = {
    userId: user?.id,
    userName: user?.username || "",
    order: 99,
    backlogTitle: "",
    slug: "",
    visibility: "public",
    categories: defaultCategories,
    fields: [],
  };

  const onSubmit: SubmitHandler<BacklogFormData> = async (data) => {
    data.slug = generateSlug(data.backlogTitle);
    if (user) {
      data.userName = user.username!;
      data.userId = user?.id;
    }
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
  
          <button onClick={() => setUseTemplate((prev) => !prev)}>
            {useTemplate ? "Create my own" : "Use template"}
          </button>
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
