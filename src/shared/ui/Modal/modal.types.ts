import { ButtonBaseProps, ButtonColorVariants } from "@/shared/model/";

export type BaseModalProps = {
  styleMain?: string;
  action?: () => unknown;
  actionOptions?: {
    showActions?: boolean;
    position?: "inherit" | "absolute";
    align?: "top" | "bottom";
    confirmBtn?: {
      confirmOptions?: ButtonBaseProps;
      text?: string;
      clrVariant?: ButtonColorVariants;
    };
    cancelBtn?: {
      text?: string;
      clrVariant?: ButtonColorVariants;
    };
  };
  setClose: () => void;
  children: React.ReactElement | React.ReactElement[];
};
