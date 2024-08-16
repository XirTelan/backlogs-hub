import Modal from "@/components/Common/Modal";
import ButtonBase from "@/components/Common/UI/ButtonBase";
import { ButtonBaseProps } from "@/types";

export function createModal(cntx: CntxProps, openerOptions?: ButtonBaseProps) {
  const { isOpen, setOpen, setClose } = cntx;
  const Opener = () => {
    return <ButtonBase {...openerOptions} onClick={setOpen}></ButtonBase>;
  };
  const WithModal = ({ children }: { children: React.ReactElement }) => {
    return <>{isOpen && <Modal setClose={setClose}>{children}</Modal>}</>;
  };
  return { Opener, WithModal };
}

type CntxProps = {
  isOpen: boolean;
  setClose: () => void;
  setOpen: () => void;
};
