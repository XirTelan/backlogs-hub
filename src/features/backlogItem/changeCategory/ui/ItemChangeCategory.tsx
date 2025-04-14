"use client";

import React, { useContext } from "react";
import { apiRoutesList } from "@/shared/constants/routesList";
import { toastCustom } from "@/shared/lib/toast";
import { useSWRConfig } from "swr";
import { BacklogInfoContext } from "@/app_fsd/providers/backlogInfoProvider";
import { IoMdSwap } from "react-icons/io";
import { BacklogItemDTO } from "@/shared/model";
import { ButtonBase, SidePanel } from "@/shared/ui";

const ItemChangeCategory = ({
  backlogItem,
  customBtn,
}: {
  backlogItem: BacklogItemDTO;
  customBtn?: (toggle: () => void, isOpen: boolean) => React.JSX.Element;
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
            typeof key === "string" && key.startsWith(`${apiRoutesList.items}`)
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

  return (
    <>
      <SidePanel
        direction="side"
        onHover
        position="none"
        icon={undefined}
        renderCustomBtn={customBtn ?? renderTitle}
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
                />
              </li>
            );
          })}
        </ul>
      </SidePanel>
    </>
  );
};

export default ItemChangeCategory;

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
