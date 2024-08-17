"use client";
import { toastCustom } from "@/lib/toast";
import { BacklogDTO, BacklogItemDTO } from "@/zodTypes";
import { useRouter } from "next/navigation";
import BacklogItemTr from "./BacklogItemTr";
import { useMemo, useState } from "react";
import Modal from "@/components/Common/Modal";
import Title from "@/components/Common/Title";

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

  const router = useRouter();
  const [isOpen, setIsOpen] = useState<string | null>(null);
  const onDelete = async (id: string) => {
    const res = await fetch(`/api/items/${id}`, {
      method: "DELETE",
    });
    if (res.ok) toastCustom.success(`Deleted`);
    else {
      const { message } = await res.json();
      toastCustom.error(message);
    }
    router.refresh();
  };

  return (
    <>
      {data.map((item: BacklogItemDTO, indx) => (
        <BacklogItemTr
          onDelete={() => setIsOpen(item._id)}
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
          action={() => onDelete(isOpen)}
          setClose={() => setIsOpen(null)}
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
