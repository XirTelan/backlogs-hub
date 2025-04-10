import Title from "@/components/Common/Title";
import ButtonBase from "@/shared/ui/ButtonBase";
import AddItem from "@/components/dnd/AddItem";
import Handle from "@/components/dnd/Handle";
import { UniqueIdentifier } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import React, { useState } from "react";
import { FaFolder } from "react-icons/fa6";
import { MdDeleteForever, MdDragHandle, MdEdit } from "react-icons/md";

type Props = {
  containers: UniqueIdentifier[];
  showActions?: boolean;
  children: React.ReactNode;
  label?: string;
  style?: React.CSSProperties;
  horizontal?: boolean;
  hover?: boolean;
  handle?: boolean;
  handleProps?: React.HTMLAttributes<unknown>;
  scrollable?: boolean;
  onRename: (value: string) => void;
  onRemove: () => void;
  customTitle?: (id: string) => React.ReactNode | React.ReactNode[];
};

const DroppableContainer = <T,>({
  children,
  disabled,
  id,
  items,

  containers,
  style,
  showActions = false,
  handle = true,
  handleProps,
  onRename,
  onRemove,
  customTitle,
  ...props
}: Props & {
  disabled?: boolean;
  id: UniqueIdentifier;
  items: T[];
}) => {
  const {
    attributes,
    isDragging,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transition,
    transform,
  } = useSortable({
    id,
    data: {
      type: "container",
      children: items,
    },
  });
  const [isShow, setIsShow] = useState(false);

  if (isShow)
    return (
      <AddItem
        action={onRename}
        close={() => setIsShow(false)}
        disabled={(value) => {
          return containers.includes(value);
        }}
        defaultValue={id as string}
      />
    );

  return (
    <div
      ref={disabled ? undefined : setNodeRef}
      {...props}
      style={{
        ...style,
        transition,
        transform: CSS.Translate.toString(transform),
        opacity: isDragging ? 0.5 : undefined,
      }}
    >
      <div
        className="flex min-w-40 items-center"
        {...(!handle ? listeners : undefined)}
      >
        <div className="flex items-center">
          {customTitle ? (
            customTitle(String(id))
          ) : (
            <>
              <FaFolder className="mx-2" />
              <Title
                title={String(id)}
                variant={3}
                style={{ whiteSpace: "nowrap" }}
              />
            </>
          )}
        </div>
        {handle && (
          <div className="flex min-h-[2rem] flex-grow bg-transparent">
            <Handle
              style={{
                border: 0,
                padding: 0,
                margin: "0 0 0 16px",
                maxHeight: 100,
                minWidth: 60,
                justifyContent: "center",
                display: "flex",
                flex: "1 0 0",
                background: "rgb(38 38 38 / 0%)",
              }}
              {...handleProps}
              ref={setActivatorNodeRef}
              {...attributes}
              {...listeners}
            >
              <div className="group relative flex h-full w-full grow">
                <div
                  style={{ maxHeight: "20px" }}
                  className="absolute inset-0 m-auto flex h-[1%] w-full grow items-center justify-center bg-layer-1 transition-all duration-500 ease-in-out group-hover:h-full"
                >
                  <div className="opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100">
                    <MdDragHandle size={24} className="self-center" />
                  </div>
                </div>
              </div>
            </Handle>
          </div>
        )}
        {showActions && (
          <>
            <ButtonBase
              size="small"
              variant="ghost"
              style={{
                maxWidth: "40px",
              }}
              onClick={() => setIsShow(true)}
              icon={<MdEdit size={20} />}
            />
            <ButtonBase
              disabled={containers.length <= 1}
              size="small"
              style={{
                maxWidth: "40px",
              }}
              variant="dangerGhost"
              onClick={onRemove}
              icon={<MdDeleteForever size={20} />}
            />
          </>
        )}
      </div>
      <ul className="flex w-full flex-col gap-2">{children}</ul>
    </div>
  );
};
export default DroppableContainer;
