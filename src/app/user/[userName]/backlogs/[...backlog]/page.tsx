import { getCurrentUserInfo } from "@/entities/auth/utils/utils";
import { LinkWithBtnStyle } from "@/shared/ui";

import BacklogModalsProvider from "@/app_fsd/providers/BacklogModalsProvider";
import FilterBlock from "@/features/backlogItem/filter/ui/FilterBlock";
import { routesList } from "@/shared/constants/routesList";
import { BacklogInfoProvider } from "@/app_fsd/providers/backlogInfoProvider";
import { getUserBacklogBySlug } from "@/shared/api/backlogs";
import dynamic from "next/dynamic";
import React from "react";
import { MdEdit } from "react-icons/md";
import { BacklogNotesView } from "@/widgets/backlog/BacklogsNotesView";
import { TopTitle } from "@/shared/ui";
import { BacklogDefaultView } from "@/widgets/backlog/BacklogTableView";

const BoardView = dynamic(() =>
  import("@/widgets/backlog/BacklogBoardView/ui/BacklogBoard").then(
    (mod) => mod.BacklogBoard
  )
);

export default async function Backlog(props: {
  params: Promise<{ userName: string; backlog: string }>;
}) {
  const { userName, backlog } = await props.params;

  const user = await getCurrentUserInfo();

  const isOwner = user?.username == userName;
  const data = await getUserBacklogBySlug(userName, backlog, isOwner);
  if (!data)
    return <div> ???Backlog doesnt exist or you dont have access </div>;

  function renderBacklogView() {
    if (!data) return;
    switch (data.view) {
      case "Board":
        return (
          <BacklogModalsProvider>
            <BoardView backlogId={data._id} />
          </BacklogModalsProvider>
        );
      case "Notes":
        return (
          <>
            <section className="me-auto flex justify-center  rounded-sm px-4 lg:m-0 lg:justify-start">
              <FilterBlock
                backlogSlug={data.slug}
                backlogCategories={data.categories}
              />
            </section>
            <BacklogModalsProvider>
              <section className="me-auto flex flex-col px-4 py-4 lg:m-0">
                <BacklogNotesView backlogId={data._id} />
              </section>
            </BacklogModalsProvider>
          </>
        );
      case "Default":
      default:
        return (
          <>
            <section className="me-auto flex justify-center  rounded-sm px-4 lg:m-0 lg:justify-start">
              <FilterBlock
                backlogSlug={data.slug}
                backlogCategories={data.categories}
              />
            </section>
            <BacklogModalsProvider>
              <section className="me-auto flex flex-col px-4 py-4 lg:m-0">
                <BacklogDefaultView
                  isOwner={isOwner}
                  id={data._id.toString()}
                />
              </section>
            </BacklogModalsProvider>
          </>
        );
    }
  }

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
          {renderBacklogView()}
        </BacklogInfoProvider>
      </main>
    </div>
  );
}
