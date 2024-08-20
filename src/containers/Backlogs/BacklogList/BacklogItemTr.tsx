"use client";
import ButtonBase from "@/components/Common/UI/ButtonBase";
import { BacklogDTO, BacklogItemDTO } from "@/zodTypes";
import { MdDeleteForever, MdEdit } from "react-icons/md";
import { FaFileLines } from "react-icons/fa6";
import useSWR from "swr";
import BacklogItem from "@/components/Backlog/BacklogItem";
import { fetcher } from "@/utils";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import LoadingAnimation from "@/components/Common/UI/Loading/Loading";
import LinkWithBtnStyle from "@/components/Common/UI/LinkWithBtnStyle";
import { BsThreeDotsVertical } from "react-icons/bs";
import SidePanel from "@/components/SidePanel";
import { ItemChangeCategoryOpenModal } from "@/containers/Items/ItemChangeCategoryModal";
import useToggle from "@/hooks/useToggle";

const BacklogItemTr = ({
  item,
  onDelete,
  color,
  showActions,
}: BacklogItemTrProps) => {
  const { isOpen, toggle } = useToggle(false);
  const res = useSWR(isOpen ? `/api/items/${item._id}` : null, fetcher);

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    const itemId = e.currentTarget.dataset["itemid"];
    if (!itemId) return;
    onDelete(itemId);
  };

  return (
    <>
      <tr
        aria-expanded={isOpen}
        className={`${!isOpen && "border-b border-field-2 "}`}
      >
        <td className={`  ps-2 ${isOpen ? "[&_div]:m-auto " : ``}`}>
          <ButtonBase
            size="medium"
            variant="ghost"
            icon={
              isOpen ? <IoIosArrowUp size={24} /> : <IoIosArrowDown size={24} />
            }
            onClick={toggle}
          />
        </td>
        <td className={`px-4`} style={{ color: color }}>
          {item.title}
        </td>
        <td className={`ms-auto flex p-2 `}>
          <SidePanel
            position="none"
            borders={false}
            icon={<BsThreeDotsVertical />}
          >
            <ItemChangeCategoryOpenModal data={item} />
            <LinkWithBtnStyle
              title="Details"
              href={`/items/${item._id}`}
              size="small"
              variant="ghost"
              icon={<FaFileLines size={20} />}
            >
              Details{" "}
            </LinkWithBtnStyle>

            {showActions && (
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
            )}
          </SidePanel>
        </td>
      </tr>
      {isOpen && (
        <tr role="region" className="border-b border-field-2 ">
          {res.isLoading ? (
            <td colSpan={3}>
              <LoadingAnimation />
            </td>
          ) : (
            <>
              <td></td>
              <td colSpan={2} className="border-t border-field-2 ">
                <div className=" p-4 ">
                  <BacklogItem data={res.data.data} />
                </div>
              </td>
            </>
          )}
        </tr>
      )}
    </>
  );
};

export default BacklogItemTr;

type BacklogItemTrProps = {
  item: BacklogItemDTO;
  color: string;
  showActions: boolean;
  categories: BacklogDTO["categories"];
  onDelete: (id: string) => void;
};
