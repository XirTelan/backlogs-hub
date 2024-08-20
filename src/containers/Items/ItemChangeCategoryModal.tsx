"use client";
import Title from "@/components/Common/Title";
import LoadingAnimation from "@/components/Common/UI/Loading/Loading";
import { createModal } from "@/lib/createModal";
import React, { Suspense, useContext, useState } from "react";
import Select from "@/components/Common/UI/Select";
import { apiRoutesList } from "@/lib/routesList";
import { BacklogDTO, BacklogItemDTO } from "@/zodTypes";
import { ModalContext } from "@/providers/modalProvider";
import { toastCustom } from "@/lib/toast";
import { IoMdSwap } from "react-icons/io";

const ModalProvider = createModal(ModalContext, "itemChangeCategory", {
  openerButtton: {
    hideText: true,
    text: "Move to",
    variant: "ghost",
    size: "small",
    icon: <IoMdSwap />,
  },
  closeButton: {
    text: "Cancel",
    variant: "secondary",
  },
});

export const ItemChangeCategoryOpenModal = ModalProvider.Opener;

const ItemChangeCategoryModal = ({
  categories,
}: {
  categories: BacklogDTO["categories"];
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const cntx = useContext(ModalContext);
  const backlogItem: BacklogItemDTO = cntx.data as BacklogItemDTO;
  if (!backlogItem) return;

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setIsLoading(true);
    onSubmit({ ...backlogItem, category: e.currentTarget.value })
      .then((success) => {
        if (success) {
          cntx.setClose();
          toastCustom.success("Category changed");
        }
      })
      .finally(() => setIsLoading(false));
  };

  const onSubmit = async (data: BacklogItemDTO) => {
    const url = `${apiRoutesList.items}/${data._id}`;
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    try {
      const res = await fetch(url, options);

      if (!res.ok) {
        const error = await res.json();
        console.error("API error:", error);
        throw new Error(res.statusText || "Failed to submit data.");
      }

      return true;
    } catch (error) {
      console.error("Fetch error:", error);
      throw error;
    }
  };

  return (
    <>
      <ModalProvider.WithModal>
        {isLoading ? (
          <LoadingAnimation />
        ) : (
          <>
            <Suspense fallback={<LoadingAnimation />}>
              <div className=" bg-background p-4 text-primary-text ">
                <Title
                  variant={2}
                  title={`Change category for "${backlogItem.title}"`}
                />
                <Select
                  defaultValue={0}
                  value={backlogItem.category}
                  onChange={handleChange}
                  options={categories.map((category) => category.name)}
                />
              </div>
            </Suspense>
            <ModalProvider.CloseModal />
          </>
        )}
      </ModalProvider.WithModal>
    </>
  );
};

export default ItemChangeCategoryModal;
