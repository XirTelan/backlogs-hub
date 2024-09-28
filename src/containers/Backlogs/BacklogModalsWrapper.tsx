import { ModalProvider } from "@/providers/modalProvider";
import React from "react";
import ItemFormModal from "../Items/ItemFormModal";
import ItemInfoModal from "../Items/ItemInfoModal";

const BacklogModalsWrapper = ({
  children,
}: {
  children: React.ReactNode | React.ReactNode[];
}) => {
  return (
    <div>
      <ModalProvider>
        <>{children}</>
        <ItemFormModal />
        <ItemInfoModal />
      </ModalProvider>
    </div>
  );
};

export default BacklogModalsWrapper;
