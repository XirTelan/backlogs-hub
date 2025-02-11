"use client";
import { toastCustom } from "@/lib/toast";
import { BacklogItemDTO } from "@/zodTypes";
import BacklogItemTr from "./BacklogItemTr";
import { useContext, useMemo, useState } from "react";
import Modal from "@/components/Common/Modal";
import Title from "@/components/Common/Title";
import useToggle from "@/hooks/useToggle";
import { useSWRConfig } from "swr";
import { apiRoutesList } from "@/lib/routesList";
import { BacklogInfoContext } from "@/providers/backlogInfoProvider";

const BacklogListData = ({ data, isOwner }: Props) => {
  const { mutate } = useSWRConfig();
  const { isOpen, setOpen, setClose } = useToggle();
  const [itemId, setItemId] = useState<string>("");

  const { backlog } = useContext(BacklogInfoContext);

  const categoriesMap = useMemo(
    () =>
      new Map(
        backlog?.categories.map((category) => [category.name, category.color]),
      ),
    [backlog?.categories],
  );
  const tagsMap = useMemo(() => {
    if (!backlog?.tags) return undefined;
    else return new Map(backlog.tags?.map((tag) => [tag.name, tag.color]));
  }, [backlog?.tags]);

  const onDelete = async () => {
    if (!itemId) return;

    const res = await fetch(`/api/items/${itemId}`, {
      method: "DELETE",
    });
    if (res.ok) {
      toastCustom.success(`Deleted`);
      mutate(
        (key) =>
          typeof key === "string" && key.startsWith(`${apiRoutesList.items}`),
      );
    } else {
      const { message } = await res.json();
      toastCustom.error(message);
    }
  };

  const handleDelete = (id: string) => {
    setItemId(id);
    setOpen();
  };

  return (
    <>
      {data?.map((item: BacklogItemDTO, indx) => {
        let tagsData: { name: string; color: string }[] | undefined;
        if (tagsMap && item.tags) {
          tagsData = item.tags.reduce(
            (arr: { name: string; color: string }[], tag) => {
              if (!tagsMap.has(tag)) return arr;
              arr.push({
                name: tag,
                color: tagsMap.get(tag) ?? "",
              });
              return arr;
            },
            [],
          );
        }

        return (
          <BacklogItemTr
            onDelete={handleDelete}
            showActions={isOwner}
            key={item._id ?? indx}
            item={item}
            tags={tagsData}
            color={categoriesMap.get(item.category) || "#fff"}
          />
        );
      })}
      {isOpen && (
        <Modal
          actionOptions={{
            showActions: true,
            confirmBtn: {
              clrVariant: "dangerPrimary",
            },
          }}
          action={onDelete}
          setClose={setClose}
        >
          <>
            <div className=" bg-layer-1 p-4 text-white ">
              <Title variant={2} title={"Delete"} />
              <div>Are you sure you want to delete this record? </div>
            </div>
          </>
        </Modal>
      )}
    </>
  );
};

export default BacklogListData;

type Props = {
  data: BacklogItemDTO[];
  isOwner: boolean;
};
