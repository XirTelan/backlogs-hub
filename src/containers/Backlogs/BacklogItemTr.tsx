"use client";
import ButtonBase from "@/components/Common/UI/ButtonBase";
import { BacklogItemDTO } from "@/types";
import Link from "next/link";
import { MdEdit, MdDeleteForever } from "react-icons/md";
import { FaFileLines } from "react-icons/fa6";

const BacklogItemTr = ({
  item,
  actions,
  color,
  showActions,
}: BacklogItemTrProps) => {
  return (
    <tr>
      <td className="p-4" style={{ color: color }}>
        {item.title}
      </td>
      <td className="ms-auto flex p-2 ">
        <ButtonBase
          title="Details"
          size="small"
          variant="ghost"
          icon={<FaFileLines size={20} />}
          onClick={() => actions.showDetails(item._id)}
        />
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
              onClick={() => actions.onDelete(item._id)}
            />
          </>
        )}
      </td>
    </tr>
  );
};

export default BacklogItemTr;

type BacklogItemTrProps = {
  item: BacklogItemDTO;
  color: string;
  showActions: boolean;
  actions: {
    onDelete: (id: string) => void;
    showDetails: (id: string) => void;
  };
};
