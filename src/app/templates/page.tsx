import { getCurrentUserInfo } from "@/auth/utils";
import Title from "@/components/Common/Title";
import TemplateLegend from "@/components/Template/TemplateLegend";
import TemplateList from "@/containers/Backlogs/TemplateList";
import TemplateSwitcher from "@/containers/Templates/TemplateSwitcher";

const Templates = async ({
  searchParams: { filter },
}: {
  searchParams: { filter: string };
}) => {
  const user = await getCurrentUserInfo();
  const query = filter ? `?filter=${filter}` : "";
  return (
    <>
      <div className="mb-4 flex w-full  justify-center bg-black">
        <div className="container">
          <Title title={"Templates"} />
        </div>
      </div>
      <main className="container self-center">
        <div className="mb-4 ms-4">
          <TemplateSwitcher />
        </div>
        <TemplateList userName={user?.username || ""} search={query} />
      </main>
    </>
  );
};

export default Templates;
