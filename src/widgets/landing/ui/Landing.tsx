"use client";
import React, { RefObject, useEffect, useRef, useState } from "react";
import { BLOCKS } from "../config/blocks";
import { LandingBlock } from "./LangingBlock";
import { SectionAnimated } from "./SectionAnimation";

export function Landing() {
  const ref = useRef(null);

  return (
    <>
      {BLOCKS.map((item, indx) => {
        return (
          <LandingBlock key={indx} ref={ref}>
            <SectionAnimated block={item} />
          </LandingBlock>
        );
      })}
    </>
  );
}

export default Landing;
