"use client";

import InputField from "@/components/Common/InputField";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { BacklogFormData } from "@/types";
import { motion } from "framer-motion";
import { IoMdAdd } from "react-icons/io";
import { GrTemplate } from "react-icons/gr";
import Modal from "@/components/Common/Modal";
import TemplatePreview from "@/components/Template/TemplatePreview";
import CategoriesFieldsBlock from "./CategoriesFieldsBlock";
import UserFieldsBlock from "./UserFieldsBlock";

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
    formState: { errors },
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
        <div className="field group relative my-4  w-full rounded border border-neutral-800 bg-neutral-900 px-2 py-2 ">
          <InputField
            id="backlogTitle"
            placeholder="Backlog title"
            label="Backlog title"
            {...register(`backlogTitle`, { required: true })}
          />
        </div>
        <div className="flex flex-col lg:flex-row lg:gap-4 ">
          <CategoriesFieldsBlock control={control} register={register} />
          <UserFieldsBlock control={control} register={register} />
        </div>
        <div className="flex w-full flex-col items-center justify-center">
          {errors.fields && <p>{errors.fields.message}</p>}
          <div className=" relative flex w-80 items-center  rounded  bg-neutral-500 p-2">
            <motion.button
              initial={{ left: "auto" }}
              whileHover={{ left: 0 }}
              onClick={handleShowTemplate}
              type="button"
              className="group absolute bottom-0 right-0 top-0 flex shrink items-center rounded bg-red-500"
            >
              <div className="flex w-full items-center justify-between p-2">
                <GrTemplate />
                <div className=" invisible m-auto hidden  opacity-0 group-hover:visible group-hover:flex group-hover:opacity-100 group-hover:delay-1000">
                  Save as template
                </div>
              </div>
            </motion.button>
            <IoMdAdd />
            <button className="w-full text-center" type="submit">
              Create Backlog
            </button>
          </div>
        </div>
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
