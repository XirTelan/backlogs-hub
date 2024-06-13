import { useCallback } from "react";
import InputWithLoader from "../Common/UI/InputWithLoader";
import ButtonBase from "../Common/UI/ButtonBase";
import { TemplateDTO } from "@/types";
import { generateSlug } from "@/utils";
import toast from "react-hot-toast";
import { SubmitHandler, useForm } from "react-hook-form";
import Title from "../Common/Title";
import useLoaderValue from "@/hooks/useLoaderValue";

const TemplateForm = ({
  selectedTemplate,
  handleCancel,
}: {
  selectedTemplate: TemplateDTO;
  handleCancel: () => void;
}) => {
  const { register, handleSubmit, watch } = useForm({
    defaultValues: {
      title: selectedTemplate.templateTitle,
    },
  });
  const backlogTitle = watch("title", selectedTemplate.templateTitle);
  const onSubmit: SubmitHandler<{ title: string }> = async (data) => {
    const backlog = mapTemplateToBacklog({
      ...selectedTemplate,
      templateTitle: data.title,
    });
    backlog.slug = generateSlug(backlog.backlogTitle);
    try {
      const res = await fetch("/api/backlogs/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(backlog),
      });
      if (res.ok) {
        toast.success("Success");
        handleCancel();
      }
    } catch (error) {
      console.error("error", error);
    }
  };
  const mapTemplateToBacklog = (data: TemplateDTO) => {
    return {
      categories: data.categories,
      backlogTitle: data.templateTitle,
      fields: data.fields,
      order: 99,
      slug: "",
      visibility: "public",
    };
  };

  const backlogIsExist = useCallback(async (value: string) => {
    const data = await fetch(`/api/backlogs?backlog=${value}&type=exist`).then(
      (res) => res.json(),
    );
    return !data.backlog;
  }, []);

  const { isAvailable, isLoading } = useLoaderValue(
    backlogTitle,
    backlogIsExist,
  );

  return (
    <div className=" w-[80vw] " style={{ background: "#161616" }}>
      <Title
        title={`Create backlog from template`}
        variant={2}
        style={{ color: "#fff", paddingLeft: "1rem" }}
      />
      <form
        className="flex h-full grow flex-col "
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="px-4">
          <InputWithLoader
            isLoading={isLoading}
            isAvailable={isAvailable}
            {...register("title")}
            placeholder="Text"
            label="Backlog Title"
            type="text"
          />
        </div>

        <div className="mt-2 flex w-full">
          <ButtonBase
            style={{ width: "100%" }}
            variant="secondary"
            size="large"
            type="button"
            text="Cancel"
            onClick={handleCancel}
          />
          <ButtonBase
            disabled={!isAvailable || isLoading}
            style={{ width: "100%" }}
            variant="primary"
            size="large"
            type="submit"
            text="Confirm"
          />
        </div>
      </form>
    </div>
  );
};

export default TemplateForm;
