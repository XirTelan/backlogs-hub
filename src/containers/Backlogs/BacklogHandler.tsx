import FilterBlock from "../FilterBlock";
import Backloglist from "./BacklogList";
import { getUserBacklogBySlug } from "@/services/backlogs";

const BacklogHandler = async ({
  userName,
  backlog,
}: {
  userName: string;
  backlog: string;
}) => {
  const data = await getUserBacklogBySlug(userName, backlog);
  if (!data) return <div>Null</div>;

  const categoriesMap = new Map();
  data.categories.forEach((category) => {
    categoriesMap.set(category.name.toLowerCase(), category.color);
  });

  return (
    <>
      <section className="mb-4 flex w-full  rounded p-4">
        {data && (
          <FilterBlock
            backlogSlug={data.slug}
            backlogCategories={data.categories}
          />
        )}
      </section>
      <section className="mb-4 flex w-full  rounded  p-4">
        <Backloglist categoriesMap={categoriesMap} id={data._id} />
      </section>
    </>
  );
};

export default BacklogHandler;
