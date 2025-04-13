"use client";
import { useCallback } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useLoaderValue } from "@/shared/hooks";
import { toastCustom } from "@/shared/lib/toast";
import { Title, InputWithLoader, Select, ButtonBase } from "@/shared/ui";
import { BacklogCreationDTO } from "@/shared/types";
import { TemplateDTO } from "@/entities/template";

const TemplateForm = ({
  selectedTemplate,
  handleCancel,
}: {
  selectedTemplate: TemplateDTO;
  handleCancel: () => void;
}) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { isValid },
  } = useForm({
    defaultValues: selectedTemplate,
  });
  const backlogTitle = watch("templateTitle", selectedTemplate.templateTitle);

  const onSubmit: SubmitHandler<TemplateDTO> = async (data) => {
    const backlog: BacklogCreationDTO = {
      ...selectedTemplate,
      backlogTitle: data.templateTitle,
      slug: "",
      order: 99,
      userId: "",
      userName: "",
      totalCount: 0,
    };
    try {
      const res = await fetch("/api/backlogs/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(backlog),
      });
      if (res.ok) {
        toastCustom.success("Success");
        handleCancel();
      } else {
        const error = await res.json();
        toastCustom.error(error.message);
      }
    } catch (error) {
      console.error("error", error);
    }
  };

  const backlogIsExist = useCallback(async (value: string) => {
    const data = await fetch(`/api/backlogs?backlog=${value}&type=exist`).then(
      (res) => res.json()
    );
    return !data.backlog;
  }, []);

  const { isAvailable, isLoading } = useLoaderValue(
    backlogTitle,
    backlogIsExist
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
            errorMsg="You already have backlog with this name"
            {...register("templateTitle", { required: true })}
            placeholder="Text"
            label="Backlog Title"
            type="text"
          />
          <Select
            label="Visibility"
            options={["public", "private"]}
            {...register("visibility")}
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
            disabled={!isAvailable || isLoading || !isValid}
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
