import ButtonBase from "@/components/Common/UI/ButtonBase";
import LinkWithBtnStyle from "@/components/Common/UI/LinkWithBtnStyle";
import SortableItem from "@/components/dnd/SortableItem";
import { routesList } from "@/lib/routesList";
import { SortableItemProps } from "@/types";
import { BacklogDTO } from "@/zodTypes";
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
          <LinkWithBtnStyle
            title="Edit"
            href={`${routesList.backlogEdit}/${backlog._id}`}
            size="small"
            variant="ghost"
            icon={<MdEdit size={20} />}
          ></LinkWithBtnStyle>
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
