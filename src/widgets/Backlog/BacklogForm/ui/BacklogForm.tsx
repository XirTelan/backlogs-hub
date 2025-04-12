"use client";

import { useState } from "react";
import {
  SubmitHandler,
  useFieldArray,
  useForm,
  FormProvider,
} from "react-hook-form";
import Modal from "@/shared/ui/Modal/Modal";
import TemplatePreview from "@/entities/template/ui/TemplatePreview/TemplatePreview";
import UserFieldsBlock from "./UserFieldsBlock";
import { ButtonBase, Select, Switcher, InputField } from "@/shared/ui";
import { BacklogFormData } from "@/zodTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import { BacklogFormSchema } from "@/zod";
import { routesList } from "@/shared/lib/routesList";
import { usePathname } from "next/navigation";
import BacklogOptionsMenu from "@/widgets/Backlog/BacklogForm/ui/BacklogOptionsMenu";
import useToggle from "@/shared/hooks/useToggle";
import { FaEye, FaEyeSlash, FaFolder } from "react-icons/fa6";
import CategoriesFieldsBlock from "./CategoriesFieldsBlock";

export const BacklogForm = <T extends BacklogFormData>({
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

  const methods = useForm<BacklogFormData>({
    resolver: zodResolver(BacklogFormSchema),
    defaultValues,
    mode: "all",
  });

  const {
    register,
    setValue,
    handleSubmit,
    watch,
    control,
    setError,
    clearErrors,
    formState: { errors, isValid, isSubmitting },
  } = methods;

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
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmitInternal)}>
          <div className="flex flex-col md:flex-row   md:items-center md:gap-2">
            <div className="field grow py-2  ">
              <span className="w-full inline-flex items-center">
                <span className="flex w-fit text-text-secondary ">
                  Backlog Title (required){" "}
                </span>
                <div
                  title="Select backlog folder"
                  className="flex ms-auto items-center"
                >
                  <div className="flex items-center">
                    <FaFolder />
                    <Select
                      variant="inline"
                      aria-label="Select backlog folder"
                      options={userFolders}
                      {...register("folder")}
                    />
                  </div>
                  <div>
                    <ButtonBase
                      type="button"
                      variant="ghost"
                      {...register("visibility")}
                      size="medium"
                      aria-label={`Visability: ${watchAllFields.visibility === "public" ? "Public" : "Private"}`}
                      title={`Visability: ${watchAllFields.visibility === "public" ? "Public" : "Private"}`}
                      icon={
                        watchAllFields.visibility === "public" ? (
                          <FaEye />
                        ) : (
                          <FaEyeSlash />
                        )
                      }
                      onClick={() => {
                        setValue(
                          "visibility",
                          watchAllFields.visibility === "public"
                            ? "private"
                            : "public"
                        );
                      }}
                    />
                  </div>
                </div>
              </span>
              <div className="flex">
                <InputField
                  autoFocus
                  variant="medium"
                  isSimple
                  helperText={
                    errors.backlogTitle && {
                      message: errors.backlogTitle.message!,
                      type: "error",
                    }
                  }
                  id="backlogTitle"
                  {...register(`backlogTitle`, { required: true })}
                />
                <BacklogOptionsMenu />
              </div>
            </div>
            <div className="md:*:w-min-fit flex  min-w-fit gap-2  md:items-center ">
              <div className="self-center"></div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row lg:gap-4 ">
            <section>
              {watchAllFields.modifiers.useTagsSystem && (
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
              {watchAllFields.modifiers.useTagsSystem && showTags ? (
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
              disabled={!isValid || isSubmitting}
              text={`${pathname.startsWith(routesList.backlogEdit) ? "Save changes" : "Create Backlog"}`}
            />
            <ButtonBase
              disabled={!isValid || isSubmitting}
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
      </FormProvider>
    </>
  );
};
