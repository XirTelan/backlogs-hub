"use client";
import { createModal } from "@/lib/createModal";
import React, { Suspense, useContext } from "react";
import { IoAdd } from "react-icons/io5";
import { CreateItemForm } from "./CreateItemForm";
import LoadingAnimation from "@/components/Common/UI/Loading/Loading";
import Title from "@/components/Common/Title";
import { ModalContext } from "@/providers/modalProvider";
import { BacklogInfoContext } from "@/providers/backlogInfoProvider";

const ModalProvider = createModal(ModalContext, "itemForm", {
  openerButtton: {
    hideText: true,
    text: "Add item",
    icon: <IoAdd />,
  },
});

export const ItemFormModalOpen = ModalProvider.Opener;

const ItemFormModal = () => {
  const cntx = useContext(ModalContext);
  const backlogInfo = useContext(BacklogInfoContext);

  if (!backlogInfo.backlog) return;

  return (
    <>
      <ModalProvider.WithModal>
        <Suspense fallback={<LoadingAnimation />}>
          <div className="min-h-[90vh] min-w-[90vw] bg-background p-4 text-primary-text ">
            <Title variant={2} title={"Create"} />
            <CreateItemForm
              backlogInfo={backlogInfo.backlog}
              options={{ btnCancel: cntx.setClose }}
            />
          </div>
        </Suspense>
      </ModalProvider.WithModal>
    </>
  );
};

export default ItemFormModal;
