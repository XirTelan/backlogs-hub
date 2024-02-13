"use client";
import TemplateCard from "@/components/Template/TemplateCard";
import TemplateForm from "@/components/Template/TemplateForm";
import { TemplateDTO } from "@/types";
import { motion } from "framer-motion";
import React, { useState } from "react";

const TemplateWrapper = ({ template, onSubmit }: TemplateCardProps) => {
  const [isSubmit, setIsSubmit] = useState(false);

  const handleSubmit = (backlogTitle: string) => {
    template.templateTitle = backlogTitle;
    onSubmit(template);
  };

  return (
    <>
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="relative flex   w-80 shrink-0 flex-col  break-words rounded-xl  bg-[#222222] hover:shadow-lg hover:shadow-cyan-500/50 "
      >
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
      </motion.div>
    </>
  );
};

export default TemplateWrapper;

type TemplateCardProps = {
  template: TemplateDTO;
  onSubmit: (data: TemplateDTO) => void;
};
