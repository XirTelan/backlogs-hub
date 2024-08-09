"use client";
import useToggle from "@/hooks/useToggle";
import React, { useMemo } from "react";
import Modal from "./Common/Modal";
import ButtonBase from "./Common/UI/ButtonBase";
import Toggle from "./Common/UI/Toggle";
import { ModifiersType } from "@/zodTypes";
import { BsFillWrenchAdjustableCircleFill } from "react-icons/bs";

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
        size="small"
        hideText
        icon={<BsFillWrenchAdjustableCircleFill />}
        onClick={toggle}
      />
      {isOpen && (
        <div>
          <Modal setClose={setClose}>
            <div className="bg-background">
              <Toggle
                defaultValue={defaultValues.useSteamSearch}
                action={() => changeModifierState("useSteamSearch")}
              />
            </div>
          </Modal>
        </div>
      )}
    </>
  );
};

export default ModifiersMenu;
