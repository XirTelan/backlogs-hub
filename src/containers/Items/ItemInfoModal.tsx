"use client";
import { createModal } from "@/lib/createModal";
import React, { useContext } from "react";
import { IoAdd } from "react-icons/io5";
import LoadingAnimation from "@/components/Common/UI/Loading/Loading";
import { ModalContext } from "@/providers/modalProvider";
import BacklogItem from "@/components/Backlog/BacklogItem";
import ItemFastRename from "./ItemsFastRename";
import { apiRoutesList } from "@/lib/routesList";
import { fetcher } from "@/utils";
import useSWR from "swr";
import ButtonBase from "@/components/Common/UI/ButtonBase";
import { MdClose } from "react-icons/md";

const ModalProvider = createModal(ModalContext, "ItemInfo", {
  openerButtton: {
    hideText: true,
    text: "Add item",
    icon: <IoAdd />,
  },
});

export const ItemInfoModalOpen = ModalProvider.Opener;

const ItemInfoModal = () => {
  const cntx = useContext(ModalContext);
  const url = `${apiRoutesList.items}/${cntx.data}`;
  const { data, isLoading } = useSWR(cntx.data ? url : null, fetcher);

  return (
    <>
      <ModalProvider.WithModal>
        <div className="relative  min-h-40  min-w-[90vw] bg-background p-4 text-primary-text ">
          {isLoading ? (
            <div className="absolute inset-0 m-auto flex items-center justify-center">
              <LoadingAnimation />
            </div>
          ) : (
            data?.status === "success" && (
              <>
                <div className="flex justify-between">
                  <ItemFastRename
                    textProps={{
                      tag: "h2",
                      className:
                        "w-full text-2xl font-bold mb-2 hover:bg-layer-1 p-2",
                    }}
                    inputProps={{
                      variant: "large",
                    }}
                    item={data.data}
                    color={""}
                  />
                  <ButtonBase
                    variant="ghost"
                    size="medium"
                    icon={<MdClose />}
                    onClick={cntx.setClose}
                    style={{
                      width: "auto",
                    }}
                  />
                </div>
                <div className="p-2">
                  <BacklogItem data={data.data} />
                </div>
              </>
            )
          )}
        </div>
      </ModalProvider.WithModal>
    </>
  );
};

export default ItemInfoModal;
