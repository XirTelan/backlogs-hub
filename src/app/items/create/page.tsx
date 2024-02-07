import ItemsForm from "@/containers/Items/ItemsForm";
import { PageDefaultProps } from "@/types";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";

const CreateItem = async ({
  searchParams: { backlogTitle },
}: PageDefaultProps) => {
  const user = await currentUser();
  if (!user || !user.username || !backlogTitle) redirect("/");
  if (Array.isArray(backlogTitle)) return null;

  return (
    <div>
      <ItemsForm />
    </div>
  );
};

export default CreateItem;
