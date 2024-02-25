import DnDList from "@/containers/DragAndDrop/DnDList";

const ManageBacklogs = async ({
  params: { userName },
}: {
  params: { userName: string };
}) => {
  return (
    <main className="container">
      <DnDList userName={userName} />
    </main>
  );
};

export default ManageBacklogs;
