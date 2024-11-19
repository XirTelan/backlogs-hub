import Modal, { BaseModalProps } from "@/components/Common/Modal";
import ButtonBase from "@/components/Common/UI/ButtonBase";
import { ButtonBaseProps, ModalContextProps } from "@/types";
import React, { Context, useContext } from "react";

export function createModal(
  cntx: Context<ModalContextProps>,
  key: string,
  config?: ConfigType,
  modalProps?: Partial<BaseModalProps>,
) {
  const Opener = ({
    data,
    btnOptions,
    render,
  }: {
    data?: unknown;
    btnOptions?: ButtonBaseProps;
    render?: (openAction: () => void) => React.JSX.Element;
  }) => {
    const ctx = useContext(cntx);

    const handleClick = () => {
      if (data) ctx.setData(data);
      ctx.setKey(key);
      ctx.setOpen();
    };

    if (render) return render(handleClick);

    return (
      <ButtonBase
        {...config?.openerButtton}
        {...btnOptions}
        onClick={handleClick}
      ></ButtonBase>
    );
  };

  const CloseModal = () => {
    const ctx = useContext(cntx);
    return (
      <ButtonBase {...config?.closeButton} onClick={ctx.setClose}></ButtonBase>
    );
  };

  const WithModal = ({
    children,
  }: {
    children: React.ReactNode | React.ReactNode[];
  }) => {
    const ctx = useContext(cntx);

    return (
      <>
        {ctx.key === key && ctx.isOpen && (
          <Modal
            {...modalProps}
            setClose={ctx.setClose}
            actionOptions={{
              position: "absolute",
            }}
          >
            <>{children}</>
          </Modal>
        )}
      </>
    );
  };
  return { Opener, CloseModal, WithModal };
}

type ConfigType = {
  openerButtton?: ButtonBaseProps;
  closeButton?: ButtonBaseProps;
};
