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
    <main className="container self-center">
      <Title style={{ marginLeft: "1rem" }} title={"Templates"} />
      <div className="mb-4 ms-4">
        <TemplateSwitcher />
      </div>
      <TemplateList userName={user?.username || ""} search={query} />
      <TemplateLegend />
    </main>
  );
};

export default Templates;
