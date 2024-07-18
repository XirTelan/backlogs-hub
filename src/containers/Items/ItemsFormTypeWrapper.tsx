import { BacklogItemCreationDTO } from "@/zodTypes";
import ItemsForm from "./ItemsForm";
import { BacklogCategory, Field } from "@/zodTypes";

const ItemsFormTypeWrapper = async ({
  backlog,
  defaultValues,
  type,
}: {
  backlog: { fields: Field[]; categories: BacklogCategory[] };
  defaultValues: BacklogItemCreationDTO;
  type: "edit" | "create";
}) => {
  const mapFields = defaultValues.userFields.reduce((mapAcc, field) => {
    mapAcc.set(field.backlogFieldId, field.value);
    return mapAcc;
  }, new Map());

  return (
    <>
      <ItemsForm
        categories={backlog.categories}
        backlogFields={backlog.fields}
        mapFields={mapFields}
        defaultValues={defaultValues}
        type={type}
      />
    </>
  );
};

export default ItemsFormTypeWrapper;
