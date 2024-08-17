"use client";
import useToggle from "@/hooks/useToggle";
import { createModal } from "@/lib/createModal";
import React, { Suspense } from "react";
import { IoAdd } from "react-icons/io5";
import { CreateItemForm } from "./CreateItemForm";
import LoadingAnimation from "@/components/Common/UI/Loading/Loading";
import { BacklogDTO } from "@/zodTypes";
import Title from "@/components/Common/Title";

const ItemFormModal = ({ backlog }: { backlog: BacklogDTO }) => {
  const { isOpen, setOpen, setClose } = useToggle();
  const ModalProvider = createModal(
    {
      isOpen,
      setClose,
      setOpen,
    },
    { hideText: true, text: "Add item", icon: <IoAdd /> },
  );
  return (
    <>
      <ModalProvider.Opener />
      <ModalProvider.WithModal>
        <Suspense fallback={<LoadingAnimation />}>
          <div className="min-h-[90vh] min-w-[90vw] bg-background p-4 text-primary-text ">
            <Title variant={2} title={"Create"} />
            <CreateItemForm
              backlogInfo={backlog}
              options={{ btnCancel: setClose }}
            />
          </div>
        </Suspense>
      </ModalProvider.WithModal>
    </>
  );
};

export default ItemFormModal;
