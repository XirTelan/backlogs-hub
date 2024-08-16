"use client";
import InputField from "@/components/Common/UI/InputField";
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

const ItemsForm = <T extends BacklogItemCreationDTO>({
  backlog,
  defaultValues,
  type,
  view = "page",
  btnCancel,
}: ItemsFormProps<T>) => {
  const router = useRouter();

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

        return true;
      } catch (error) {
        console.error("Fetch error:", error);
        throw error;
      }
    },
    [type],
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
    console.log(view);
    view === "page" ? router.back() : router.refresh();
  };

  const onSubmitInternal = (data: BacklogItemCreationDTO) => {
    onSubmit({
      ...defaultValues,
      ...data,
    })
      .then((success) => {
        if (success) {
          handleCancel();
          toastCustom.success("success");
        }
      })
      .catch((error) => {
        toastCustom.error(error.statusText);
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

  const isUsingSteamSearch =
    backlog.modifiers?.useSteamSearch && watch("modifiersFields.steamAppId");

  const handleSteamSearchAddGame = (id: string, name: string) => {
    setValue("modifiersFields.steamAppId", id);
    setValue("title", name);
  };

  const handleSteamSearchUnlink = (e: React.MouseEvent) => {
    e.preventDefault();
    setValue("modifiersFields.steamAppId", undefined);
  };

  return (
    <form onSubmit={handleSubmit(onSubmitInternal)}>
      <div className="flex flex-col md:flex-row md:items-center md:gap-4 ">
        <div className="field group  relative mt-2 px-0 py-4 md:w-4/5  ">
          {backlog.modifiers?.useSteamSearch ? (
            <div className="relative">
              <SearchGameBar
                readOnly={isUsingSteamSearch !== undefined}
                addGame={handleSteamSearchAddGame}
                labelText="Title"
                {...register("title", { required: true })}
              />
              {isUsingSteamSearch && (
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
              {...register("title", { required: true })}
            />
          )}
        </div>
        <div className="w-1/5">
          <Select
            label="Category"
            options={backlog.categories.map((category) => category.name)}
            {...register("category")}
          />
        </div>
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
        <ButtonBase
          disabled={!isValid || isSubmitting}
          text={type === "create" ? "Create" : "Save"}
          type="submit"
        />
        <ButtonBase
          text="Cancel"
          variant="secondary"
          type="button"
          onClick={handleCancel}
        />
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
