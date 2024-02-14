import BacklogEditForm from "@/containers/Backlogs/BacklogEditForm";
import { PageDefaultProps } from "@/types";

const EditBacklog = ({ params: { id } }: PageDefaultProps) => {
  return (
    <main className="container">
      <BacklogEditForm id={id} />
    </main>
  );
};

export default EditBacklog;
