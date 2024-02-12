import TemplateCard from "@/components/TemplateCard";
import React, { useState } from "react";

const BacklogTemplate = () => {
  const [templates, setTemplates] = useState([]);

  return (
    <div className="my-auto flex flex-col">
      BacklogTemplate
      <div className="flex h-[80vh] p-4  items-center gap-4 overflow-hidden">
        <TemplateCard />
        <TemplateCard />
        <TemplateCard />
        <TemplateCard />
        <TemplateCard />
        <TemplateCard />
        <TemplateCard />
        <TemplateCard />
        <TemplateCard />
        <TemplateCard />
        <TemplateCard />
        <TemplateCard />
        <TemplateCard />
        <TemplateCard />
        <TemplateCard />
        <TemplateCard />
        <TemplateCard />
        <TemplateCard />
        <TemplateCard />
      </div>
    </div>
  );
};

export default BacklogTemplate;
