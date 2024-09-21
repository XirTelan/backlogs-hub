"use client";
import React, { useCallback, useState } from "react";

import { BacklogDTO } from "@/zodTypes";
import Modal from "@/components/Common/Modal";
import Title from "@/components/Common/Title";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";

import BacklogDndItem from "./BacklogDndItem";
import { DndData } from "@/types";
import { toastCustom } from "@/lib/toast";
import { useSWRConfig } from "swr";
import { apiRoutesList } from "@/lib/routesList";
import DnDMultList from "../DragAndDrop/DndMultiList";
import { UniqueIdentifier } from "@dnd-kit/core";

const BacklogManageDnD = ({
  data,
  view,
}: {
  data: Record<string, { order: number; items: BacklogDTO[] }>;
  view: "full" | "compact" | undefined;
}) => {
  const { mutate } = useSWRConfig();

  const [modalData, setModalData] = useState<
    | {
        isShow: boolean;
        caption: string;
        text: string;
        action: () => void | undefined;
      }
    | undefined
  >();

  const handleBacklogsSave = useCallback(
    async (containers: UniqueIdentifier[], data: DndData<BacklogDTO>) => {
      const dataFormatted: { folders: string[]; backlogs: BacklogDTO[] } = {
        folders: containers as string[],
        backlogs: [],
      };
      Object.entries(data).forEach(([folder, backlogs]) => {
        if (backlogs.length === 0) return;
        backlogs.forEach((backlog, indx) => {
          backlog.folder = folder;
          backlog.order = indx;
          dataFormatted.backlogs.push(backlog);
        });
      });
      try {
        const res = await fetch(`/api/backlogs/`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataFormatted),
        });
        if (res.ok) {
          toastCustom.success("Saved");
          mutate(`${apiRoutesList.backlogs}?type=byFolder`);
        } else {
          toastCustom.error(await res.json());
        }
      } catch (error) {
        console.error(error);
      }
    },
    [mutate],
  );

  const showModal = useCallback(() => {
    if (!modalData) return;
    return (
      <Modal
        showActions
        actionOptions={{
          confirmBtn: {
            clrVariant: "dangerPrimary",
          },
        }}
        setClose={() => {
          setModalData(undefined);
        }}
        action={modalData.action}
      >
        <div className="bg-layer-1 p-4 text-white">
          <Title title={modalData.caption} variant={2} />
          <div className="text-secondary-text">{modalData.text}</div>
        </div>
      </Modal>
    );
  }, [modalData]);

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/backlogs/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        toastCustom.success("Deleted");
        mutate(`${apiRoutesList.backlogs}?type=byFolder`);
      } else toastCustom.error((await res.json()).message);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <DnDMultList<BacklogDTO>
        modifiers={[restrictToVerticalAxis]}
        data={data}
        view={view}
        actions={{
          saveStrategy: "manual",
          handleSave: handleBacklogsSave,
        }}
        renderItem={({ item, isSortingContainer, ...rest }) => {
          return (
            <BacklogDndItem
              disabled={isSortingContainer}
              key={item._id}
              id={item._id}
              title={item.backlogTitle}
              {...rest}
              action={() => {
                setModalData({
                  isShow: true,
                  caption: `Delete backlog "${item.backlogTitle}"`,
                  text: "Are you sure you want to delete the backlog?",
                  action: () => {
                    handleDelete(item._id);
                  },
                });
              }}
            />
          );
        }}
      />
      {modalData?.isShow && showModal()}
    </>
  );
};
export default BacklogManageDnD;
