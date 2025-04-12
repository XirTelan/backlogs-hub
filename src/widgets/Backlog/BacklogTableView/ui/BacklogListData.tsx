"use client";
import { BacklogItemDTO } from "@/zodTypes";
import BacklogItemTr from "./BacklogItemTr";
import { useContext, useMemo } from "react";
import { BacklogInfoContext } from "@/app_fsd/providers/backlogInfoProvider";

const BacklogListData = ({ data, isOwner }: Props) => {
  const { backlog } = useContext(BacklogInfoContext);

  const categoriesMap = useMemo(
    () =>
      new Map(
        backlog?.categories.map((category) => [category.name, category.color])
      ),
    [backlog?.categories]
  );
  const tagsMap = useMemo(() => {
    if (!backlog?.tags) return undefined;
    else return new Map(backlog.tags?.map((tag) => [tag.name, tag.color]));
  }, [backlog?.tags]);

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
            []
          );
        }

        return (
          <BacklogItemTr
            showActions={isOwner}
            key={item._id ?? indx}
            item={item}
            tags={tagsData}
            color={categoriesMap.get(item.category) || "#fff"}
          />
        );
      })}
    </>
  );
};

export default BacklogListData;

type Props = {
  data: BacklogItemDTO[];
  isOwner: boolean;
};
