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

const BacklogForm = <T extends BacklogFormData>({
  defaultValues,
  onSubmit,
}: {
  defaultValues: T;
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
    defaultValues,
    mode: "onBlur",
  });
  const handleShowTemplate = () => {
    clearErrors();
    const isCategoriesValid = Object.values(watchAllFields.categories).every(
      (value) => {
        return value.name.length > 0;
      },
    );
    const isFieldsValid = Object.values(watchAllFields.fields).every(
      (value) => {
        return value.name.length > 0;
      },
    );
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
  const onSubmitInternal = (data: BacklogFormData) =>
    onSubmit({ ...defaultValues, ...data });
  const watchAllFields = watch();
  return (
    <>
      <form onSubmit={handleSubmit(onSubmitInternal)}>
        <div className="field    w-full py-2  ">
          <InputField
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
        <div className="flex flex-col lg:flex-row lg:gap-4 ">
          <CategoriesFieldsBlock control={control} register={register} />
          <UserFieldsBlock control={control} register={register} />
        </div>
        {errors.fields && <p>{errors.fields.message}</p>}
        <div className="mt-4 flex w-1/4 flex-col gap-4">
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
