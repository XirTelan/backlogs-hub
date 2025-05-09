"use client";
import { useForm } from "react-hook-form";
import FieldsBlock from "./FieldsBlock";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import ProgressTimer from "@/features/progressTimer/ProgressTimer";
import { toastCustom } from "@/shared/lib/toast";

import { MarkdownEditor } from "@/shared/ui";
import SearchGameBar from "../../../features/search/searchGameBar/ui/SearchGameBar";
import { FaSteam } from "react-icons/fa6";
import { useSWRConfig } from "swr";
import { apiRoutesList } from "@/shared/constants/routesList";
import DropDown from "@/shared/ui/DropDown/DropDown";
import { Select, InputField, ButtonBase, LoadingAnimation } from "@/shared/ui";
import { BacklogItemCreationDTO, Field, ItemsFormProps } from "@/shared/model/";

export const ItemsForm = <T extends BacklogItemCreationDTO>({
  backlog,
  defaultValues,
  type,
  view = "page",
  btnCancel,
}: ItemsFormProps<T>) => {
  const router = useRouter();
  const { mutate } = useSWRConfig();
  const mapFields = useMemo(
    () =>
      defaultValues.userFields.reduce((mapAcc, field) => {
        mapAcc.set(field.backlogFieldId, field.value);
        return mapAcc;
      }, new Map()),
    [defaultValues.userFields]
  );

  const onSubmit = useCallback(
    async (data: BacklogItemCreationDTO & { _id?: string }) => {
      const url = `/api/items${type === "edit" ? `/${data._id}` : ""}`;
      const options = {
        method: type === "edit" ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };

      try {
        const res = await fetch(url, options);

        if (!res.ok) {
          const error = await res.json();
          console.error("API error:", error);
          throw new Error(res.statusText || "Failed to submit data.");
        }
        mutate(
          (key) =>
            typeof key === "string" && key.startsWith(`${apiRoutesList.items}`)
        );
        return true;
      } catch (error) {
        console.error("Fetch error:", error);
        throw error;
      }
    },
    [mutate, type]
  );

  const {
    handleSubmit,
    register,
    setValue,
    watch,
    formState: { isValid, isSubmitting },
  } = useForm<BacklogItemCreationDTO>({
    defaultValues,
    mode: "onBlur",
  });

  const handleCancel = () => {
    if (btnCancel) {
      btnCancel();
      return;
    }
    if (view === "page") {
      router.back();
    }
  };

  const onSubmitInternal = (data: BacklogItemCreationDTO) => {
    return new Promise((res, rej) => {
      onSubmit({
        ...defaultValues,
        ...data,
      })
        .then((success) => {
          if (success) {
            handleCancel();
            toastCustom.success("success");
            res(true);
          } else rej();
        })
        .catch((error) => {
          toastCustom.error(error.statusText);
          rej();
        });
    });
  };

  const getFieldInput = useCallback(
    (field: Field, index: number) => {
      const fieldValue = mapFields?.get(field._id || "") || "";
      const commonProps = {
        label: field.name,
        defaultValue: fieldValue,
        ...register(`userFields.${index}.value`, { required: false }),
      };

      switch (field.type) {
        case "timer":
          return (
            <ProgressTimer
              layer={1}
              {...{
                ...commonProps,
                setValue: setValue as (name: string, val: string) => void,
              }}
            />
          );
        case "markdown":
          return (
            <MarkdownEditor
              {...{
                ...commonProps,
                setValue: setValue as (name: string, val: string) => void,
              }}
            />
          );
        case "select":
          return (
            <Select layer={2} options={field.data || []} {...commonProps} />
          );
        case "text":
        case "number":
        case "date":
        default:
          return (
            <InputField
              layer={2}
              placeholder={field.name}
              type={field.type}
              {...commonProps}
            />
          );
      }
    },
    [mapFields, register, setValue]
  );
  const isShowTags = backlog.modifiers.useTagsSystem;
  const isLinkedToGame =
    backlog.modifiers?.useSteamSearch && watch("modifiersFields.steamAppId");

  const handleSteamSearchAddGame = (id: string, name: string) => {
    setValue("modifiersFields.steamAppId", id);
    setValue("title", name);
  };

  const handleSteamSearchUnlink = (e: React.MouseEvent) => {
    e.preventDefault();
    setValue("modifiersFields.steamAppId", undefined);
  };

  const handleTagsChange = (value: string[]) => {
    setValue("tags", value);
  };

  return (
    <form onSubmit={handleSubmit(onSubmitInternal)}>
      <div className="flex flex-col md:flex-row md:items-center md:gap-4 ">
        <div className="field group relative  mt-3 px-0 md:w-4/5  ">
          {backlog.modifiers?.useSteamSearch ? (
            <div className="relative">
              <SearchGameBar
                readOnly={isLinkedToGame !== undefined}
                addGame={handleSteamSearchAddGame}
                labelText="Title"
                {...register("title", { required: true })}
              />
              {isLinkedToGame && (
                <div className="absolute bottom-0 right-0 top-0 mt-6 text-btn-primary-hover ">
                  <ButtonBase
                    variant="ghost"
                    type="button"
                    title="Linked to steam game"
                    icon={<FaSteam size={24} />}
                    onClick={handleSteamSearchUnlink}
                  />
                </div>
              )}
            </div>
          ) : (
            type === "create" && (
              <InputField
                id="title"
                placeholder="Title"
                label="Title"
                variant="medium"
                {...register("title", { required: true })}
              />
            )
          )}
        </div>
        {type === "create" && (
          <div className="md:w-1/5">
            <Select
              label="Category"
              options={backlog.categories.map((category) => category.name)}
              {...register("category")}
            />
          </div>
        )}
      </div>
      {isShowTags && (
        <div>
          <DropDown
            onChange={handleTagsChange}
            id={"tags"}
            label={"Tags"}
            activeItems={defaultValues.tags}
            options={backlog.tags?.map((tag) => tag.name)}
          />
        </div>
      )}
      {backlog.backlogFields.length > 0 && (
        <FieldsBlock title="Fields" status="disabled">
          <>
            {backlog.backlogFields.map((field, index) => {
              return (
                <li
                  className={`${inputTypes[field.type || "text"]}  w-auto  p-2 `}
                  key={index}
                >
                  {getFieldInput(field, index)}
                </li>
              );
            })}
          </>
        </FieldsBlock>
      )}

      <div className="my-4 flex w-full flex-col md:w-1/4 md:gap-4 ">
        {isSubmitting ? (
          <LoadingAnimation />
        ) : (
          <>
            <ButtonBase
              disabled={!isValid}
              text={type === "create" ? "Create" : "Save"}
              type="submit"
            />
            <ButtonBase
              text="Cancel"
              variant="secondary"
              type="button"
              onClick={handleCancel}
            />
          </>
        )}
      </div>
    </form>
  );
};

const inputTypes: Record<Field["type"], string> = {
  text: "col-span-2",
  markdown: "col-span-4",
  date: "",
  number: "col-span-2",
  timer: "col-span-2 md:col-span-4",
  select: "col-span-2 ",
};
