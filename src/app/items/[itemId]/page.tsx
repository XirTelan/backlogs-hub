import BacklogItem from "@/components/Backlog/BacklogItem";
import TopTitle from "@/components/Common/UI/TopTitle";
import { getAndPopulateBacklogItemById } from "@/services/backlogItem";

const Page = async (props: { params: Promise<{ itemId: string }> }) => {
  const params = await props.params;

  const { itemId } = params;

  const result = await getAndPopulateBacklogItemById(itemId);

  if (!result.success) {
    console.error(result.errors);
    return <div>Error</div>;
  }

  return (
    <>
      <TopTitle title={`Details "${result.data.title}"`} />
      <main id="maincontent" className="container self-center">
        <BacklogItem data={result.data} />
      </main>
    </>
  );
};

export default Page;
