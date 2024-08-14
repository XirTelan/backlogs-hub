import { getCurrentUserInfo } from "@/auth/utils";
import SkeletonDataTable from "@/components/Common/Skeleton/SkeletonDataTable";
import LinkWithBtnStyle from "@/components/Common/UI/LinkWithBtnStyle";
import TopTitle from "@/components/Common/UI/TopTitle";

import Backloglist from "@/containers/Backlogs/BacklogList/BacklogList";
import FilterBlock from "@/containers/FilterBlock";
import { routesList } from "@/lib/routesList";
import { getUserBacklogBySlug } from "@/services/backlogs";
import React, { Suspense } from "react";
import { MdEdit } from "react-icons/md";

export default async function Backlog({
  params: { userName, backlog },
  searchParams,
}: {
  params: { userName: string; backlog: string };
  searchParams: { categories: string | undefined; search: string | undefined };
}) {
  const user = await getCurrentUserInfo();
  const isOwner = user?.username == userName;
  const data = await getUserBacklogBySlug(userName, backlog, isOwner);
  if (!data) return <div> Backlog doesnt exist or you dont have access </div>;

  const selectedCategories = searchParams.categories?.split("-") || [];
  const search = searchParams.search ?? "";

  const categoriesMap = new Map(
    data.categories.map((category) => [category.name, category.color]),
  );

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
      <main className="container h-screen-bh self-center ">
        <section className="me-auto flex justify-center  rounded px-4 py-4 lg:m-0 lg:justify-start">
          <FilterBlock
            backlogSlug={data.slug}
            backlogCategories={data.categories}
          />
        </section>
        <section className="me-auto flex flex-col px-4 py-4 lg:m-0">
          <Suspense fallback={<SkeletonDataTable />}>
            <Backloglist
              isOwner={isOwner}
              search={search}
              selectedCategories={selectedCategories}
              backlogSlug={data.slug}
              categoriesMap={categoriesMap}
              id={data._id.toString()}
            />
          </Suspense>
        </section>
      </main>
    </div>
  );
}
