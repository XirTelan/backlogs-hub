import { ModalProvider } from "@/app_fsd/providers/modalProvider";
import { ItemDeleteModal } from "@/entities/backlog";
import { ItemFormModal } from "@/features/backlogItem/createBacklogItem";
import { ItemInfoModal } from "@/widgets/backlogItem/ItemInfoModal";
import React from "react";

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
