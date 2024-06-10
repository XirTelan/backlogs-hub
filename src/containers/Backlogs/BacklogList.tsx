import TableBase from "@/components/Common/UI/TableBase";
import { BacklogItemDTO } from "@/types";
import BacklogItemTr from "./BacklogItemTr";
import BacklogListAdd from "@/components/BacklogListAdd";
import { getBacklogItemsData } from "@/services/backlogItem";

const itemsNotFound = (
  <>
    <tr>
      <td colSpan={2} className=" p-4 text-center">
        <div className="flex w-full flex-col justify-center">
          <p className="mb-4 text-xl">Nothing found with selected filters</p>
        </div>
      </td>
    </tr>
  </>
);
const itemsDoesntExist = (
  <>
    <tr>
      <td colSpan={2} className=" p-4 text-center">
        <div className="flex w-full flex-col justify-center">
          <p className="mb-4 text-xl">Your backlog is empty yet</p>
          <p className=" text-secondary-text">Click Add new to get started</p>
        </div>
      </td>
    </tr>
  </>
);

const Backloglist = async ({
  id,
  backlogSlug,
  selectedCategories,
  categoriesMap,
  search,
}: BackloglistProps) => {
  const data =
    (await getBacklogItemsData(selectedCategories, search, id)).data || [];
  return (
    <>
      <TableBase
        customButton={<BacklogListAdd backlog={backlogSlug} />}
        title=""
        search
        description=""
        headers={[{ title: "Title" }, { title: "Actions", width: "100px" }]}
      >
        {data.length > 0
          ? data.map((item: BacklogItemDTO, indx) => (
              <BacklogItemTr
                key={indx}
                item={item}
                color={categoriesMap.get(item.category) || "#fff"}
              />
            ))
          : search
            ? itemsNotFound
            : itemsDoesntExist}
      </TableBase>
    </>
  );
};
export default Backloglist;

interface BackloglistProps {
  id: string;
  search: string;
  backlogSlug: string;
  selectedCategories: string[];
  categoriesMap: Map<string, string>;
}
