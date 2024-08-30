import TopTitle from "@/components/Common/UI/TopTitle";
import ManageWrapper from "@/containers/DragAndDrop/ManageWrapper";

const Page = async () => {
  return (
    <>
      <TopTitle title="Manage" />
      <main className="container flex w-full flex-col self-center ">
        <ManageWrapper />
      </main>
    </>
  );
};

export default Page;
