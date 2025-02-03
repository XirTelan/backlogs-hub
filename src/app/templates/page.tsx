import { getCurrentUserInfo } from "@/auth/utils";
import Title from "@/components/Common/Title";
import dynamic from "next/dynamic";

const TemplateSwitcher = dynamic(
  () => import("@/containers/Templates/TemplateSwitcher"),
);
const TemplateList = dynamic(
  () => import("@/containers/Backlogs/TemplateList"),
);

const Templates = async (props: {
  searchParams: Promise<{ filter: string }>;
}) => {
  const searchParams = await props.searchParams;

  const { filter } = searchParams;

  const user = await getCurrentUserInfo();
  const query = filter ? `?filter=${filter}` : "";
  return (
    <>
      <div className="mb-4 flex w-full  justify-center bg-black">
        <div className="container">
          <Title title={"Templates"} />
        </div>
      </div>
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
