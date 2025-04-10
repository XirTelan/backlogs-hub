"use client";
import Divider from "@/shared/ui/Divider";
import ItemFastRename from "@/containers/Items/ItemsFastRename";
import useOutsideClickReg from "@/hooks/useOutsideClickReg";
import useToggle from "@/shared/hooks/useToggle";
import { apiRoutesList } from "@/lib/routesList";
import { toastCustom } from "@/lib/toast";
import { fetcher } from "@/utils";
import { BacklogItemDTO, BacklogItemPopulated } from "@/zodTypes";
import MDEditor from "@uiw/react-md-editor";
import React, { useRef } from "react";
import rehypeSanitize from "rehype-sanitize";
import useSWR from "swr";
import BacklogItemActions from "../../../containers/Backlogs/Views/Default/BacklogItemActions";
import SkeletonBacklogNoteCard from "@/widgets/BacklogsNotesView/ui/SkeletonBacklogNoteCard";
import NotFound from "@/components/Common/NotFound";

type BacklogNoteCardProps = {
  item: BacklogItemDTO;
};

const BacklogNoteCard = ({ item }: BacklogNoteCardProps) => {
  const url = `${apiRoutesList.items}/${item._id}?type=populate`;

  const { isOpen: isEdit, toggle } = useToggle();

  const [value, setValue] = React.useState("");
  const ref = useRef(null);

  useOutsideClickReg(isEdit, ref, handleCloseEditor);

  const { data, isLoading, mutate } = useSWR<{
    status?: "success";
    data: BacklogItemPopulated;
  }>(url, fetcher, {
    onSuccess: ({ data }) => {
      const noteField = data.userFields.find((val) => val.type === "markdown");
      setValue(noteField?.value ?? "");
    },
    revalidateOnFocus: false,
  });

  if (isLoading) return <SkeletonBacklogNoteCard />;

  if (!data?.status) return <NotFound />;

  const handleSubmit = async (data: BacklogItemDTO) => {
    try {
      const res = await fetch(`${apiRoutesList.items}/${item._id}`, {
        method: "PUT",
        body: JSON.stringify(data),
      });
      if (res.ok) {
        toastCustom.success("Saved");
        mutate();
      }
    } catch (error) {
      console.error(error);
    }
  };

  function handleCloseEditor() {
    if (!data) return;

    const noteField = data.data.userFields.find(
      (val) => val.type === "markdown" && val.title === "Note"
    );

    const newItem: BacklogItemDTO = {
      ...data.data,
      userFields: [
        {
          backlogFieldId: noteField?.backlogFieldId ?? "",
          value,
        },
      ],
    };
    toggle();
    if (noteField?.value === value) return;

    handleSubmit(newItem);
  }

  return (
    <div
      className=" bg-layer-1 p-4 min-w-60 max-w-80 w-fit h-fit"
      key={item._id}
    >
      <div className="flex items-center justify-between">
        <div className="flex">
          <ItemFastRename item={item} color={""} />
        </div>
        <BacklogItemActions item={item} />
      </div>
      <Divider />
      {isEdit ? (
        <div ref={ref}>
          <MDEditor
            className="flex-1"
            value={value}
            onChange={(value) => setValue(value ?? "")}
          />
        </div>
      ) : (
        <div
          role="button"
          aria-label="Click to edit note"
          className="relative min-h-10 p-2 bg-bg-main"
          onClick={toggle}
        >
          <MDEditor.Markdown
            rehypePlugins={[rehypeSanitize]}
            className="flex-1"
            source={value}
          />
          {value === "" && (
            <div className="absolute inset-0 flex p-2 w-full place-content-center text-text-secondary">
              Empty Note
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BacklogNoteCard;
