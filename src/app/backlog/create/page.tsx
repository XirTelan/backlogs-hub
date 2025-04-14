import { TopTitle } from "@/shared/ui";
import { BacklogCreateForm } from "@/features/backlog/createBacklog";

const CreateBacklog = () => {
  return (
    <>
      <TopTitle title={"Create new backlog"} />
      <main
        id="maincontent"
        className="container flex grow flex-col self-center px-4"
      >
        <BacklogCreateForm />
      </main>
    </>
  );
};
export default CreateBacklog;
