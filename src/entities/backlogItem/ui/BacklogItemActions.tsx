import { Divider } from "@/shared/ui";
import LinkWithBtnStyle from "@/shared/ui/LinkWithBtnStyle";
import SidePanel from "@/shared/ui/SidePanel";
import { ItemDeleteModalOpen } from "@/features/backlogItem/deleteBacklogItem/ui/ItemDeleteModal";
import { BacklogItemDTO } from "@/zodTypes";
import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaFileLines } from "react-icons/fa6";
import { MdEdit } from "react-icons/md";

type BacklogItemActionsProps = {
  item: BacklogItemDTO;
  actionsSlot: React.FC<{ backlogItem: BacklogItemDTO }>;
};

export const BacklogItemActions = ({
  item,
  actionsSlot: ActionsSlot,
}: BacklogItemActionsProps) => {
  return (
    <SidePanel position="none" borders={false} icon={<BsThreeDotsVertical />}>
      <ActionsSlot backlogItem={item} />

      <LinkWithBtnStyle
        title={"Details"}
        href={`/items/${item._id}`}
        size="small"
        variant="ghost"
        icon={<FaFileLines size={20} />}
      >
        {"Details"}
      </LinkWithBtnStyle>
      <>
        <LinkWithBtnStyle
          href={`/items/${item._id}/edit`}
          title="Edit item"
          size="small"
          variant="ghost"
          icon={<MdEdit size={20} />}
        >
          Edit
        </LinkWithBtnStyle>
        <Divider />
        <ItemDeleteModalOpen data={{ id: item._id, title: item.title }} />
      </>
    </SidePanel>
  );
};
