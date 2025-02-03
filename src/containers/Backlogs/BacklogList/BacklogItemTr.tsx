"use client";
import { BacklogItemDTO } from "@/zodTypes";
import { FaFileLines } from "react-icons/fa6";

import LinkWithBtnStyle from "@/components/Common/UI/LinkWithBtnStyle";
import ItemFastRename from "@/containers/Items/ItemsFastRename";
import BacklogItemActions from "./BacklogItemActions";
import { ItemInfoModalOpen } from "@/containers/Items/ItemInfoModal";
import { useSession } from "@/providers/sessionProvider";

const BacklogItemTr = ({
  item,
  color,
  showActions,
  tags,
  onDelete,
}: BacklogItemTrProps) => {
  const { user } = useSession();
  const categoryDesignation = user?.config?.categoryDesignation ?? "color";

  return (
    <>
      <tr className=" border-b border-border-subtle-2   ">
        <td className={`px-4`}>
          <div className="relative flex items-center justify-between">
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
                        style={{
                          color:
                            categoryDesignation === "color" ? color : "#F4F4F4",
                        }}
                        onClick={handle}
                      >
                        <p className=" text-left">
                          <span>{item.title}</span>

                          {categoryDesignation === "explicit" && (
                            <span className=" ms-2 text-text-secondary ">
                              {`| ${item.category}`}
                            </span>
                          )}
                        </p>
                      </button>
                    )}
                  />
                ),
              }}
            />
            {categoryDesignation === "colorMark" && (
              <div
                className="absolute -left-2 h-full w-1"
                style={{ background: `${color}` }}
              ></div>
            )}

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
