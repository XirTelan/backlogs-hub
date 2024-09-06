import { getCurrentUserInfo } from "@/auth/utils";
import NotFound from "@/components/Common/NotFound";
import LinkWithBtnStyle from "@/components/Common/UI/LinkWithBtnStyle";
import TopTitle from "@/components/Common/UI/TopTitle";

import Backloglist from "@/containers/Backlogs/BacklogList/BacklogList";
import BoardDndList from "@/containers/Backlogs/BoardDndList";
import FilterBlock from "@/containers/FilterBlock";
import ItemChangeCategoryModal from "@/containers/Items/ItemChangeCategoryModal";
import ItemFormModal from "@/containers/Items/ItemFormModal";
import { apiRoutesList, routesList } from "@/lib/routesList";
import { ModalProvider } from "@/providers/modalProvider";
import { getUserBacklogBySlug } from "@/services/backlogs";
import { BacklogItemDTO } from "@/zodTypes";
import { cookies } from "next/headers";
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

  const resp = await fetch(
    `${process.env.DOMAIN_URL}/${apiRoutesList.items}?backlog=${data._id}`,
    { headers: { Cookie: cookies().toString() } },
  );
  if (!resp) return <div> Backlog doesnt exist or you dont have access </div>;
  const items: BacklogItemDTO[] = await resp.json();

  const groupedByCategory = JSON.parse(
    JSON.stringify(Object.groupBy(items, (item) => item.category)),
  );

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
          {false && <BoardDndList data={groupedByCategory} />}
        </main>
        <ItemFormModal backlog={data} />
        <ItemChangeCategoryModal categories={data.categories} />
      </ModalProvider>
    </div>
  );
}
