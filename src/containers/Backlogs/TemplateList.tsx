"use client";
import useSWR from "swr";
import { fetcher } from "@/utils";
import TemplateCard from "@/components/Template/TemplateCard";
import Modal from "@/components/Common/Modal";
import TemplateForm from "@/components/Template/TemplateForm";
import { useState } from "react";
import { TemplateDTO } from "@/zodTypes";

const TemplateList = ({
  userName,
  search,
}: {
  userName: string;
  search: string;
}) => {
  const [isShow, setIsShow] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateDTO | null>(
    null,
  );
  const { data, isLoading } = useSWR(`/api/templates${search}`, fetcher);
  if (isLoading) return <div>Loading</div>;

  return (
    <div className="my-auto flex h-full grow flex-col">
      <div
        style={{ gridTemplateRows: "max-content" }}
        className=" wrap relative grid  max-h-screen min-h-[60vh] grid-cols-1 flex-col gap-4 overflow-hidden md:grid-cols-2   2xl:grid-cols-3 "
      >
        {data.map((template: TemplateDTO) => (
          <TemplateCard
            key={template._id}
            canDelete={template.author === userName}
            onClick={() => {
              setIsShow(true);
              setSelectedTemplate(template);
            }}
            template={template}
          />
        ))}
      </div>
      {isShow && (
        <Modal setClose={() => setIsShow(false)}>
          <TemplateForm
            selectedTemplate={selectedTemplate!}
            handleCancel={() => setIsShow(false)}
          />
        </Modal>
      )}
    </div>
  );
};

export default TemplateList;
