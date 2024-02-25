"use client";
import TemplateLegend from "@/components/Template/TemplateLegend";
import { TemplateDTO } from "@/types";
import React, { useEffect, useState } from "react";
import TemplateWrapper from "../TemplateWrapper";
import { BacklogFormData } from "@/zodTypes";

const BacklogTemplate = ({ onSubmit }: BacklogTemplateProps) => {
  const [templates, setTemplates] = useState<TemplateDTO[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadTemplates = async () => {
      const res = await fetch("/api/templates/");
      const data = await res.json();
      setTemplates(data);
      setIsLoading(false);
    };
    loadTemplates();
  }, []);

  const useTemplate = async (data: TemplateDTO) => {
    const backlog: BacklogFormData = {
      categories: data.categories,
      backlogTitle: data.templateTitle,
      fields: data.fields,
      order: 99,
      slug: "",
      visibility: "public",
    };
    try {
      onSubmit(backlog);
    } catch (error) {
      console.error("errror", error);
    }
  };

  return (
    <div className="my-auto flex h-full grow flex-col">
      <div className="relative flex max-h-screen min-h-[60vh] grow  items-center justify-center gap-4 overflow-hidden p-4">
        {isLoading ? (
          <div>Loading</div>
        ) : (
          templates.map((template) => (
            <TemplateWrapper
              onSubmit={useTemplate}
              template={template}
              key={template._id}
            />
          ))
        )}
        {templates.length == 0 && <div>Not found</div>}
        <TemplateLegend />
      </div>
    </div>
  );
};

export default BacklogTemplate;
type BacklogTemplateProps = {
  onSubmit: (data: BacklogFormData) => void;
};
