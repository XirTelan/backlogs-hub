"use client";
import { createModal } from "@/shared/lib/createModal";
import React, { useContext } from "react";
import { ModalContext } from "@/shared/providers/modalProvider";
import { apiRoutesList } from "@/shared/lib/routesList";
import { useSWRConfig } from "swr";
import { MdDeleteForever } from "react-icons/md";
import { Title } from "@/shared/ui";
import { toastCustom } from "@/shared/lib/toast";

const ModalProvider = createModal(ModalContext, "ItemDelete", {
  openerButtton: {
    size: "small",
    variant: "dangerGhost",
    text: "Delete item",
    icon: <MdDeleteForever size={24} />,
  },
});

export const ItemDeleteModalOpen = ModalProvider.Opener;

const isSatisfies = (data: unknown): data is { id: string; title: string } => {
  return (
    typeof data === "object" && data != null && "id" in data && "title" in data
  );
};

const ItemDeleteModal = () => {
  const cntx = useContext(ModalContext);
  const { mutate } = useSWRConfig();
  if (!isSatisfies(cntx.data)) return;

  const { data } = cntx;

  const handleDelete = async () => {
    if (!data.id) return;

    const res = await fetch(`/api/items/${data.id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      toastCustom.success(`${data.title ?? ""} Deleted`);
      mutate(
        (key) =>
          typeof key === "string" && key.startsWith(`${apiRoutesList.items}`)
      );
    } else {
      const { message } = await res.json();
      toastCustom.error(message);
    }
  };

  return (
    <>
      <ModalProvider.WithModal
        options={{
          actionOptions: {
            showActions: true,
            confirmBtn: {
              clrVariant: "dangerPrimary",
              text: "Delete item",
            },
          },
          action: handleDelete,
        }}
      >
        <div className="container relative min-h-40  bg-bg-main p-4 text-text-primary md:min-w-[640px] lg:min-w-[768px] xl:min-w-[1024px] ">
          <Title variant={2} title={`Delete "${data.title ?? "item"}" ?`} />
          <p className="text-text-secondary">
            Are you sure you want to delete this record?{" "}
          </p>
        </div>
      </ModalProvider.WithModal>
    </>
  );
};

export default ItemDeleteModal;
