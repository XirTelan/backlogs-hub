import ButtonBase from "@/shared/ui/ButtonBase";
import LinkWithBtnStyle from "@/components/Common/UI/LinkWithBtnStyle";
import SortableItem from "@/features/dragAndDrop/ui/SortableItem";
import { routesList } from "@/shared/lib/routesList";
import { SortableItemProps } from "@/types";
import React from "react";
import { MdEdit, MdDeleteForever } from "react-icons/md";

const BacklogDndItem = ({
  action,
  ...props
}: SortableItemProps & { action: () => void }) => {
  return (
    <>
      <SortableItem {...props}>
        <span className="ms-2">{props.title}</span>
        <div className="ms-auto flex">
          <LinkWithBtnStyle
            title="Edit"
            href={`${routesList.backlogEdit}/${props.id}`}
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
