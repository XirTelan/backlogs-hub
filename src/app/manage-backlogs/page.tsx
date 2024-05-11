import { getCurrentUserInfo } from "@/auth/utils";
import ManageWrapper from "@/containers/DragAndDrop/ManageWrapper";
import { getBacklogsByFolder } from "@/services/backlogs";

const ManageBacklogs = async () => {
  const user = await getCurrentUserInfo();
  if (!user) return null;

  const items = await getBacklogsByFolder(user?.username);
  return (
    <>
      <div className="mb-10">Test</div>
      <div className="flex w-full ">
        <ManageWrapper items={items} />
      </div>
    </>
  );
};

export default ManageBacklogs;
