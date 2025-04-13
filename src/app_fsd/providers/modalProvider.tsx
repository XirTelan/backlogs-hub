"use client";
import { useToggle } from "@/shared/hooks/";
import { ModalContextProps } from "@/shared/types";
import { createContext, useState } from "react";

const defaultValues: ModalContextProps = {
  isOpen: false,
  key: "none",
  setOpen: () => {},
  setClose: () => {},
  toggle: () => {},
  setData: () => {},
  setKey: () => {},
};

export const ModalContext = createContext<ModalContextProps>(defaultValues);

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const state = useToggle();
  const [data, setData] = useState<unknown | null>(null);
  const [key, setKey] = useState("none");
  return (
    <ModalContext.Provider value={{ ...state, key, data, setKey, setData }}>
      {children}
    </ModalContext.Provider>
  );
};
