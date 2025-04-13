import BacklogCard from "@/widgets/backlog/BacklogsList/ui/BacklogCard";
import React from "react";
import { Accordion, Title } from "@/shared/ui";
import { FaFolder } from "react-icons/fa6";
import { BacklogDTO } from "@/shared/types";

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
        <div className="flex w-full justify-center md:justify-normal bg-layer-1 p-4">
          <div className="flex max-w-[80vw] gap-4  self-center   overflow-auto  md:flex-wrap ">
            {backlogs.map((backlog) => (
              <BacklogCard
                href={`/user/${userName}/backlogs/${backlog.slug}`}
                backlogId={backlog._id}
                key={backlog._id}
              >
                <>
                  <div>
                    <Title variant={4} title={backlog.backlogTitle} />
                  </div>
                  <div>
                    {backlog.totalCount > 0 ? (
                      <div className=" items-center ">
                        <div className="text-text-primary text-xl  font-mono py-1">
                          {backlog.totalCount}
                        </div>
                        <div className=" text-text-secondary text-sm">
                          Items
                        </div>
                      </div>
                    ) : (
                      <div className=" text-text-secondary text-sm mt-4">
                        Empty backlog
                      </div>
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
