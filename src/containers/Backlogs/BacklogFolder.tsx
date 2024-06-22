import BacklogCard from "@/components/Backlog/BacklogCard";
import { BacklogDTO } from "@/zodTypes";
import React from "react";
import Title from "@/components/Common/Title";
import { FaFolder } from "react-icons/fa6";
import Accordion from "@/components/Common/UI/Accordion";
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
      <Accordion
        defaultState={true}
        title={
          <div className="ms-4 flex items-center">
            <FaFolder className="me-2" />
            <Title title={folderName} variant={3} />
          </div>
        }
      >
        {backlogs.map((backlog) => (
          <BacklogCard
            href={`/user/${userName}/backlogs/${backlog.slug}`}
            key={backlog._id}
          >
            {backlog.backlogTitle}
          </BacklogCard>
        ))}
      </Accordion>
    </section>
  );
};

export default BacklogFolder;
