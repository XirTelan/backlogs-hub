import { getCurrentUserInfo } from "@/auth/utils";
import SkeletonDataTable from "@/components/Common/Skeleton/SkeletonDataTable";
import Title from "@/components/Common/Title";
import ButtonBase from "@/components/Common/UI/ButtonBase";

import Backloglist from "@/containers/Backlogs/BacklogList/BacklogList";
import FilterBlock from "@/containers/FilterBlock";
import { getUserBacklogBySlug } from "@/services/backlogs";
import Link from "next/link";
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
    //Task BHUB40
  const isOwner = user?.username == userName;
  const data = await getUserBacklogBySlug(userName, backlog, isOwner);
  if (!data) return <div> Backlog doesnt exist or you dont have access </div>;

  const selectedCategories = searchParams.categories?.split("-") || [];
  const search = searchParams.search || "";

  const categoriesMap = new Map(
    data.categories.map((category) => [
      category.name,
      category.color,
    ]),
  );

  return (
    <main className="container h-[calc(100svh-49px)] px-4">
      <Title title={data.backlogTitle}>
        <>
          {isOwner && (
            <Link href={`/backlog/edit/${data._id}`}>
              <ButtonBase
                variant="tertiary"
                text="Edit backlog"
                icon={<MdEdit />}
              ></ButtonBase>
            </Link>
          )}
        </>
      </Title>
      <section className="me-auto flex  justify-center rounded py-4 lg:m-0 lg:justify-start">
        <FilterBlock
          backlogSlug={data.slug}
          backlogCategories={data.categories}
        />
      </section>
      <section className="me-auto flex flex-col py-4 lg:m-0">
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
  );
}
