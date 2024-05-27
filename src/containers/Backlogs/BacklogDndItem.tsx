import ButtonBase from "@/components/Common/UI/ButtonBase";
import AddItem from "@/components/dnd/AddItem";
import SortableItem from "@/components/dnd/SortableItem";
import { SortableItemProps } from "@/types";
import { BacklogDTO } from "@/zodTypes";
import Link from "next/link";
import React, { useState } from "react";
import { MdEdit, MdDeleteForever } from "react-icons/md";

const BacklogDndItem = ({
  backlog,
  ...props
}: SortableItemProps & { backlog: BacklogDTO }) => {

  return (
    <>
      <SortableItem {...props}>
        <div className=" ms-auto flex ">
          <Link href={`/backlog/edit/${backlog._id}`}>
            <ButtonBase
              size="small"
              variant="ghost"
              icon={<MdEdit size={20} />}
            />
          </Link>
          <ButtonBase
            title="Delete"
            size="small"
            variant="dangerGhost"
            icon={<MdDeleteForever size={20} />}
            onClick={() => {
              setIsShowModal({
                isShow: true,
                caption: `Delete backlog "${backlog.backlogTitle}"`,
                text: "Are you sure you want to delete the backlog?",
                action: () => {
                  console.log("Hey");
                },
              });
              // console.log(isShowModal);
            }}
          ></ButtonBase>
        </div>
      </SortableItem>
    </>
  );
};

export default BacklogDndItem;
