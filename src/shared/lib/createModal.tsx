import { ButtonBase, Modal } from "@/shared/ui";
import React, { Context, useContext } from "react";
import { BaseModalProps } from "../ui/Modal/modal.types";
import { ModalContextProps, ButtonBaseProps } from "../model";

export function createModal(
  cntx: Context<ModalContextProps>,
  key: string,
  config?: ConfigType,
  modalProps?: Partial<BaseModalProps>
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
      if (data) {
      
        ctx.setData(data);
      }
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
    options,
  }: {
    children: React.ReactNode | React.ReactNode[];
    options?: Partial<BaseModalProps>;
  }) => {
    const ctx = useContext(cntx);

    return (
      <>
        {ctx.key === key && ctx.isOpen && (
          <Modal
            actionOptions={{
              position: "absolute",
            }}
            {...modalProps}
            {...options}
            setClose={ctx.setClose}
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
