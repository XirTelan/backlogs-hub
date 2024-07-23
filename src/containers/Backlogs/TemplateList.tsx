"use client";
import useSWR from "swr";
import { fetcher } from "@/utils";
import TemplateCard from "@/components/Template/TemplateCard";
import Modal from "@/components/Common/Modal";
import TemplateForm from "@/components/Template/TemplateForm";
import { useState } from "react";
import { TemplateDTO } from "@/zodTypes";
import { toastCustom } from "@/lib/toast";
import { apiRoutesList } from "@/data";
import Loading from "@/components/Common/Loading";

const isEmpty = <div>Its empty</div>;

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
  if (isLoading) return <Loading />;
  if (data?.length === 0) return isEmpty;

  const onDelete = async (id: string) => {
    try {
      const res = await fetch(`${apiRoutesList.templates}/${id}`, {
        method: "DELETE",
      });
      if (res.ok) toastCustom.success("Deleted");
    } catch (error) {
      throw new Error(`Error: ${error}`);
    }
  };

  return (
    <div className="my-auto flex flex-col px-4">
      <div
        style={{ gridTemplateRows: "max-content" }}
        className=" wrap relative grid   min-h-[60vh] grid-cols-1 flex-col gap-4 overflow-hidden md:grid-cols-2   2xl:grid-cols-3 "
      >
        {data.map((template: TemplateDTO) => (
          <TemplateCard
            key={template._id}
            canDelete={template.author === userName}
            onClick={() => {
              setIsShow(true);
              setSelectedTemplate(template);
            }}
            onDelete={onDelete}
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
