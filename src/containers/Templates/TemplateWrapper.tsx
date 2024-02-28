"use client";
import TemplateCard from "@/components/Template/TemplateCard";
import TemplateForm from "@/components/Template/TemplateForm";
import { TemplateDTO } from "@/types";
import { generateSlug } from "@/utils";
import { BacklogFormData } from "@/zodTypes";
import router from "next/router";
import React, { useState } from "react";
import { SubmitHandler } from "react-hook-form";

const TemplateWrapper = ({ template }: TemplateCardProps) => {
  const [isSubmit, setIsSubmit] = useState(false);

  const handleSubmit = (backlogTitle: string) => {
    template.templateTitle = backlogTitle;
    mapTemplateToBacklog(template);
  };

  const onSubmit: SubmitHandler<BacklogFormData> = async (data) => {
    data.slug = generateSlug(data.backlogTitle);
    try {
      const res = await fetch("/api/backlogs/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (res.ok) router.push("/");
    } catch (error) {
      console.error("error", error);
    }
  };

  const mapTemplateToBacklog = async (data: TemplateDTO) => {
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
    <>
      <div className="relative mb-auto   mt-4 flex w-80 shrink-0 flex-col  break-words   bg-layer-1 hover:shadow-around hover:shadow-cyan-500/50 ">
        {isSubmit ? (
          <TemplateForm
            handleSubmit={handleSubmit}
            defaultValue={template.templateTitle}
          />
        ) : (
          <TemplateCard
            toSubmit={() => setIsSubmit(true)}
            template={template}
          />
        )}
      </div>
    </>
  );
};

export default TemplateWrapper;

type TemplateCardProps = {
  template: TemplateDTO;
};
