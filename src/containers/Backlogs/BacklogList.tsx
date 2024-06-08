import TableBase from "@/components/Common/UI/TableBase";
import { BacklogItemDTO } from "@/types";
import BacklogItemTr from "./BacklogItemTr";
import BacklogListAdd from "@/components/BacklogListAdd";

const Backloglist = async ({
  id,
  backlogSlug,
  categoriesMap,
  search,
}: BackloglistProps) => {
  //task AUTH3
  const data = await fetch(
    `${process.env.DOMAIN_URL}/api/backlogs/${id}/items${search}`,
    { next: { tags: [`backloglist${id}`] } },
  ).then((res) => res.json());

  return (
    <>
      <TableBase
        customButton={<BacklogListAdd backlog={backlogSlug} />}
        title=""
        search
        description=""
        headers={[{ title: "Title" }, { title: "Actions", width: "100px" }]}
      >
        {data.length > 0 ? (
          data.map((item: BacklogItemDTO) => (
            <BacklogItemTr
              key={item._id}
              item={item}
              color={categoriesMap.get(item.category) || "#fff"}
            />
          ))
        ) : search ? (
          <>
            <tr>
              <td colSpan={2} className=" p-4 text-center">
                <div className="flex w-full flex-col justify-center">
                  <p className="mb-4 text-xl">
                    Nothing found with selected filters
                  </p>
                </div>
              </td>
            </tr>
          </>
        ) : (
          <>
            <tr>
              <td colSpan={2} className=" p-4 text-center">
                <div className="flex w-full flex-col justify-center">
                  <p className="mb-4 text-xl">Your backlog is empty yet</p>
                  <p className=" text-secondary-text">
                    Click Add new to get started
                  </p>
                </div>
              </td>
            </tr>
          </>
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
  // onDelete: (id: string, backlogId: string) => void;
  categoriesMap: Map<string, string>;
}
