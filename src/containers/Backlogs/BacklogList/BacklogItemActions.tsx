import ButtonBase from "@/components/Common/UI/ButtonBase";
import Divider from "@/components/Common/UI/Divider";
import LinkWithBtnStyle from "@/components/Common/UI/LinkWithBtnStyle";
import SidePanel from "@/components/SidePanel";
import { ItemChangeCategoryOpenModal } from "@/containers/Items/ItemChangeCategoryModal";
import { BacklogItemDTO } from "@/zodTypes";
import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaFileLines } from "react-icons/fa6";
import { MdEdit, MdDeleteForever } from "react-icons/md";

const BacklogItemActions = ({
  item,
  onDelete,
}: {
  item: BacklogItemDTO;
  onDelete?: (id: string) => void;
}) => {
  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    const itemId = e.currentTarget.dataset["itemid"];
    if (!itemId) return;
    if (onDelete) onDelete(itemId);
  };

  return (
    <SidePanel position="none" borders={false} icon={<BsThreeDotsVertical />}>

      <ItemChangeCategoryOpenModal
        data={item}
        btnOptions={{ hideText: false }}
      />
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
        <ButtonBase
          title="Delete item"
          text="Delete"
          size="small"
          variant="dangerGhost"
          data-itemid={item._id}
          icon={<MdDeleteForever size={24} />}
          onClick={handleDelete}
        />
      </>
    </SidePanel>
  );
};

export default BacklogItemActions;
