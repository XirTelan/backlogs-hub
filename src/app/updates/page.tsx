import TopTitle from "@/components/Common/UI/TopTitle";
import UpdatesList from "@/components/UpdatesList";
import { getNews } from "@/services/news";
import React from "react";

export default async function UpdatesPage() {
  const data = await getNews();

  return (
    <>
      <TopTitle title={"Updates"} />
      <main id="maincontent" className="container self-center">
        <UpdatesList data={data} />
      </main>
    </>
  );
}
