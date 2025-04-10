"use client";
import { createModal } from "@/shared/lib/createModal";
import React, { Suspense, useContext } from "react";
import { IoAdd } from "react-icons/io5";
import { CreateItemForm } from "./CreateItemForm";
import LoadingAnimation from "@/components/Common/UI/Loading/Loading";
import Title from "@/components/Common/Title";
import { ModalContext } from "@/shared/providers/modalProvider";
import { BacklogInfoContext } from "@/shared/providers/backlogInfoProvider";

const ModalProvider = createModal(
  ModalContext,
  "itemForm",
  {
    openerButtton: {
      hideText: true,
      text: "Add item",
      icon: <IoAdd />,
    },
  },
  { styleMain: "fixed top-1/4" }
);

export const ItemFormModalOpen = ModalProvider.Opener;

const ItemFormModal = () => {
  const cntx = useContext(ModalContext);
  const backlogInfo = useContext(BacklogInfoContext);

  if (!backlogInfo.backlog) return;

  return (
    <>
      <ModalProvider.WithModal>
        <Suspense fallback={<LoadingAnimation />}>
          <div className="container min-w-[90vw] overflow-auto bg-bg-main p-4 text-text-primary md:min-w-[640px] lg:min-w-[768px] xl:min-w-[1024px]">
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
