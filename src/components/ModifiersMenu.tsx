"use client";
import useToggle from "@/hooks/useToggle";
import React, { useCallback } from "react";
import Modal from "./Common/Modal";
import ButtonBase from "./Common/UI/ButtonBase";
import Toggle from "./Common/UI/Toggle";
import { ModifiersType } from "@/zodTypes";
import Title from "./Common/Title";
import { IoMdOptions } from "react-icons/io";

const ModifiersMenu = ({
  defaultValues,
  setValue,
}: {
  defaultValues: ModifiersType;
  setValue: React.Dispatch<React.SetStateAction<ModifiersType>>;
}) => {
  const { isOpen, setClose, toggle } = useToggle();

  const changeModifierState = useCallback(
    (modifier: keyof ModifiersType) => {
      setValue((prev) => ({
        ...prev,
        [modifier]: !prev[modifier],
      }));
    },
    [setValue],
  );
  const MenuItem = useCallback(
    ({
      title,
      value,
      modifier,
    }: {
      title: string;
      value: boolean;
      modifier: keyof ModifiersType;
    }) => {
      return (
        <div className="flex justify-between">
          <p className=" me-4 ">{title}</p>

          <Toggle
            defaultValue={value}
            action={() => changeModifierState(modifier)}
          />
        </div>
      );
    },
    [changeModifierState],
  );
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
              <Title variant={2} title="Modifiers" />
              <div className="flex flex-col gap-4 p-4">
                <MenuItem
                  modifier={"useSteamSearch"}
                  title={"Steam Search:"}
                  value={defaultValues.useSteamSearch}
                />
                <MenuItem
                  modifier={"useTagsSystem"}
                  title={"Tags:"}
                  value={defaultValues.useTagsSystem}
                />
                <MenuItem
                  modifier={"useBoardType"}
                  title={"Transform to board:"}
                  value={defaultValues.useBoardType}
                />
              </div>
            </div>
          </Modal>
        </div>
      )}
    </>
  );
};

export default ModifiersMenu;
