"use client";
import useToggle from "@/hooks/useToggle";
import React, { useMemo } from "react";
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

  const changeModifierState = (modifier: keyof ModifiersType) => {
    setValue((prev) => ({
      ...prev,
      [modifier]: !prev[modifier],
    }));
  };
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
                <div className="flex justify-between">
                  <p className=" me-4 ">Steam Search: </p>

                  <Toggle
                    defaultValue={defaultValues.useSteamSearch}
                    action={() => changeModifierState("useSteamSearch")}
                  />
                </div>
                <div className="flex justify-between">
                  <p className=" me-4 ">Tags: </p>

                  <Toggle
                    defaultValue={defaultValues.useTagsSystem}
                    action={() => changeModifierState("useTagsSystem")}
                  />
                </div>
              </div>
            </div>
          </Modal>
        </div>
      )}
    </>
  );
};

export default ModifiersMenu;
