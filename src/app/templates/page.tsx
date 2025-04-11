import { getCurrentUserInfo } from "@/features/auth/utils/utils";
import { TopTitle } from "@/shared/ui";
import dynamic from "next/dynamic";

const TemplateSwitcher = dynamic(
  () => import("@/containers/Templates/TemplateSwitcher")
);
const TemplateList = dynamic(
  () => import("@/containers/Backlogs/TemplateList")
);

type TemplatesProps = {
  searchParams: Promise<{ filter: string }>;
};

const Templates = async ({ searchParams }: TemplatesProps) => {
  const { filter } = await searchParams;

  const user = await getCurrentUserInfo();
  const query = filter ? `?filter=${filter}` : "";
  return (
    <>
      <TopTitle title={"Templates"}></TopTitle>
      <main id="maincontent" className="container self-center">
        <div className="mb-4 ms-4">
          <TemplateSwitcher />
        </div>
        <TemplateList userName={user?.username || ""} search={query} />
      </main>
    </>
  );
};

export default Templates;
