"use client";
import { toastCustom } from "@/lib/toast";
import { BacklogDTO, BacklogItemDTO } from "@/zodTypes";
import BacklogItemTr from "./BacklogItemTr";
import { useMemo, useState } from "react";
import Modal from "@/components/Common/Modal";
import Title from "@/components/Common/Title";
import useToggle from "@/hooks/useToggle";
import { useSWRConfig } from "swr";
import { apiRoutesList } from "@/lib/routesList";

const BacklogListData = ({
  data,
  isOwner,
  categories,
}: {
  data: BacklogItemDTO[];
  isOwner: boolean;
  categories: BacklogDTO["categories"];
}) => {
  const categoriesMap = useMemo(
    () =>
      new Map(categories.map((category) => [category.name, category.color])),
    [categories],
  );
  const { mutate } = useSWRConfig();
  const { isOpen, setOpen, setClose } = useToggle();
  const [itemId, setItemId] = useState<string>("");

  const onDelete = async () => {
    if (!itemId) return;

    const res = await fetch(`/api/items/${itemId}`, {
      method: "DELETE",
    });
    if (res.ok) {
      toastCustom.success(`Deleted`);
      mutate(
        (key) =>
          typeof key === "string" && key.startsWith(`${apiRoutesList.items}`),
      );
    } else {
      const { message } = await res.json();
      toastCustom.error(message);
    }
  };

  const handleDelete = (id: string) => {
    setItemId(id);
    setOpen();
  };

  return (
    <>
      {data.map((item: BacklogItemDTO, indx) => (
        <BacklogItemTr
          onDelete={handleDelete}
          showActions={isOwner}
          key={item._id ?? indx}
          item={item}
          categories={categories}
          color={categoriesMap.get(item.category) || "#fff"}
        />
      ))}
      {isOpen && (
        <Modal
          showActions
          actionOptions={{
            confirmBtn: {
              clrVariant: "dangerPrimary",
            },
          }}
          action={onDelete}
          setClose={setClose}
        >
          <>
            <div className=" bg-layer-1 p-4 text-white ">
              <Title variant={2} title={"Delete"} />
              <div>Are you sure you want to delete this record? </div>
            </div>
          </>
        </Modal>
      )}
    </>
  );
};

export default BacklogListData;
