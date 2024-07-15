import BacklogItem from "@/components/Backlog/BacklogItem";
import TopTitle from "@/components/Common/UI/TopTitle";

const Page = async ({ params: { itemId } }: { params: { itemId: string } }) => {
  const res = await fetch(`${process.env.DOMAIN_URL}/api/items/${itemId}`).then(
    (res) => res.json(),
  );
  return (
    <>
      <TopTitle title={`Details "${res.data.title}"`} />
      <main className="container self-center">
        <BacklogItem data={res.data} />
      </main>
    </>
  );
};

export default Page;
