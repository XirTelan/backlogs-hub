import ButtonBase from "@/components/Common/UI/ButtonBase";
import SortableItem from "@/components/dnd/SortableItem";
import { SortableItemProps } from "@/types";
import { BacklogDTO } from "@/zodTypes";
import Link from "next/link";
import React from "react";
import { MdEdit, MdDeleteForever } from "react-icons/md";

const BacklogDndItem = ({
  backlog,
  action,
  ...props
}: SortableItemProps & { backlog: BacklogDTO; action: () => void }) => {
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
            onClick={action}
          />
        </div>
      </SortableItem>
    </>
  );
};

export default BacklogDndItem;
