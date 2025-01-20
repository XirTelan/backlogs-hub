"use client";

import InputField from "@/components/Common/UI/Input/InputField";
import React, { useState } from "react";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import Modal from "@/components/Common/Modal";
import TemplatePreview from "@/components/Template/TemplatePreview";
import CategoriesFieldsBlock from "./CategoriesFieldsBlock";
import UserFieldsBlock from "./UserFieldsBlock";
import ButtonBase from "@/components/Common/UI/ButtonBase";
import { BacklogFormData, ModifiersType } from "@/zodTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import { BacklogFormSchema } from "@/zod";
import Select from "@/components/Common/UI/Select";
import { usePathname } from "next/navigation";
import { routesList } from "@/lib/routesList";
import ModifiersMenu from "@/components/ModifiersMenu";
import Switcher from "@/components/Common/UI/Switcher";
import useToggle from "@/hooks/useToggle";

const MODIFIERS_DEFAULT: ModifiersType = {
  useSteamSearch: false,
  useSteamImport: false,
  useTagsSystem: false,
  useBoardType: false,
};

const BacklogForm = <T extends BacklogFormData>({
  defaultValues,
  userFolders,
  onSubmit,
}: {
  defaultValues: T;
  userFolders: string[];
  onSubmit: SubmitHandler<T>;
}) => {
  const pathname = usePathname();
  const [showTemplate, setShowTemplate] = useState(false);
  const { isOpen: showTags, setOpen, setClose } = useToggle();
  const [modifiers, setModifiers] = useState({
    ...MODIFIERS_DEFAULT,
    ...defaultValues.modifiers,
  });

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
    mode: "onChange",
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
    data.modifiers = modifiers;

    data.backlogTitle = data.backlogTitle.trim();

    if (!data.modifiers.useTagsSystem) {
      data.tags = undefined;
    }
    data.categories.forEach((cat, indx) => {
      cat.order = indx;
    });
    onSubmit({ ...defaultValues, ...data });
  };
  const categoriesArray = useFieldArray({
    name: "categories",
    control,
  });

  const tagsArray = useFieldArray({
    name: "tags",
    control,
  });
  const watchAllFields = watch();

  return (
    <>
      <form onSubmit={handleSubmit(onSubmitInternal)}>
        <div className="flex flex-col md:flex-row   md:items-center md:gap-2">
          <div className="field grow py-2  ">
            <InputField
              autoFocus
              variant="medium"
              helperText={
                errors.backlogTitle && {
                  message: errors.backlogTitle.message!,
                  type: "error",
                }
              }
              id="backlogTitle"
              label="Backlog Title (required)"
              {...register(`backlogTitle`, { required: true })}
              style={{ marginTop: "6px" }}
            />
          </div>
          <div className="md:*:w-min-fit flex  min-w-fit gap-2   md:mb-2 md:items-center ">
            <div className="w-full">
              <Select
                label="Folder"
                options={userFolders}
                {...register("folder")}
              />
            </div>
            <div className="w-full">
              <Select
                label="Visibility"
                options={["public", "private"]}
                {...register("visibility")}
              />
            </div>
            <div className="mt-4 self-center">
              <ModifiersMenu
                defaultValues={modifiers}
                setValue={setModifiers}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row lg:gap-4 ">
          <section>
            {modifiers.useTagsSystem && (
              <Switcher
                initial={showTags ? 1 : 0}
                options={{
                  key: "",
                  callback: (value) => {
                    if (value === "tags") setOpen();
                    else setClose();
                  },
                  items: [
                    {
                      title: "Categories",
                      value: "categories",
                    },
                    {
                      title: "Tags",
                      value: "tags",
                    },
                  ],
                }}
              />
            )}
            {modifiers.useTagsSystem && showTags ? (
              <CategoriesFieldsBlock
                errors={errors.tags}
                data={tagsArray}
                control={control}
                register={register}
                name={"tags"}
                title={"Tags"}
                placeholder={"Tag name"}
              />
            ) : (
              <CategoriesFieldsBlock
                errors={errors.categories}
                data={categoriesArray}
                control={control}
                register={register}
                name={"categories"}
                title={"Categories"}
                placeholder={"Category name"}
              />
            )}
          </section>

          <UserFieldsBlock
            errors={errors.fields}
            control={control}
            register={register}
          />
        </div>
        <div className=" mt-4 flex w-full flex-col gap-4 md:w-1/4">
          <ButtonBase
            disabled={!isValid}
            text={`${pathname.startsWith(routesList.backlogEdit) ? "Save changes" : "Create Backlog"}`}
          />
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
