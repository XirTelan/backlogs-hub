import TopTitle from "@/components/Common/UI/TopTitle";
import BacklogCreateForm from "@/containers/Backlogs/BacklogCreateForm";


const CreateBacklog = () => {
  return (
    <>
      <TopTitle title={"Create new backlog"} />
      <main className="container flex grow flex-col self-center px-4">
        <BacklogCreateForm />
      </main>
    </>
  );
};
export default CreateBacklog;
