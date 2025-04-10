"use client";
import useToggle from "@/shared/hooks/useToggle";
import { ModalContextProps } from "@/types";
import { createContext, useState } from "react";

const defaultValues: ModalContextProps = {
  isOpen: false,
  key: "none",
  setOpen: () => {},
  setClose: () => {},
  toggle: () => {},
  setData: undefined,
  setKey: undefined,
};

export const ModalContext = createContext<ModalContextProps>(defaultValues);

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const state = useToggle();
  const [data, setData] = useState(null);
  const [key, setKey] = useState("none");
  return (
    <ModalContext.Provider value={{ ...state, key, data, setKey, setData }}>
      {children}
    </ModalContext.Provider>
  );
};
