import Title from "@/components/Common/Title";
import TemplateLegend from "@/components/Template/TemplateLegend";
import BacklogTemplate from "@/containers/Backlogs/BacklogTemplate";
import TemplateSwitcher from "@/containers/Templates/TemplateSwitcher";

const Templates = ({
  searchParams: { filter },
}: {
  searchParams: { filter: string };
}) => {
  const query = filter ? `?filter=${filter}` : "";
  return (
    <main className="container">
      <Title title={"Templates"} />
      <TemplateSwitcher />
      <BacklogTemplate search={query} />
      <TemplateLegend />
    </main>
  );
};

export default Templates;
