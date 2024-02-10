import DnDList from "@/containers/DnDList";
import { PageDefaultProps } from "@/types";

const ManageBacklogs = async ({ params: { userName } }: PageDefaultProps) => {
  return (
    <div>
      <DnDList userName={userName} />
    </div>
  );
};

export default ManageBacklogs;
