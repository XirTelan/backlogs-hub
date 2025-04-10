import Title from "@/components/Common/Title";
import { ItemFormModalOpen } from "@/containers/Items/ItemFormModal";

export function ContainerTitle({ id }: { id: string }) {
  return (
    <div className=" group mb-2 flex w-60 flex-1 justify-between border-b border-border-subtle-1 pb-2   hover:cursor-grab">
      <Title title={id} variant={3} />
      <div
        onMouseDown={(e) => e.stopPropagation()}
        onClick={(e) => e.stopPropagation()}
        className="opacity-0 group-hover:opacity-100 "
      >
        <ItemFormModalOpen
          btnOptions={{
            variant: "secondary",
            hideText: true,
            title: "Create item",
          }}
        />
      </div>
    </div>
  );
}
