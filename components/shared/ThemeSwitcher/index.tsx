import React, {useEffect, useMemo} from "react";
import {useThemeContext} from "../contexts/ThemeProvider";

export const ThemeSwitcher = (): JSX.Element => {
  const themes = [
    "forex",
    "cityindex",
    "stonex"
  ];

  const {themeState, dispatch} = useThemeContext();
  const currentTheme = useMemo(() => themeState === "picker" ? "forex" : themeState, [themeState])

  useEffect(
    () => document.querySelector("html")?.setAttribute("data-theme", currentTheme)
    , [currentTheme]
  );

  return <div
    className="px-xxxxs flex flex-col fixed bottom-0 right-0 font-bold bg-white border-2 z-[999] shadow-2">
    {themes.map((theme) =>
      <label key={theme} className={"flex gap-8 py-xxxxxxxs"}>
        <input type={"radio"}
               value={theme}
               name={"theme"}
               defaultChecked={theme === currentTheme}
               onChange={(e) => dispatch(e.target.value)}/>
        {theme}
      </label>)}
  </div>
};
