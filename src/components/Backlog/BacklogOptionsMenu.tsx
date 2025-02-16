"use client";
import useToggle from "@/hooks/useToggle";
import React from "react";
import Modal from "../Common/Modal";
import ButtonBase from "../Common/UI/ButtonBase";
import Toggle from "../Common/UI/Toggle";
import { ModifiersType } from "@/zodTypes";
import Title from "../Common/Title";
import { IoMdOptions } from "react-icons/io";
import { Controller, useFormContext } from "react-hook-form";
import Select from "../Common/UI/Select";

const BacklogOptionsMenu = () => {
  const { isOpen, setClose, toggle } = useToggle();
  const { register, control } = useFormContext();

  const MenuItem = ({
    title,
    modifier,
  }: {
    title: string;
    modifier: keyof ModifiersType;
  }) => {
    return (
      <div className="flex justify-between">
        <p className=" me-4 ">{title}</p>
        <Controller
          control={control}
          name={`modifiers.${modifier}`}
          render={({ field: { onChange, value } }) => (
            <Toggle value={value} action={onChange} />
          )}
        ></Controller>
      </div>
    );
  };

  return (
    <>
      <ButtonBase
        aria-label="Open Backlog options modal"
        title="Backlog options"
        style={{ width: "fit-content" }}
        variant="secondary"
        type="button"
        size="medium"
        hideText
        icon={<IoMdOptions />}
        onClick={toggle}
      />
      {isOpen && (
        <div>
          <Modal
            setClose={setClose}
            actionOptions={{
              showActions: true,
              cancelBtn: {
                text: "Close",
              },
            }}
          >
            <div className="bg-bg-main p-4 text-text-primary">
              <Title variant={2} title="View" />
              <Select
                options={["Default", "Board", "Notes"]}
                {...register("view")}
              />

              <Title variant={2} title="Modifiers" />
              <div className="flex flex-col gap-4 p-4">
                <MenuItem modifier={"useSteamSearch"} title={"Steam Search:"} />
                <MenuItem modifier={"useTagsSystem"} title={"Tags:"} />
              </div>
            </div>
          </Modal>
        </div>
      )}
    </>
  );
};

export default BacklogOptionsMenu;
