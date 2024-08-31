"use client";
import InputField from "@/components/Common/UI/Input/InputField";
import { useForm } from "react-hook-form";
import FieldsBlock from "../../components/FieldsBlock";
import { useRouter } from "next/navigation";
import ButtonBase from "@/components/Common/UI/ButtonBase";
import Select from "@/components/Common/UI/Select";
import { BacklogItemCreationDTO, Field } from "@/zodTypes";
import { useCallback, useMemo } from "react";
import ProgressTimer from "@/containers/Fields/ProgressTimer";
import { toastCustom } from "@/lib/toast";

import MarkdownEditor from "../Fields/MarkdownEditor";
import SearchGameBar from "../Features/SearchGameBar";
import { ItemsFormProps } from "@/types";
import { FaSteam } from "react-icons/fa6";
import { useSWRConfig } from "swr";
import { apiRoutesList } from "@/lib/routesList";
import DropDown from "@/components/Common/UI/DropDown/DropDown";
import LoadingAnimation from "@/components/Common/UI/Loading/Loading";

const ItemsForm = <T extends BacklogItemCreationDTO>({
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
    [defaultValues.userFields],
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
            typeof key === "string" && key.startsWith(`${apiRoutesList.items}`),
        );
        return true;
      } catch (error) {
        console.error("Fetch error:", error);
        throw error;
      }
    },
    [mutate, type],
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
        setValue: setValue as (name: string, val: string) => void,
        ...register(`userFields.${index}.value`, { required: false }),
      };

      switch (field.type) {
        case "timer":
          return <ProgressTimer layer={2} {...commonProps} />;
        case "markdown":
          return <MarkdownEditor {...commonProps} />;
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
    [mapFields, register, setValue],
  );

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
                <div className="absolute bottom-0 right-0 top-0 mt-6  text-primary-btn-hover">
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
            <InputField
              id="title"
              placeholder="Title"
              label="Title"
              variant="medium"
              {...register("title", { required: true })}
            />
          )}
        </div>
        <div className="md:w-1/5">
          <Select
            label="Category"
            options={backlog.categories.map((category) => category.name)}
            {...register("category")}
          />
        </div>
      </div>
      <div>
        <DropDown
          onChange={handleTagsChange}
          id={"tags"}
          label={"tags"}
          options={backlog.tags?.map((tag) => tag.name)}
        />
      </div>
      {backlog.backlogFields.length > 0 && (
        <FieldsBlock title="Fields" status="disabled">
          <>
            {backlog.backlogFields.map((field, index) => {
              return (
                <li
                  className={`${inputTypes[field.type || "text"]}  w-auto bg-layer-1 p-2 `}
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
        {" "}
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

export default ItemsForm;

const inputTypes: Record<Field["type"], string> = {
  text: "col-span-2",
  markdown: "col-span-4",
  date: "",
  number: "col-span-2",
  timer: "col-span-2 md:col-span-4",
  select: "col-span-2 ",
};
