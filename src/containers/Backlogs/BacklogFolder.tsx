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
        id={folderName}
        defaultState={true}
        title={
          <div className=" flex items-center">
            <FaFolder className="me-2" />
            <Title title={folderName} variant={2} />
          </div>
        }
      >
        <div className="flex w-full justify-center md:justify-normal">
          <div className="flex max-w-[80vw] gap-4  self-center   overflow-auto pb-6   md:flex-wrap ">
            {backlogs.map((backlog) => (
              <BacklogCard
                href={`/user/${userName}/backlogs/${backlog.slug}`}
                key={backlog._id}
              >
                <>
                  <div>
                    <Title variant={3} title={backlog.backlogTitle} />
                  </div>
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
          </div>
        </div>
      </Accordion>
    </section>
  );
};

export default BacklogFolder;
