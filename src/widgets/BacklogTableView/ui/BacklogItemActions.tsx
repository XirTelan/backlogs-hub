import { Divider } from "@/shared/ui";
import LinkWithBtnStyle from "@/components/Common/UI/LinkWithBtnStyle";
import SidePanel from "@/components/SidePanel";
import ItemChangeCategory from "@/containers/Items/ItemChangeCategory";
import { ItemDeleteModalOpen } from "@/containers/Items/ItemDeleteModal";
import { BacklogItemDTO } from "@/zodTypes";
import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaFileLines } from "react-icons/fa6";
import { MdEdit } from "react-icons/md";

const BacklogItemActions = ({ item }: { item: BacklogItemDTO }) => {
  return (
    <SidePanel position="none" borders={false} icon={<BsThreeDotsVertical />}>
      <ItemChangeCategory backlogItem={item} />

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

export default BacklogItemActions;
