import { getCurrentUserInfo } from "@/auth/utils";
import NotFound from "@/components/Common/NotFound";
import LinkWithBtnStyle from "@/components/Common/UI/LinkWithBtnStyle";
import TopTitle from "@/components/Common/UI/TopTitle";

import Backloglist from "@/containers/Backlogs/BacklogList/BacklogList";
import FilterBlock from "@/containers/FilterBlock";
import { routesList } from "@/lib/routesList";
import { getUserBacklogBySlug } from "@/services/backlogs";
import React from "react";
import { MdEdit } from "react-icons/md";

export default async function Backlog({
  params: { userName, backlog },
}: {
  params: { userName: string; backlog: string };
}) {
  const user = await getCurrentUserInfo();
  if (!user || !userName) return <NotFound />;

  const isOwner = user?.username == userName;
  const data = await getUserBacklogBySlug(userName, backlog, isOwner);
  if (!data) return <div> Backlog doesnt exist or you dont have access </div>;

  return (
    <div className="flex flex-col">
      <TopTitle title={data.backlogTitle}>
        <>
          {isOwner && (
            <LinkWithBtnStyle
              href={`${routesList.backlogEdit}/${data._id}`}
              variant="tertiary"
              icon={<MdEdit />}
            >
              Edit backlog
            </LinkWithBtnStyle>
          )}
        </>
      </TopTitle>
      <main className="container self-center  ">
        <section className="me-auto flex justify-center  rounded px-4 py-4 lg:m-0 lg:justify-start">
          <FilterBlock
            backlogSlug={data.slug}
            backlogCategories={data.categories}
          />
        </section>
        <section className="me-auto flex flex-col px-4 py-4 lg:m-0">
          <Backloglist
            isOwner={isOwner}
            backlog={data}
            id={data._id.toString()}
          />
        </section>
      </main>
    </div>
  );
}
