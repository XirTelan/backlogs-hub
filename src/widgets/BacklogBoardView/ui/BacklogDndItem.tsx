import BacklogItemActions from "@/widgets/BacklogTableView/ui/BacklogItemActions";
import { ItemInfoModalOpen } from "@/containers/Items/ItemInfoModal";
import { ItemFastRename } from "@/features/itemsFastRename";
import SortableItem from "@/features/dragAndDrop/ui/SortableItem";
import { RenderItemProps } from "@/types";
import { BacklogItemDTO } from "@/zodTypes";

export function BacklogDndItem({
  item,
  isSortingContainer,
  ...rest
}: RenderItemProps<BacklogItemDTO>) {
  return (
    <SortableItem
      key={item._id}
      disabled={isSortingContainer}
      id={item._id}
      title={item.title}
      style={{ minWidth: "240px", border: 0 }}
      {...rest}
      handle={false}
    >
      <div className="flex  h-12 flex-1 cursor-grab items-center bg-layer-1 text-text-primary justify-between  ps-2 text-sm hover:active:cursor-grabbing  ">
        <div onMouseDown={(e) => e.stopPropagation()}>
          <ItemFastRename
            type="button"
            item={item}
            color={"#fff"}
            textProps={{
              tag: "p",
              render: (
                <ItemInfoModalOpen
                  data={item._id}
                  render={(handle) => (
                    <button
                      className="hover:underline "
                      style={{ color: "#fff" }}
                      onClick={handle}
                    >
                      <p className=" text-left text-text-primary ">
                        {item.title}
                      </p>
                    </button>
                  )}
                />
              ),
            }}
          />
        </div>

        <div onMouseDown={(e) => e.preventDefault()}>
          <BacklogItemActions item={item} />
        </div>
      </div>
    </SortableItem>
  );
}
