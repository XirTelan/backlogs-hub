"use client";
import { FaFileLines } from "react-icons/fa6";

import { LinkWithBtnStyle } from "@/shared/ui";
import { ItemInfoModalOpen } from "@/widgets/backlogItem/ItemInfoModal/ui/ItemInfoModal";
import { useSession } from "@/app_fsd/providers/sessionProvider";
import { ItemFastRename } from "@/features/backlogItem/itemsFastRename";
import { BacklogItemDTO } from "@/shared/model/";
import ItemChangeCategory from "@/features/backlogItem/changeCategory/ui/ItemChangeCategory";
import { BacklogItemActions } from "@/features/backlogItem/showActions";

const BacklogItemTr = ({
  item,
  color,
  showActions,
  tags,
}: BacklogItemTrProps) => {
  const { user } = useSession();
  const categoryDesignation = user?.config?.categoryDesignation ?? "color";

  const renderHandle = (handle: () => void) => (
    <button
      className="hover:underline"
      style={{
        color: categoryDesignation === "color" ? color : "#F4F4F4",
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
  );

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
                  <ItemInfoModalOpen data={item._id} render={renderHandle} />
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
            <BacklogItemActions item={item} actionsSlot={ItemChangeCategory} />
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
