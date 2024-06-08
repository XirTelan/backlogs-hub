import { Suspense } from "react";
import FilterBlock from "../FilterBlock";
import Backloglist from "./BacklogList";
import SkeletonDataTable from "@/components/Common/Skeleton/SkeletonDataTable";
import Title from "@/components/Common/Title";
import Link from "next/link";
import ButtonBase from "@/components/Common/UI/ButtonBase";
import { MdEdit } from "react-icons/md";
import { BacklogDTO } from "@/zodTypes";

const BacklogHandler = async ({
  search,
  data,
}: {
  search: string;
  data: BacklogDTO;
}) => {
  const categoriesMap = new Map();
  data.categories.forEach((category) => {
    categoriesMap.set(category.name.toLowerCase(), category.color);
  });

  return (
    <>
      <Title title={data.backlogTitle}>
        <Link href={`/backlog/edit/${data._id}`}>
          <ButtonBase
            variant="tertiary"
            text="Edit backlog"
            icon={<MdEdit />}
          ></ButtonBase>
        </Link>
      </Title>
      <section className="me-auto flex  justify-center rounded py-4 lg:m-0 lg:justify-start">
        <Suspense fallback={<p>Loading backlog...</p>}>
          <FilterBlock
            backlogSlug={data.slug}
            backlogCategories={data.categories}
          />
        </Suspense>
      </section>
      <section className="me-auto flex flex-col py-4 lg:m-0">
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
