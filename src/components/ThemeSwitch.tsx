"use client";
import React, { useEffect, useState } from "react";
import { IoSunnyOutline } from "react-icons/io5";
import { LuMoonStar } from "react-icons/lu";

import ButtonBase from "./Common/UI/ButtonBase";

type Theme = "dark" | "light";

const ThemeSwitch = () => {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const theme = localStorage?.getItem("theme") as Theme | null;
    if (!theme) return;
    document.documentElement.setAttribute("data-theme", theme);
    setTheme(theme);
  }, []);

  const handleToggle = () => {
    setTheme((prev) => {
      const nextState = prev === "dark" ? "light" : "dark";
      localStorage.setItem("theme", nextState);
      document.documentElement.setAttribute("data-theme", nextState);
      return nextState;
    });
  };

  return (
    <div>
      <ButtonBase
        variant="ghost"
        onClick={handleToggle}
        icon={theme == "dark" ? <LuMoonStar /> : <IoSunnyOutline size={18} />}
        aria-label="Switch theme"
      />
    </div>
  );
};

export default ThemeSwitch;
