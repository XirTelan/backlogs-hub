import { ModalProvider } from "@/providers/modalProvider";
import React from "react";
import ItemFormModal from "../Items/ItemFormModal";
import ItemInfoModal from "../Items/ItemInfoModal";
import ItemDeleteModal from "../Items/ItemDeleteModal";

const BacklogModalsWrapper = ({
  children,
}: {
  children: React.ReactNode | React.ReactNode[];
}) => {
  return (
    <>
      <ModalProvider>
        <>{children}</>
        <ItemFormModal />
        <ItemInfoModal />
        <ItemDeleteModal />
      </ModalProvider>
    </>
  );
};

export default BacklogModalsWrapper;
