"use client";

import React, { useContext } from "react";
import { apiRoutesList } from "@/lib/routesList";
import { BacklogItemDTO } from "@/zodTypes";
import { toastCustom } from "@/lib/toast";
import { useSWRConfig } from "swr";
import { BacklogInfoContext } from "@/providers/backlogInfoProvider";
import SidePanel from "@/components/SidePanel";
import ButtonBase from "@/components/Common/UI/ButtonBase";
import { IoMdSwap } from "react-icons/io";

const ItemChangeCategory = ({
  backlogItem,
}: {
  backlogItem: BacklogItemDTO;
}) => {
  const { mutate } = useSWRConfig();

  const { backlog } = useContext(BacklogInfoContext);

  if (!backlog || !backlogItem) return;

  function handleChange(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    const newValue = e.currentTarget.dataset.category;

    if (!newValue) return;

    onSubmit({ ...backlogItem, category: newValue }).then((success) => {
      if (success) {
        toastCustom.success("Category changed");
        mutate(
          (key) =>
            typeof key === "string" && key.startsWith(`${apiRoutesList.items}`),
        );
      }
    });
  }

  async function onSubmit(data: BacklogItemDTO) {
    const url = `${apiRoutesList.items}/${data._id}`;
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    try {
      const res = await fetch(url, options);

      if (!res.ok) {
        const error = await res.json();
        console.error("API error:", error);
        throw new Error(res.statusText || "Failed to submit data.");
      }

      return true;
    } catch (error) {
      console.error("Fetch error:", error);
      throw error;
    }
  }

  const renderTitle = (toggle: () => void, isOpen: boolean) => {
    return (
      <ButtonBase
        onClick={toggle}
        aria-expanded={isOpen}
        text="Move to"
        variant="ghost"
        size="small"
        icon={<IoMdSwap />}
      />
    );
  };

  return (
    <>
      <SidePanel
        direction="side"
        onHover
        position="none"
        icon={undefined}
        renderCustomBtn={renderTitle}
      >
        <ul>
          {backlog.categories.map((category) => {
            if (category.name === backlogItem.category) return;
            return (
              <li key={category.name}>
                <ButtonBase
                  variant="ghost"
                  size="small"
                  text={category.name}
                  data-category={category.name}
                  onClick={handleChange}
                  icon={
                    <div
                      className="h-4 w-4"
                      style={{
                        background: `${category.color}`,
                      }}
                    ></div>
                  }
                  style={{
                    color: "#fff",
                  }}
                >
                  {category.name}
                </ButtonBase>
              </li>
            );
          })}
        </ul>
      </SidePanel>
    </>
  );
};

export default ItemChangeCategory;