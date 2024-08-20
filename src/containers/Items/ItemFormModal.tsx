"use client";
import { createModal } from "@/lib/createModal";
import React, { Suspense, useContext } from "react";
import { IoAdd } from "react-icons/io5";
import { CreateItemForm } from "./CreateItemForm";
import LoadingAnimation from "@/components/Common/UI/Loading/Loading";
import { BacklogDTO } from "@/zodTypes";
import Title from "@/components/Common/Title";
import { ModalContext } from "@/providers/modalProvider";

const ModalProvider = createModal(ModalContext, "itemForm", {
  openerButtton: {
    hideText: true,
    text: "Add item",
    icon: <IoAdd />,
  },
});

export const ItemFormModalOpen = ModalProvider.Opener;

const ItemFormModal = ({ backlog }: { backlog: BacklogDTO }) => {
  const cntx = useContext(ModalContext);
  return (
    <>
      <ModalProvider.WithModal>
        <Suspense fallback={<LoadingAnimation />}>
          <div className="min-h-[90vh] min-w-[90vw] bg-background p-4 text-primary-text ">
            <Title variant={2} title={"Create"} />
            <CreateItemForm
              backlogInfo={backlog}
              options={{ btnCancel: cntx.setClose }}
            />
          </div>
        </Suspense>
      </ModalProvider.WithModal>
    </>
  );
};

export default ItemFormModal;
