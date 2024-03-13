import toast, { Toast } from "react-hot-toast";
import { FaCheckCircle } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

export const toastCustom = (
  text: string,
  type: string,
  options?:
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
    | undefined,
) => {
  return toast.custom(
    (t) => (
      <div className="flex h-12 items-center gap-4 border border-s-4 border-support-success/50 border-s-support-success bg-layer-1">
        <div className="ms-4 text-support-success">
          <FaCheckCircle />
        </div>
        <div>{text}</div>
        <button className="p-4" onClick={() => toast.dismiss(t.id)}>
          <IoMdClose />
        </button>
      </div>
    ),
    options,
  );
};
