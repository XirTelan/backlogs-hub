import { getCurrentUserInfo } from "@/auth/utils";
import Title from "@/components/Common/Title";
import LinkButton from "@/components/Common/UI/LinkButton";
import DnDList from "@/containers/DragAndDrop/DnDList";
import { getBacklogsByFolder } from "@/services/backlogs";
import { IoAdd } from "react-icons/io5";

const ManageBacklogs = async () => {
  const user = await getCurrentUserInfo();
  if (!user) return null;

  const data = await getBacklogsByFolder(user?.username);

  return (
    <main className="container">
      <Title title="Manage backlogs">
        <LinkButton href={`/backlog/create`} text="Create new backlog">
          <IoAdd />
        </LinkButton>
      </Title>
      {Array.from(data).map((folder) => (
        <div key={folder[0]}>
          <Title variant={2} title={folder[0]}></Title>
          <DnDList data={folder[1]} />
        </div>
      ))}
    </main>
  );
};

export default ManageBacklogs;
