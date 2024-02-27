import TableBase from "@/components/Common/UI/TableBase";
import { BacklogItemDTO } from "@/types";
import BacklogItemTr from "./BacklogItemTr";
import BacklogListAdd from "@/components/BacklogListAdd";

const Backloglist = async ({ id, categoriesMap, search }: BackloglistProps) => {
  const data = await fetch(
    `${process.env.DOMAIN_URL}/api/backlogs/${id}/items${search}`,
    { next: { tags: ["backloglist"] } },
  ).then((res) => res.json());

  return (
    <>
      <TableBase
        customButton={<BacklogListAdd />}
        title=""
        search
        description=""
        headers={["Title", "Actions"]}
      >
        {data.map((item: BacklogItemDTO) => (
          <BacklogItemTr
            key={item._id}
            item={item}
            color={categoriesMap.get(item.category) || "#fff"}
          />
        ))}
      </TableBase>
    </>
  );
};
export default Backloglist;

interface BackloglistProps {
  id: string;
  search: string;
  // onDelete: (id: string, backlogId: string) => void;
  categoriesMap: Map<string, string>;
}
