"use client";

import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import { Suspense } from "react";

const ProgressBarProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
      <Suspense>
        <ProgressBar
          height="4px"
          color="#0050e6"
          options={{ showSpinner: false }}
          shallowRouting
        />
      </Suspense>
    </>
  );
};

export default ProgressBarProvider;
