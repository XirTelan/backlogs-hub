import { LinkBase } from "@/shared/ui/LinkBase";
import { routesList } from "@/shared/constants/routesList";
import React from "react";
import { FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { HomeLink } from "@/shared/ui";

export const Footer = () => {
  return (
    <footer className="mt-auto flex justify-center w-full border-t border-zinc-800 bg-white dark:bg-black pt-4 md:pt-8 pb-4">
      <div className="container px-4 md:px-6">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 ">
          <div className="space-y-4">
            <HomeLink />

            <p className="text-sm text-muted-foreground">
              All your backlogs in one place. Organize, manage, and template
              your work.
            </p>
            <div className="flex gap-4">
              <LinkBase isExternal href="https://x.com/XirTelan">
                <FaXTwitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </LinkBase>
              <LinkBase
                isExternal
                href={"https://github.com/XirTelan/backlogs-hub/"}
              >
                <FaGithub className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </LinkBase>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-bold">Resources</h4>
            <ul className="space-y-2 text-sm ">
              <li>
                <LinkBase href={routesList.faq}>Documentation</LinkBase>
              </li>
              <li>
                <LinkBase href={routesList.contacts}>Updates</LinkBase>
              </li>
              <li>
                <LinkBase href={routesList.contacts}>Contacts</LinkBase>
              </li>
            </ul>
          </div>
        </div>
        <div className="my-4 pt-4 border-t border-zinc-800  flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-zinc-500">
            © {new Date().getFullYear()} BacklogsHub. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
