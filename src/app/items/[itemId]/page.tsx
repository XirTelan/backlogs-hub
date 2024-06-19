import BacklogItem from "@/components/Backlog/BacklogItem";
import Title from "@/components/Common/Title";
import { getBacklogItemById } from "@/services/backlogItem";
import { isAuthorizedBacklogOwner } from "@/services/backlogs";
import { redirect } from "next/navigation";
import React from "react";

const Page = async ({ params: { itemId } }) => {
  return (
    <main className="container">
      <BacklogItem itemId={itemId} />
    </main>
  );
};

export default Page;
