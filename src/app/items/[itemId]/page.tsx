import BacklogItem from "@/components/Backlog/BacklogItem";

const Page = async ({ params: { itemId } }: { params: { itemId: string } }) => {
  const res = await fetch(`${process.env.DOMAIN_URL}/api/items/${itemId}`).then(
    (res) => res.json(),
  );
  return (
    <main className="container">
      <BacklogItem data={res.data} />
    </main>
  );
};

export default Page;
