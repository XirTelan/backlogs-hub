import { LinkBase } from "@/shared/ui/LinkBase";
import { routesList } from "@/shared/constants/routesList";
import React from "react";

export const Footer = () => {
  return (
    <footer className="mt-auto flex  w-full justify-center bg-black ">
      <div className="container my-4 ">
        <div className=" flex flex-col p-4 gap-1 *:text-text-on-color *:hover:text-text-on-color">
          <LinkBase size="small" href={routesList.faq}>
            FAQ
          </LinkBase>
          <LinkBase size="small" href={routesList.contacts}>
            Contacts
          </LinkBase>
          <LinkBase size="small" href={routesList.updates}>
            Updates
          </LinkBase>
        </div>
      </div>
    </footer>
  );
};
