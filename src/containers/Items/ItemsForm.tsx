"use client";
import InputField from "@/components/Common/UI/InputField";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import FieldsBlock from "../../components/FieldsBlock";
import { useRouter } from "next/navigation";
import ButtonBase from "@/components/Common/UI/ButtonBase";
import Select from "@/components/Common/UI/Select";
import { BacklogCategory, BacklogItemCreationDTO, Field } from "@/zodTypes";

const ItemsForm = <T extends BacklogItemCreationDTO>({
  categories,
  fields,
  defaultValues,
  onSubmit,
}: {
  categories: BacklogCategory[];
  fields: Field[];
  defaultValues: T;
  onSubmit: SubmitHandler<T>;
}) => {
  const router = useRouter();
  const {
    handleSubmit,
    control,
    register,
    formState: { isValid, isSubmitting },
  } = useForm<BacklogItemCreationDTO>({
    defaultValues,
    mode: "onBlur",
  });
  const { fields: userFields } = useFieldArray({
    name: "userFields",
    control,
    rules: {},
  });
  const mapFields: Map<string, inputs> = fields.reduce(
    (mapAccumulator, obj) => {
      mapAccumulator.set(obj.name, obj.type);
      return mapAccumulator;
    },
    new Map(),
  );

  const onSubmitInternal = (data: BacklogItemCreationDTO) => {
    onSubmit({ ...defaultValues, ...data });
  };

  return (
    <form onSubmit={handleSubmit(onSubmitInternal)}>
      <div className="field group  relative mt-2 px-0 py-4 md:w-1/2  ">
        <InputField
          id="title"
          placeholder="Title"
          label="Title"
          {...register("title", { required: true })}
        />
      </div>
      <div>
        <Select
          label="Category"
          options={categories.map((category) => category.name)}
          {...register("category")}
        />
      </div>
      <FieldsBlock title="Fields" status="disabled">
        <>
          {userFields.map((field, index) => (
            <li
              className={`${inputTypes[mapFields.get(field.name) || "text"]}  w-auto`}
              key={index}
            >
              <InputField
                label={field.name}
                placeholder={field.name}
                type={mapFields?.get(field.name)}
                {...register(`userFields.${index}.value`, {
                  required: false,
                })}
              />
            </li>
          ))}
        </>
      </FieldsBlock>

      <div className="my-4 flex w-full flex-col md:w-1/4 md:gap-4 ">
        <ButtonBase
          disabled={!isValid || isSubmitting}
          text="Create"
          type="submit"
        />
        <ButtonBase
          text="Cancel"
          variant="secondary"
          type="button"
          onClick={() => router.back()}
        />
      </div>
    </form>
  );
};

export default ItemsForm;
const inputTypes = {
  text: "col-span-2",
  textArea: "col-span-4",
  date: "",
  number: "col-span-2",
  timer: "col-span-4",
};

type inputs = keyof typeof inputTypes;
