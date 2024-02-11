import { motion } from "framer-motion";
import React from "react";

const ActionButton = ({
  title,
  children,
  onClick,
  variant = "primary",
}: ActionButtonProps) => {
  const styles = {
    primary: "bg-neutral-500",
    danger: "bg-danger",
  };
  return (
    <motion.button
      title={title}
      whileHover={{ scale: 1.1 }}
      onClick={onClick}
      className={`hover:${styles[variant]} flex h-8 w-8 items-center justify-center rounded-full bg-neutral-700 p-1 lg:w-auto lg:rounded`}
    >
      <div>{children}</div>
      <span className="hidden lg:mx-2 lg:block ">{title}</span>
    </motion.button>
  );
};

export default ActionButton;

type ActionButtonProps = {
  title: string;
  children: React.ReactElement;
  onClick: () => void;
  variant?: "primary" | "danger";
};
