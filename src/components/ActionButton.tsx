import { motion } from "framer-motion";
import React from "react";

const ActionButton = ({
  title,
  children,
  onClick,
  shrink = true,
  variant = "primary",
}: ActionButtonProps) => {
  const styles = {
    primary: "hover:bg-neutral-500",
    danger: "hover:bg-danger",
  };
  return (
    <motion.button
      title={title}
      whileHover={{ scale: 1.1 }}
      onClick={onClick}
      className={`${styles[variant]} flex h-8 ${shrink ? "w-8 rounded-full" : "rounded"} items-center justify-center  bg-neutral-700 p-1 lg:w-auto lg:rounded`}
    >
      <div>{children}</div>
      <span className={`${shrink && "hidden"} lg:mx-2 lg:block `}>{title}</span>
    </motion.button>
  );
};

export default ActionButton;

type ActionButtonProps = {
  title: string;
  children: React.ReactElement;
  onClick: () => void;
  shrink?: boolean;
  variant?: "primary" | "danger";
};
