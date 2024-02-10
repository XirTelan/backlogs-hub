import BacklogEditForm from "@/containers/Backlogs/BacklogEditForm";
import { PageDefaultProps } from "@/types";

const EditBacklog = ({ params: { id } }: PageDefaultProps) => {
  return (
    <div>
      <BacklogEditForm id={id} />
    </div>
  );
};

export default EditBacklog;
