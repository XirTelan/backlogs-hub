"use client";
import React from "react";
import PanelItem from "./PanelItem";
import { usePathname } from "next/navigation";

const PanelItemsWrapper = ({
  baseUrl,
  data,
  samePage = false,
}: {
  baseUrl: string;
  data: {
    id: string;
    content: React.ReactNode;
  }[];
  samePage?: boolean;
}) => {
  const pathname = usePathname();
  const active = pathname.split("/").at(-1);
  return (
    <>
      {data.map((item) => {
        return (
          <PanelItem
            key={item.id}
            href={`${baseUrl}${samePage ? "#" : "/"}${item.id}`}
            active={active === item.id}
          >
            {item.content}
          </PanelItem>
        );
      })}
    </>
  );
};

export default PanelItemsWrapper;
