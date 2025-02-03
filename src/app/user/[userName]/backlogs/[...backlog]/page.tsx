import { getCurrentUserInfo } from "@/auth/utils";
import LinkWithBtnStyle from "@/components/Common/UI/LinkWithBtnStyle";
import TopTitle from "@/components/Common/UI/TopTitle";

import Backloglist from "@/containers/Backlogs/BacklogList/BacklogList";
import BacklogModalsWrapper from "@/containers/Backlogs/BacklogModalsWrapper";
import FilterBlock from "@/containers/FilterBlock";
import { routesList } from "@/lib/routesList";
import { BacklogInfoProvider } from "@/providers/backlogInfoProvider";
import { getUserBacklogBySlug } from "@/services/backlogs";
import dynamic from "next/dynamic";
import React from "react";
import { MdEdit } from "react-icons/md";

const Board = dynamic(() => import("@/containers/Backlogs/BacklogBoard"));

export default async function Backlog(props: {
  params: Promise<{ userName: string; backlog: string }>;
}) {
  const { userName, backlog } = await props.params;

  const user = await getCurrentUserInfo();

  const isOwner = user?.username == userName;
  const data = await getUserBacklogBySlug(userName, backlog, isOwner);
  if (!data)
    return <div> ???Backlog doesnt exist or you dont have access </div>;

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
      <main id="maincontent" className="container self-center">
        <BacklogInfoProvider data={data}>
          {data.modifiers.useBoardType ? (
            <BacklogModalsWrapper>
              <Board backlogId={data._id} />
            </BacklogModalsWrapper>
          ) : (
            <>
              <section className="me-auto flex justify-center  rounded-sm px-4 lg:m-0 lg:justify-start">
                <FilterBlock
                  backlogSlug={data.slug}
                  backlogCategories={data.categories}
                />
              </section>
              <BacklogModalsWrapper>
                <section className="me-auto flex flex-col px-4 py-4 lg:m-0">
                  <Backloglist isOwner={isOwner} id={data._id.toString()} />
                </section>
              </BacklogModalsWrapper>
            </>
          )}
        </BacklogInfoProvider>
      </main>
    </div>
  );
}
