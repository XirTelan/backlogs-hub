"use client";
import ButtonBase from "@/components/Common/UI/ButtonBase";
import { BacklogItemDTO } from "@/zodTypes";
import Link from "next/link";
import { MdEdit, MdDeleteForever } from "react-icons/md";
import { FaFileLines } from "react-icons/fa6";
import useSWR from "swr";
import BacklogItem from "@/components/Backlog/BacklogItem";
import { useState } from "react";
import { fetcher } from "@/utils";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";

const BacklogItemTr = ({
  item,
  onDelete,
  color,
  showActions,
}: BacklogItemTrProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const res = useSWR(isOpen ? `/api/items/${item._id}` : null, fetcher);
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
            onClick={() => setIsOpen((prev) => !prev)}
          />
        </td>
        <td className={`px-4`} style={{ color: color }}>
          {item.title}
        </td>
        <td className={`ms-auto flex p-2 `}>
          <Link href={`/items/${item._id}`}>
            <ButtonBase
              title="Details"
              size="small"
              variant="ghost"
              icon={<FaFileLines size={20} />}
            />
          </Link>

          {showActions && (
            <>
              <Link href={`/items/${item._id}/edit`}>
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
                onClick={() => onDelete(item._id)}
              />
            </>
          )}
        </td>
      </tr>
      {isOpen &&
        (res.isLoading ? (
          <tr role="region" className="border-b border-field-2 ">
            <td colSpan={3}>Loading</td>
          </tr>
        ) : (
          <tr role="region" className="border-b border-field-2 ">
            <td></td>
            <td colSpan={2} className="border-t border-field-2 ">
              <div className=" p-4 ">
                <BacklogItem data={res.data.data} />
              </div>
            </td>
          </tr>
        ))}
    </>
  );
};

export default BacklogItemTr;

type BacklogItemTrProps = {
  item: BacklogItemDTO;
  color: string;
  showActions: boolean;
  onDelete: (id: string) => void;
};
