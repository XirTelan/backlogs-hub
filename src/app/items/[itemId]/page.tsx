import BacklogItem from "@/components/Backlog/BacklogItem";
import TopTitle from "@/components/Common/UI/TopTitle";
import { getAndPopulateBacklogItemById } from "@/services/backlogItem";

const Page = async ({ params: { itemId } }: { params: { itemId: string } }) => {
  const result = await getAndPopulateBacklogItemById(itemId);

  if (!result.isSuccess) {
    console.error(result.errors);
    return <div>Error</div>;
  }

  return (
    <>
      <TopTitle title={`Details "${result.data.title}"`} />
      <main className="container self-center">
        <BacklogItem data={result.data} />
      </main>
    </>
  );
};

export default Page;
