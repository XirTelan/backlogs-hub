"use client";
import React, { useEffect, useState } from "react";
import TemplateCard from "./TemplateCard";
import { BacklogFormData, TemplateDTO } from "@/types";
import InputField from "../Common/InputField";
import TextArea from "../Common/TextArea";
import toast from "react-hot-toast";
const TemplatePreview = ({ backlogData, onClose }: TemplatePreviewProps) => {
  const [data, setData] = useState<Partial<TemplateDTO>>();
  const [description, setDescription] = useState<string>("");
  const [teamplateTitle, setTemplateTitle] = useState<string>("");

  useEffect(() => {
    const mapToTemplate = (data: BacklogFormData) => {
      console.log("data", data);
      const template: Partial<TemplateDTO> = {
        ...data,
        templateTitle: teamplateTitle || "",
        features: "",
        description: description,
        author: "",
      };
      setData(template);
    };
    mapToTemplate(backlogData);
  }, [backlogData, teamplateTitle, description]);

  const handleSubmit = async () => {
    try {
      const res = await fetch("/api/templates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        toast.success("Template saved");
        onClose();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="m-auto flex flex-col items-center gap-4 lg:flex-row">
      <div>
        <div className=" p-2 text-center text-xl font-bold">
          Template Prewiev
        </div>
        {data && (
          <div className=" rounded-xl border border-cyan-500">
            <TemplateCard
              template={data as TemplateDTO}
              toSubmit={() => console.log("HEy")}
            />
          </div>
        )}
      </div>
      <div className="flex min-w-80 flex-col rounded border border-neutral-700 bg-neutral-800 p-2">
        <h2 className=" text-lg font-bold">Creating Template</h2>
        <InputField
          label="Template Title"
          placeholder="Template Title"
          value={teamplateTitle}
          onChange={(e) => setTemplateTitle(e.target.value)}
        />
        <TextArea
          label="Description"
          placeholder="Description"
          style={{ height: "250px" }}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button onClick={onClose}>cancel</button>
        <button onClick={handleSubmit}>Save</button>
      </div>
    </div>
  );
};

type TemplatePreviewProps = {
  backlogData: BacklogFormData;
  onClose: () => void;
};

export default TemplatePreview;
