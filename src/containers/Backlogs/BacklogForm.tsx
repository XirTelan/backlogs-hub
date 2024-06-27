"use client";

import InputField from "@/components/Common/UI/InputField";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Modal from "@/components/Common/Modal";
import TemplatePreview from "@/components/Template/TemplatePreview";
import CategoriesFieldsBlock from "./CategoriesFieldsBlock";
import UserFieldsBlock from "./UserFieldsBlock";
import ButtonBase from "@/components/Common/UI/ButtonBase";
import { BacklogFormData } from "@/zodTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import { BacklogFormSchema } from "@/zod";
import Select from "@/components/Common/UI/Select";

const BacklogForm = <T extends BacklogFormData>({
  defaultValues,
  userFolders,
  onSubmit,
}: {
  defaultValues: T;
  userFolders: string[];
  onSubmit: SubmitHandler<T>;
}) => {
  const [showTemplate, setShowTemplate] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    control,
    setError,
    clearErrors,
    formState: { errors, isValid },
  } = useForm<BacklogFormData>({
    resolver: zodResolver(BacklogFormSchema),
    defaultValues,
    mode: "onBlur",
  });
  const handleShowTemplate = () => {
    clearErrors();
    const isCategoriesValid = watchAllFields.categories.every((value) => {
      return value.name.length > 0;
    });
    const isFieldsValid = watchAllFields.fields?.every((value) => {
      return value.name.length > 0;
    });
    if (isCategoriesValid && isFieldsValid) {
      setShowTemplate((prev) => !prev);
    } else {
      setError("fields", {
        type: "manual",
        message:
          "All fields and categories  names must be filled to save template",
      });
    }
  };
  const onSubmitInternal = (data: BacklogFormData) => {
    onSubmit({ ...defaultValues, ...data });
  };
  const watchAllFields = watch();
  return (
    <>
      <form onSubmit={handleSubmit(onSubmitInternal)}>
        <div className="field w-full grow py-2  ">
          <InputField
            autoFocus
            helperText={
              errors.backlogTitle && {
                message: errors.backlogTitle.message!,
                type: "error",
              }
            }
            id="backlogTitle"
            label="Title (required)"
            {...register(`backlogTitle`, { required: true })}
          />
        </div>
        <div className="flex gap-2">
          <Select
            label="Folder"
            options={userFolders}
            {...register("folder")}
          />
          <Select
            label="Visibility"
            options={["public", "private"]}
            {...register("visibility")}
          />
        </div>
        <div className="flex flex-col lg:flex-row lg:gap-4 ">
          <CategoriesFieldsBlock
            errors={errors.categories}
            control={control}
            register={register}
          />
          <UserFieldsBlock
            errors={errors.fields}
            control={control}
            register={register}
          />
        </div>
        <div className=" mt-4 flex w-full flex-col gap-4 md:w-1/4">
          <ButtonBase disabled={!isValid} text="Create backlog" />
          <ButtonBase
            disabled={!isValid}
            type="button"
            variant="secondary"
            onClick={handleShowTemplate}
            text="Save as template"
          />
        </div>
        <div className="flex w-full flex-col items-center justify-center"></div>
      </form>

      {showTemplate && (
        <Modal setClose={() => setShowTemplate(false)}>
          <TemplatePreview
            onClose={() => setShowTemplate(false)}
            backlogData={watchAllFields}
          />
        </Modal>
      )}
    </>
  );
};

export default BacklogForm;
