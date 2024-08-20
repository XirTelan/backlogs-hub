import TableBase from "@/components/Common/UI/TableBase";
import { getBacklogItemsData } from "@/services/backlogItem";

import BacklogListData from "./BacklogListData";
import ItemFormModal, {
  ItemFormModalOpen,
} from "@/containers/Items/ItemFormModal";
import { BacklogDTO } from "@/zodTypes";
import { BsThreeDotsVertical } from "react-icons/bs";
import { ModalProvider } from "@/providers/modalProvider";
import ItemChangeCategoryModal from "@/containers/Items/ItemChangeCategoryModal";

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
  search,
  backlog,
  isOwner,
}: BackloglistProps) => {
  const data =
    (await getBacklogItemsData(selectedCategories, search, id)).data || [];

  return (
    <>
      <ModalProvider>
        <TableBase
          showButton={isOwner}
          customButton={<ItemFormModalOpen />}
          title=""
          search
          description=""
          headers={[
            { id: "accordion", title: "", width: "49px" },
            { id: "title", title: "Title" },
            {
              id: "actions",
              title: (
                <BsThreeDotsVertical
                  title="Actions"
                  className="m-auto text-secondary-text"
                />
              ),
              width: "64px",
            },
          ]}
        >
          {data.length > 0 ? (
            <BacklogListData
              data={data}
              categories={backlog.categories}
              isOwner={isOwner}
            />
          ) : search ? (
            itemsNotFound
          ) : (
            itemsDoesntExist
          )}
        </TableBase>
        <ItemFormModal backlog={backlog} />
        <ItemChangeCategoryModal categories={backlog.categories} />
      </ModalProvider>
    </>
  );
};
export default Backloglist;

interface BackloglistProps {
  id: string;
  search: string;
  backlog: BacklogDTO;
  isOwner: boolean;
  selectedCategories: string[];
}
