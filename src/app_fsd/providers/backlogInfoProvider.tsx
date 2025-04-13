"use client";

import { BacklogDTO } from "@/shared/types";
import { createContext, Dispatch, SetStateAction, useState } from "react";

const defaultValues: Props = {
  backlog: undefined,
  setBacklog: undefined,
};

export const BacklogInfoContext = createContext(defaultValues);

export const BacklogInfoProvider = ({
  data,
  children,
}: {
  data: BacklogDTO;
  children: React.ReactNode;
}) => {
  const [backlog, setBacklog] = useState(data);
  return (
    <BacklogInfoContext.Provider value={{ backlog, setBacklog }}>
      {children}
    </BacklogInfoContext.Provider>
  );
};

type Props = {
  backlog?: BacklogDTO;
  setBacklog?: Dispatch<SetStateAction<BacklogDTO>>;
};
