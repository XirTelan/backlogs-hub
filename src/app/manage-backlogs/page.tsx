import { getCurrentUserInfo } from "@/auth/utils";
import DnDList from "@/containers/DragAndDrop/DnDList";

const ManageBacklogs = async () => {
  const user = await getCurrentUserInfo();
  return (
    <main className="container">
      <DnDList userName={user?.username || ""} />
    </main>
  );
};

export default ManageBacklogs;
