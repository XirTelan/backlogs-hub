import { ModalProvider } from "@/app_fsd/providers/modalProvider";
import React from "react";
import ItemFormModal from "../../features/backlogItem/createBacklogItem/ui/ItemFormModal";
import ItemInfoModal from "../../widgets/backlogItem/ItemInfoModal/ui/ItemInfoModal";
import ItemDeleteModal from "../../features/backlogItem/deleteBacklogItem/ui/ItemDeleteModal";

const BacklogModalsProvider = ({
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

export default BacklogModalsProvider;
