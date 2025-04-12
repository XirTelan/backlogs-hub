"use client";
import React from "react";
import TemplateCard from "../TemplateCard/TemplateCard";
import InputField from "../../../../shared/ui/Input/InputField";
import TextAreaInput from "../../../../shared/ui/TextAreaInput";
import { BacklogFormData, TemplateDTO } from "@/zodTypes";
import { toastCustom } from "@/shared/lib/toast";
import Title from "../../../../shared/ui/Title";
import ButtonBase from "../../../../shared/ui/ButtonBase";
import { SubmitHandler, useForm } from "react-hook-form";
import Select from "../../../../shared/ui/Select";
import { useSession } from "@/app_fsd/providers/sessionProvider";
const TemplatePreview = ({ backlogData, onClose }: TemplatePreviewProps) => {
  const { user } = useSession();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid, isSubmitting },
  } = useForm<TemplateDTO>({
    defaultValues: { ...backlogData, author: user?.username },
  });
  const data = watch();
  const onSubmit: SubmitHandler<Omit<TemplateDTO, "_id">> = async (data) => {
    try {
      if ("_id" in data) {
        delete data._id;
      }
      const res = await fetch("/api/templates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        toastCustom.success("Template saved");
        onClose();
      } else toastCustom.error("Cant create template.");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-w-sm m-auto   bg-bg-main   p-4 text-white ">
      <Title title="Creating Template" />
      <div className="flex  flex-col  gap-4 md:flex-row">
        <div className="min-w-[300px]">
          <div className=" p-2 text-center text-xl font-bold">
            Template Prewiev
          </div>
          {data && (
            <TemplateCard
              template={data as TemplateDTO}
              onClick={() => {
                return;
              }}
              onDelete={() => {
                return;
              }}
            />
          )}
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex min-w-80 flex-col   border-neutral-700 "
        >
          <div className="">
            <InputField
              label="Template Title (required)"
              placeholder="Template Title"
              variant="medium"
              helperText={
                errors.templateTitle && {
                  message: errors.templateTitle.message!,
                  type: "error",
                }
              }
              {...register("templateTitle", { required: true })}
            />
            <Select
              label="Visibility"
              options={["public", "private"]}
              {...register("visibility")}
            />
            <TextAreaInput
              label="Description"
              placeholder="Description"
              style={{ height: "250px" }}
              {...register("description")}
            />
          </div>
          <ButtonBase
            disabled={!isValid || isSubmitting}
            text="Create template"
          />
          <ButtonBase
            variant="secondary"
            type="button"
            text="Cancel"
            onClick={onClose}
          />
        </form>
      </div>
    </div>
  );
};

type TemplatePreviewProps = {
  backlogData: BacklogFormData;
  onClose: () => void;
};

export default TemplatePreview;
