import Modal from "@/components/Common/Modal";
import ButtonBase from "@/components/Common/UI/ButtonBase";
import { ButtonBaseProps, ModalContextProps } from "@/types";
import { Context, useContext } from "react";

export function createModal(
  cntx: Context<ModalContextProps>,
  key: string,
  config?: ConfigType,
) {
  const Opener = ({ data }: { data?: unknown }) => {
    const ctx = useContext(cntx);

    const handleClick = () => {
      if (data) ctx.setData(data);
      ctx.setKey(key);
      ctx.setOpen();
    };

    return (
      <ButtonBase {...config?.openerButtton} onClick={handleClick}></ButtonBase>
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
          <Modal setClose={ctx.setClose}>
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
