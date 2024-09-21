import { getCurrentUserInfo } from "@/auth/utils";
import LinkWithBtnStyle from "@/components/Common/UI/LinkWithBtnStyle";
import TopTitle from "@/components/Common/UI/TopTitle";

import Backloglist from "@/containers/Backlogs/BacklogList/BacklogList";
import FilterBlock from "@/containers/FilterBlock";
import ItemChangeCategoryModal from "@/containers/Items/ItemChangeCategoryModal";
import ItemFormModal from "@/containers/Items/ItemFormModal";
import ItemInfoModal from "@/containers/Items/ItemInfoModal";
import { routesList } from "@/lib/routesList";
import { ModalProvider } from "@/providers/modalProvider";
import { getUserBacklogBySlug } from "@/services/backlogs";
import dynamic from "next/dynamic";
import React from "react";
import { MdEdit } from "react-icons/md";

const Board = dynamic(() => import("@/containers/Backlogs/BacklogBoard"));

export default async function Backlog({
  params: { userName, backlog },
}: {
  params: { userName: string; backlog: string };
}) {
  const user = await getCurrentUserInfo();

  const isOwner = user?.username == userName;
  const data = await getUserBacklogBySlug(userName, backlog, isOwner);
  if (!data)
    return <div> ???Backlog doesnt exist or you dont have access </div>;

  return (
    <div className="flex flex-col">
      <ModalProvider>
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
        <main className="container self-center">
          {data.modifiers.useBoardType ? (
            <Board backlogId={data._id} />
          ) : (
            <>
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
            </>
          )}
        </main>
        <ItemFormModal backlog={data} />
        <ItemInfoModal />
        <ItemChangeCategoryModal categories={data.categories} />
      </ModalProvider>
    </div>
  );
}
