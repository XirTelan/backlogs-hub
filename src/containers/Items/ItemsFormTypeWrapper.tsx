import { BacklogItemCreationDTO } from "@/zodTypes";
import ItemsForm from "./ItemsForm";
import { ItemsFormBacklogProp } from "@/types";

const ItemsFormTypeWrapper = async ({
  backlog,
  defaultValues,
  type,
}: {
  backlog: ItemsFormBacklogProp;

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
        backlog={backlog}
        mapFields={mapFields}
        defaultValues={defaultValues}
        type={type}
      />
    </>
  );
};

export default ItemsFormTypeWrapper;
