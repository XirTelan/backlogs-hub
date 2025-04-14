"use client";
import React from "react";
import { IoMdOptions } from "react-icons/io";
import { Control, Controller, useFormContext } from "react-hook-form";
import { ButtonBase, Title, Select, Toggle, Modal } from "@/shared/ui";
import { useToggle } from "@/shared/hooks";
import { ModifiersType } from "@/shared/model";

type MenuItemProps = {
  title: string;
  modifier: keyof ModifiersType;
  control: Control;
};

const MenuItem = ({ title, modifier, control }: MenuItemProps) => {
  const renderControllerField = ({
    field: { onChange, value },
  }: {
    field: { onChange: (state: boolean) => void; value: boolean };
  }) => <Toggle value={value} action={onChange} />;

  return (
    <div className="flex justify-between">
      <p className=" me-4 ">{title}</p>
      <Controller
        control={control}
        name={`modifiers.${modifier}`}
        render={renderControllerField}
      ></Controller>
    </div>
  );
};

const BacklogOptionsMenu = () => {
  const { isOpen, setClose, toggle } = useToggle();
  const { register, control } = useFormContext();

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
                <MenuItem
                  control={control}
                  modifier={"useSteamSearch"}
                  title={"Steam Search:"}
                />
                <MenuItem
                  control={control}
                  modifier={"useTagsSystem"}
                  title={"Tags:"}
                />
              </div>
            </div>
          </Modal>
        </div>
      )}
    </>
  );
};

export default BacklogOptionsMenu;
