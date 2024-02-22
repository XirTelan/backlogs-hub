import DnDList from "@/containers/DragAndDrop/DnDList";
import { PageDefaultProps } from "@/types";

const ManageBacklogs = async ({ params: { userName } }: PageDefaultProps) => {
  return (
    <main className="container">
      <DnDList userName={userName} />
    </main>
  );
};

export default ManageBacklogs;
