import useDebounce from "@/hooks/useDebounce";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import InputField from "../Common/UI/InputField";

const TemplateForm = ({
  defaultValue,
  handleSubmit,
}: {
  defaultValue: string;
  handleSubmit: (backlogTitle: string) => void;
}) => {
  const [backlogTitle, setBacklogTitle] = useState<string>(defaultValue);
  const [isAvailable, setIsAvailable] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const debouncedValue = useDebounce(backlogTitle);

  useEffect(() => {
    const isAvailableTitle = async () => {
      try {
        setIsLoading(true);
        setIsAvailable(true);
        const res = await fetch(
          `/api/backlogs?backlog=${debouncedValue}&type=exist`,
        );
        const data = await res.json();
        if (data) setIsAvailable(false);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    isAvailableTitle();
  }, [debouncedValue]);

  const onSubmit = () => {
    handleSubmit(debouncedValue);
  };
  return (
    <form className="flex h-full grow flex-col p-2" onSubmit={onSubmit}>
      <div className="p-2">
        <InputField
          value={backlogTitle}
          onChange={(e) => setBacklogTitle(e.target.value)}
          placeholder="Text"
          label="Backlog Title"
          type="text"
        >
          {isLoading && (
            <div className="absolute bottom-0 right-0 top-0 flex   items-center    ">
              <div className=" h-6 w-6 animate-spin rounded-full border-4 border-neutral-500 border-t-cyan-500 "></div>
            </div>
          )}
          {!isAvailable && (
            <div className="absolute bottom-0 right-0 top-0 flex items-center     ">
              <motion.p
                animate={{
                  scale: [1, 1.1, 1.2, 1.1, 1],
                }}
                className="bg-danger rounded p-1"
              >
                Already exist
              </motion.p>
            </div>
          )}
        </InputField>
      </div>
      <p className="px-2 pb-2">
        You can change the title if you are not satisfied with the standard one
        or if one already exists
      </p>
      <div className="flex gap-2">
        <button className="bg-danger mt-auto w-full rounded-xl p-2 disabled:bg-neutral-500">
          Cancel
        </button>
        <button
          disabled={!isAvailable || isLoading}
          className="mt-auto w-full rounded-xl bg-cyan-500 p-2 disabled:bg-neutral-500"
          type="submit"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default TemplateForm;
