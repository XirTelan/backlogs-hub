"use client";
import useToggle from "@/hooks/useToggle";
import React, { useCallback, useMemo } from "react";
import Modal from "./Common/Modal";
import ButtonBase from "./Common/UI/ButtonBase";
import Toggle from "./Common/UI/Toggle";
import { ModifiersType } from "@/zodTypes";
import { BsFillWrenchAdjustableCircleFill } from "react-icons/bs";
import Title from "./Common/Title";

const ModifiersMenu = ({
  defaultValues,
  setValue,
}: {
  defaultValues: ModifiersType;
  setValue: React.Dispatch<React.SetStateAction<ModifiersType>>;
}) => {
  const { isOpen, setClose, toggle } = useToggle();

  const activeModifiers = useMemo(
    () => Object.values(defaultValues).filter((val) => !!val).length,
    [defaultValues],
  );

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
        title="Modifiers"
        style={{ width: "fit-content" }}
        variant="accent"
        type="button"
        text={`Mods (${activeModifiers})`}
        size="medium"
        hideText
        icon={<BsFillWrenchAdjustableCircleFill />}
        onClick={toggle}
      />
      {isOpen && (
        <div>
          <Modal
            showActions
            setClose={setClose}
            actionOptions={{
              cancelBtn: {
                text: "Close",
              },
            }}
          >
            <div className="bg-background p-4 text-primary-text">
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
