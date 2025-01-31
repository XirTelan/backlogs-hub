import TopTitle from "@/components/Common/UI/TopTitle";
import ManageWrapper from "@/containers/DragAndDrop/ManageWrapper";
import { Suspense } from "react";

const Page = async () => {
  return (
    <>
      <TopTitle title="Manage" />
      <main
        id="maincontent"
        className="container flex w-full flex-col self-center "
      >
        <Suspense>
          <ManageWrapper />
        </Suspense>
      </main>
    </>
  );
};

export default Page;
