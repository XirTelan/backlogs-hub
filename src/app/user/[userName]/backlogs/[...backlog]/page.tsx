import { getCurrentUserInfo } from "@/features/auth/utils";
import LinkWithBtnStyle from "@/components/Common/UI/LinkWithBtnStyle";
import TopTitle from "@/components/Common/UI/TopTitle";

import BacklogDefaultView from "@/widgets/BacklogTableView/BacklogDefaultView";
import BacklogModalsWrapper from "@/containers/Backlogs/BacklogModalsWrapper";
import FilterBlock from "@/containers/FilterBlock";
import { routesList } from "@/lib/routesList";
import { BacklogInfoProvider } from "@/providers/backlogInfoProvider";
import { getUserBacklogBySlug } from "@/services/backlogs";
import dynamic from "next/dynamic";
import React from "react";
import { MdEdit } from "react-icons/md";
import BacklogNotesView from "@/widgets/BacklogsNotesView/ui/BacklogNotesView";

const BoardView = dynamic(
  () => import("@/widgets/BacklogBoardView/BacklogBoard")
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
          <BacklogModalsWrapper>
            <BoardView backlogId={data._id} />
          </BacklogModalsWrapper>
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
            <BacklogModalsWrapper>
              <section className="me-auto flex flex-col px-4 py-4 lg:m-0">
                <BacklogNotesView backlogId={data._id} />
              </section>
            </BacklogModalsWrapper>
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
            <BacklogModalsWrapper>
              <section className="me-auto flex flex-col px-4 py-4 lg:m-0">
                <BacklogDefaultView
                  isOwner={isOwner}
                  id={data._id.toString()}
                />
              </section>
            </BacklogModalsWrapper>
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
