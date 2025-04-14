"use client";
import { createModal } from "@/shared/lib/createModal";
import React, { useContext } from "react";
import { IoAdd } from "react-icons/io5";
import { ModalContext } from "@/app_fsd/providers/modalProvider";
import { apiRoutesList } from "@/shared/constants/routesList";
import { fetcher } from "@/shared/lib/utils";
import useSWR from "swr";
import { MdClose } from "react-icons/md";
import { BacklogInfoContext } from "@/app_fsd/providers/backlogInfoProvider";
import { IoMdSwap } from "react-icons/io";
import { useToggle } from "@/shared/hooks";
import { EditItemForm } from "@/features/backlogItem/editItem";
import { ItemFastRename } from "@/features/backlogItem/itemsFastRename";
import { LoadingAnimation, ButtonBase, Title } from "@/shared/ui";
import {
  BacklogItemPopulated,
  BacklogItemWithSteamInfo,
} from "@/shared/model/";
import ItemChangeCategory from "@/features/backlogItem/changeCategory/ui/ItemChangeCategory";
import { BacklogItem } from "@/entities/backlogItem";

const KEY = "ItemInfo";

const ModalProvider = createModal(ModalContext, KEY, {
  openerButtton: {
    hideText: true,
    text: "Add item",
    icon: <IoAdd />,
  },
});

export const ItemInfoModalOpen = ModalProvider.Opener;

const Wrapper = ({
  children,
}: {
  children: React.ReactNode | React.ReactNode[];
}) => {
  return (
    <ModalProvider.WithModal>
      <div className="container relative min-h-40  bg-bg-main p-4 text-text-primary md:min-w-[640px] lg:min-w-[768px] xl:min-w-[1024px] ">
        {children}
      </div>
    </ModalProvider.WithModal>
  );
};

export const ItemInfoModal = () => {
  const cntx = useContext(ModalContext);
  const { backlog } = useContext(BacklogInfoContext);
  const { isOpen: isEdit, setClose, setOpen } = useToggle(false);
  const url = `${apiRoutesList.items}/${cntx.data}?type=populate`;
  const { data, isLoading } = useSWR<{
    status?: "success";
    data: BacklogItemPopulated | BacklogItemWithSteamInfo;
  }>(cntx.key === KEY && cntx.isOpen && cntx.data ? url : null, fetcher);

  if (!backlog) return;
  if (isLoading)
    return (
      <Wrapper>
        <div className="absolute inset-0 m-auto flex items-center justify-center">
          <LoadingAnimation />
        </div>
      </Wrapper>
    );

  if (!data || !data.status) return;
  //[TODO: Refactor. Edit form into separate thing. Compose on page layer]
  return (
    <>
      <Wrapper>
        <div className="flex h-12 items-center justify-between">
          <ItemFastRename
            textProps={{
              tag: "h2",
              className: "w-full text-3xl font-bold hover:bg-layer-1 p-2",
            }}
            inputProps={{
              variant: "large",
            }}
            item={data.data}
            color={""}
          />
          <div className="flex items-center">
            <ButtonBase
              variant="secondary"
              icon={<MdClose />}
              onClick={cntx.setClose}
              style={{
                width: "auto",
              }}
            />
          </div>
        </div>
        <div className=" my-2 flex  items-center  gap-2">
          <div>Category:</div>

          <div className=" text-text-secondary">
            <ItemChangeCategory
              backlogItem={data.data}
              customBtn={(toggle: () => void, isOpen: boolean) => {
                return (
                  <ButtonBase
                    onClick={toggle}
                    aria-expanded={isOpen}
                    text={`${data.data.category}`}
                    variant="ghost"
                    size="small"
                    icon={<IoMdSwap />}
                  />
                );
              }}
            />
          </div>
        </div>
        {(backlog?.fields?.length ?? 0) > 0 && (
          <div className="mt-2">
            {!isEdit && (
              <div className="flex justify-between">
                <Title variant={3} title={"Fields"} />
                <div className="w-1/5 ">
                  <ButtonBase
                    size="small"
                    variant="secondary"
                    text="Edit"
                    onClick={setOpen}
                  />
                </div>
              </div>
            )}

            {isEdit ? (
              <EditItemForm
                backlogInfo={backlog}
                itemId={data.data._id}
                options={{ btnCancel: setClose }}
              />
            ) : (
              <BacklogItem hideCategory data={data.data} />
            )}
          </div>
        )}
      </Wrapper>
    </>
  );
};
