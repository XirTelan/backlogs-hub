import * as React from "react";
import { Reorder, useDragControls } from "framer-motion";
import { MdDragIndicator, MdEdit } from "react-icons/md";
import { MdRemove } from "react-icons/md";

import ActionButton from "@/components/ActionButton";
import { BacklogDTO } from "@/zodTypes";
import ButtonBase from "@/components/Common/UI/ButtonBase";
import { MdOutlineDriveFileMove } from "react-icons/md";

interface Props {
  editAction: () => void;
  deleteAction: (id: string) => void;
  item: BacklogDTO;
}

const BacklogDndCard = ({ editAction, deleteAction, item }: Props) => {
  const dragControls = useDragControls();
  return (
    <Reorder.Item
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      value={item}
      id={item._id}
      dragListener={false}
      dragControls={dragControls}
      className=" flex w-full items-center  border border-neutral-700 bg-neutral-800  p-2"
    >
      <MdDragIndicator
        className=" me-2 text-neutral-600 hover:cursor-grab "
        size={24}
        onPointerDown={(e) => {
          e.preventDefault();
          dragControls.start(e);
        }}
      />
      <span>{item.backlogTitle}</span>
      <div className=" ms-auto flex gap-2 ">
        <ButtonBase onClick={() => editAction()} size="small" variant="ghost">
          <MdEdit />
        </ButtonBase>
        <ButtonBase
          onClick={() => editAction()}
          size="small"
          variant="dangerGhost"
        >
          <MdOutlineDriveFileMove />
        </ButtonBase>

        <ActionButton
          title="Delete"
          variant="danger"
          onClick={() => deleteAction(item._id)}
        >
          <MdRemove size={20} />
        </ActionButton>
      </div>
    </Reorder.Item>
  );
};

export default BacklogDndCard;
