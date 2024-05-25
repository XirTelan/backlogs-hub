"use client";
import React, { useCallback, useState } from "react";
import Title from "@/components/Common/Title";
import ButtonBase from "@/components/Common/UI/ButtonBase";
import { BacklogDTO, DndData } from "@/zodTypes";
import DnDList from "./DnDList";
import DnDMultList from "./DnDMultList";
import InputField from "@/components/Common/UI/InputField";
import { MdCheck, MdClose } from "react-icons/md";
import toast from "react-hot-toast";
import Switcher from "@/components/Common/UI/Switcher";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";

const ManageWrapper = ({
  items,
  userName,
}: {
  items: DndData;
  userName: string;
}) => {
  const [isFullView, setIsFullView] = useState<boolean>(true);

  const handleBacklogsSave = useCallback(
    async (data: { [key: string]: BacklogDTO[] }) => {
      const dataFormatted: BacklogDTO[] = [];
      Object.entries(data).forEach(([folder, backlogs]) => {
        if (backlogs.length === 0) return;
        backlogs.forEach((backlog, indx) => {
          backlog.folder = folder;
          backlog.order = indx;
          dataFormatted.push(backlog);
        });
      });
      try {
        const res = await fetch(`/api/backlogs/`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataFormatted),
        });
        if (res.ok) {
          toast.success("Saved");
        }
      } catch (error) {
        console.error(error);
      }
    },
    [],
  );

  return (
    <>
      <section>
        <Title
          title={"Backlogs order"}
          variant={2}
          description="You can change the order of backlogs by moving them within their folder or moving them to another using a handler."
        >
          <div className="flex">
            <ButtonBase
              text="Save changes"
              onClick={(e) => {
                e.preventDefault();
                console.log("?");
                handleBacklogsSave(items);
              }}
            />
          </div>
        </Title>

      </section>
      <Title title={"Manage"} variant={1}>
        <div className="flex">
          <Switcher
            options={{
              key: "view",
              callback: (value) => {
                setIsFullView(value === "full");
              },
              items: [
                {
                  title: "1",
                  value: "full",
                },
                {
                  title: "2",
                  value: "compact",
                },
              ],
            }}
          />
        </div>
      </Title>

      <DnDMultList
        modifiers={[restrictToVerticalAxis]}
        view={isFullView ? "full" : "compact"}
        data={items}
      />
    </>
  );
};

export default ManageWrapper;
