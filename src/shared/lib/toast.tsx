import toast, { Toast } from "react-hot-toast";
import { IoMdClose } from "react-icons/io";
import { ButtonBase } from "@/shared/ui";
import { AnimatePresence, motion } from "framer-motion";
import { toastStyle } from "@/shared/ui/Notification";

const renderToastContent =
  // eslint-disable-next-line react/display-name
  (text: string, type: "success" | "error" | "info") => (t: Toast) => (
    <AnimatePresence>
      {t.visible && (
        <motion.div
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 300, opacity: 0 }}
          className={`flex min-h-12 items-center gap-4 border border-s-4 ${toastStyle[type].border}  bg-layer-1`}
        >
          <div className={`ms-4 ${toastStyle[type].text} `}>
            {toastStyle[type].icon}
          </div>
          <div className="flex w-full flex-wrap">{text}</div>
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
      options
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
