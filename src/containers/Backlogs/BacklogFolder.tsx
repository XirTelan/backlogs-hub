import BacklogCard from "@/components/Backlog/BacklogCard";
import { BacklogDTO } from "@/zodTypes";
import React from "react";
import Title from "@/components/Common/Title";

const BacklogFolder = ({
  folderName,
  userName,
  backlogs,
}: {
  folderName: string;
  userName: string;
  backlogs: BacklogDTO[];
}) => {
  return (
    <section>
      <Title title={folderName} variant={2} />
      <div className=" flex gap-2">
        {backlogs.map((backlog) => (
          <BacklogCard
            href={`/user/${userName}/backlogs/${backlog.slug}`}
            key={backlog._id}
          >
            {backlog.backlogTitle}
          </BacklogCard>
        ))}
      </div>
    </section>
  );
};

export default BacklogFolder;
