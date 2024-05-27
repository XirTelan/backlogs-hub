"use client";
import React, { useState } from "react";
import Title from "@/components/Common/Title";
import { DndData } from "@/zodTypes";
import DnDMultList from "./DnDMultList";
import Switcher from "@/components/Common/UI/Switcher";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { GrTree } from "react-icons/gr";
import { FaList } from "react-icons/fa";

const ManageWrapper = ({ items }: { items: DndData }) => {
  const [isFullView, setIsFullView] = useState<boolean>(true);

  return (
    <>
      <section>
        <Title title={"Manage"} variant={1} />
      </section>
      <Title
        title={"Backlogs order"}
        variant={2}
        description="You can change the order of backlogs by moving them within their folder or moving them to another using a handler."
      >
        <div className="flex">
          <Switcher
            options={{
              key: "view",
              callback: (value) => {
                setIsFullView(value === "full");
              },
              items: [
                {
                  title: <GrTree />,

                  value: "full",
                },
                {
                  title: <FaList />,
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
