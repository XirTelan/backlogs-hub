"use client";
import { BacklogFormData } from "@/types";
import { useRouter } from "next/navigation";
import { SubmitHandler } from "react-hook-form";
import BacklogForm from "./BacklogForm";
import { generateSlug } from "@/utils";
import { useUser } from "@clerk/nextjs";

const BacklogCreateForm = () => {
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
    slug: "",
    categories: defaultCategories,
    fields: [],
  };

  const onSubmit: SubmitHandler<BacklogFormData> = async (data) => {
    console.log(data);
    data.slug = generateSlug(data.backlogTitle);
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
      <h1>Creating backlog </h1>
      <BacklogForm defaultValues={defaultValues} onSubmit={onSubmit} />
    </div>
  );
};

export default BacklogCreateForm;
