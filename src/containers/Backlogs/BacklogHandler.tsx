import { Suspense } from "react";
import FilterBlock from "../FilterBlock";
import Backloglist from "./BacklogList";
import { getUserBacklogBySlug } from "@/services/backlogs";
import SkeletonDataTable from "@/components/Common/Skeleton/SkeletonDataTable";
import Title from "@/components/Common/Title";

const BacklogHandler = async ({
  userName,
  search,
  backlog,
}: {
  userName: string;
  search: string;
  backlog: string;
}) => {
  const data = await getUserBacklogBySlug(userName, backlog);
  if (!data) return <div>Try again later</div>;
  const categoriesMap = new Map();
  data.categories.forEach((category) => {
    categoriesMap.set(category.name.toLowerCase(), category.color);
  });

  return (
    <>
      <Title title={data.backlogTitle} />
      <section className="m-auto flex  justify-center rounded p-4 lg:m-0 lg:justify-start">
        <Suspense fallback={<p>Loading backlog...</p>}>
          <FilterBlock
            backlogSlug={data.slug}
            backlogCategories={data.categories}
          />
        </Suspense>
      </section>
      <section className="m-auto flex w-[calc(100%-2rem)] flex-col p-4 lg:m-0">
        <Suspense fallback={<SkeletonDataTable />}>
          <Backloglist
            search={search}
            backlogSlug={data.slug}
            categoriesMap={categoriesMap}
            id={data._id.toString()}
          />
        </Suspense>
      </section>
    </>
  );
};

export default BacklogHandler;
