import toast, { Toast } from "react-hot-toast";
import { FaCheckCircle } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { BsSlashCircleFill } from "react-icons/bs";
import ButtonBase from "@/components/Common/UI/ButtonBase";
import { AnimatePresence, motion } from "framer-motion";

const toastIcons = {
  success: <FaCheckCircle />,
  error: <BsSlashCircleFill />,
};

const toastStyle = {
  success: {
    border: " border-s-support-success border-support-success/50",
    text: "text-support-success",
  },
  error: {
    border: "border-s-support-error border-support-error/30",
    text: " text-support-error ",
  },
};

const renderToastContent =
  // eslint-disable-next-line react/display-name, @typescript-eslint/no-explicit-any
  (text: string, type: "success" | "error") => (t: any) => (
    <AnimatePresence>
      {t.visible && (
        <motion.div
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 300, opacity: 0 }}
          className={`flex h-12 items-center gap-4 border border-s-4 ${toastStyle[type].border}  bg-layer-1`}
        >
          <div className={`ms-4 ${toastStyle[type].text} `}>
            {toastIcons[type]}
          </div>
          <div>{text}</div>
          <ButtonBase
            variant="ghost"
            className="p-4"
            onClick={() => toast.dismiss(t.id)}
            icon={<IoMdClose />}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );

export const toastCustom = {
  success: (text: string, options?: toastProps) =>
    toast.custom(renderToastContent(text, "success"), options),
  error: (text: string, options?: toastProps) =>
    toast.custom(
      renderToastContent(text || "Something goes wrong", "error"),
      options,
    ),
};

type toastProps =
  | Partial<
      Pick<
        Toast,
        | "style"
        | "className"
        | "id"
        | "icon"
        | "duration"
        | "ariaProps"
        | "position"
        | "iconTheme"
      >
    >
  | undefined;
