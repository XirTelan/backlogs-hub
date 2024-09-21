"use client";
import { BacklogItemDTO } from "@/zodTypes";
import { FaFileLines } from "react-icons/fa6";

import LinkWithBtnStyle from "@/components/Common/UI/LinkWithBtnStyle";
import ItemFastRename from "@/containers/Items/ItemsFastRename";
import BacklogItemActions from "./BacklogItemActions";
import { ItemInfoModalOpen } from "@/containers/Items/ItemInfoModal";

const BacklogItemTr = ({
  item,
  color,
  showActions,
  tags,
  onDelete,
}: BacklogItemTrProps) => {
  return (
    <>
      <tr className=" border-b border-field-2   ">
        <td colSpan={2} className={`px-4`}>
          <div className="flex items-center justify-between">
            <ItemFastRename
              type="button"
              item={item}
              color={color}
              textProps={{
                tag: "p",
                render: (
                  <ItemInfoModalOpen
                    data={item._id}
                    render={(handle) => (
                      <button
                        className="hover:underline "
                        style={{ color: color }}
                        onClick={handle}
                      >
                        <p className=" text-left ">{item.title}</p>
                      </button>
                    )}
                  />
                ),
              }}
            />

            {tags && (
              <div className="flex gap-2 ">
                {tags.length > 0 &&
                  tags.map((tag) => (
                    <div
                      key={tag.name}
                      style={{ color: "#fff", backgroundColor: tag.color }}
                      className="rounded-full px-2"
                    >
                      {tag.name}
                    </div>
                  ))}
              </div>
            )}
          </div>
        </td>
        <td className={`ms-auto flex p-2 `}>
          {showActions ? (
            <BacklogItemActions item={item} onDelete={onDelete} />
          ) : (
            <DetailsButton id={item._id} text={""} />
          )}
        </td>
      </tr>
    </>
  );
};

export default BacklogItemTr;

type BacklogItemTrProps = {
  item: BacklogItemDTO;
  color: string;
  showActions: boolean;
  tags?: {
    name: string;
    color: string;
  }[];
  onDelete: (id: string) => void;
};
const DetailsButton = ({ text, id }: { text: string; id: string }) => {
  return (
    <LinkWithBtnStyle
      title={text}
      href={`/items/${id}`}
      size="small"
      variant="ghost"
      icon={<FaFileLines size={20} />}
    >
      {text}
    </LinkWithBtnStyle>
  );
};
