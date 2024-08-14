import TableBase from "@/components/Common/UI/TableBase";
import { getBacklogItemsData } from "@/services/backlogItem";
import LinkWithBtnStyle from "@/components/Common/UI/LinkWithBtnStyle";
import { IoAdd } from "react-icons/io5";

import BacklogListData from "./BacklogListData";
import { routesList } from "@/lib/routesList";

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
  selectedCategories,
  categoriesMap,
  search,
  isOwner,
}: BackloglistProps) => {
  const data =
    (await getBacklogItemsData(selectedCategories, search, id)).data || [];
  return (
    <>
      <TableBase
        showButton={isOwner}
        customButton={
          <LinkWithBtnStyle
            href={`${routesList.backlogCreate}/?backlog=${id}`}
            icon={<IoAdd />}
          >
            Add item
          </LinkWithBtnStyle>
        }
        title=""
        search
        description=""
        headers={[
          { id: "accordion", title: "", width: "49px" },
          { id: "title", title: "Title" },
          { id: "actions", title: "Actions", width: "112px" },
        ]}
      >
        {data.length > 0 ? (
          <BacklogListData
            data={data}
            categoriesMap={categoriesMap}
            isOwner={isOwner}
          />
        ) : search ? (
          itemsNotFound
        ) : (
          itemsDoesntExist
        )}
      </TableBase>
    </>
  );
};
export default Backloglist;

interface BackloglistProps {
  id: string;
  search: string;
  backlogSlug: string;
  isOwner: boolean;
  selectedCategories: string[];
  categoriesMap: Map<string, string>;
}
