import BacklogItem from "@/entities/backlogItem/ui/BacklogItem";
import { TopTitle } from "@/shared/ui";
import { populateBacklogItem } from "@/shared/api/backlogItem";

const Page = async (props: { params: Promise<{ itemId: string }> }) => {
  const params = await props.params;

  const { itemId } = params;

  const result = await populateBacklogItem(itemId);

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
