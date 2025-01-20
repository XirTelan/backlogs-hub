import PanelItemsWrapper from "@/components/Common/UI/PanelItemsWrapper";
import TopTitle from "@/components/Common/UI/TopTitle";
import React from "react";

export default async function Layout({
  children,
}: {
  children: React.ReactElement;
}) {
  return (
    <div className="  grid min-h-screen-bh   md:grid-cols-[256px_1fr]  ">
      <div>
        <aside className="sticky top-[49px] hidden min-h-screen-bh w-64 border-e border-border-1 bg-background pt-4 md:block">
          <nav>
            <PanelItemsWrapper
              baseUrl="/faq"
              data={[
                { id: "general", content: "General" },
                { id: "fields", content: "Backlog Fields Types" },
                { id: "modifiers", content: "Modifiers" },
              ]}
            />
          </nav>
        </aside>
      </div>
      <div className=" flex  flex-col ">
        <TopTitle title="FAQ" />
        <main className=" container self-center px-4">
          <div>{children}</div>
        </main>
      </div>
    </div>
  );
}
