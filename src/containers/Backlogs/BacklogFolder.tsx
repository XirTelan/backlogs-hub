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
            <Title title={folderName} variant={2} />
          </div>
        }
      >
        {backlogs.map((backlog) => (
          <BacklogCard
            href={`/user/${userName}/backlogs/${backlog.slug}`}
            key={backlog._id}
          >
            <>
              <Title variant={3} title={backlog.backlogTitle} />
              <div className="text-sm font-light text-secondary-text	 ">
                {backlog.totalCount > 0 ? (
                  <div className="flex items-center justify-between">
                    <span>In the backlog:</span>
                    <span className=" text-primary-link">
                      {backlog.totalCount}
                    </span>
                  </div>
                ) : (
                  "Empty backlog"
                )}
              </div>
            </>
          </BacklogCard>
        ))}
      </Accordion>
    </section>
  );
};

export default BacklogFolder;
