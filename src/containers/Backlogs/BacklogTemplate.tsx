"use client";
import useSWR from "swr";
import TemplateWrapper from "../Templates/TemplateWrapper";
import { fetcher } from "@/utils";
import { TemplateDTO } from "@/types";

const BacklogTemplate = ({ search }: { search: string }) => {
  const { data, isLoading } = useSWR(`/api/templates${search}`, fetcher);
  if (isLoading) return <div>Loading</div>;
  return (
    <div className="my-auto flex h-full grow flex-col">
      <div className="relative flex max-h-screen min-h-[60vh] grow  items-center gap-4 overflow-hidden p-4">
        {data.map((template: TemplateDTO) => (
          <TemplateWrapper template={template} key={template._id} />
        ))}
      </div>
    </div>
  );
};

export default BacklogTemplate;
