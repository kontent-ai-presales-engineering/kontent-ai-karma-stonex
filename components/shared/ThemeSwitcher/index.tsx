import React, { useEffect, useState } from "react";

type Props = {
  theme?: string
}

export const ThemeSwitcher = ({theme} : Props): JSX.Element => {
  const themes = [
    "forex",
    "cityindex",
    "stonex"
  ];

  const [currentTheme, setTheme] = useState(theme || "stonex");

  useEffect(
    () => document.querySelector("html")?.setAttribute("data-theme", currentTheme),
    [currentTheme]);

  return !theme && (
    <div className="inline-flex flex-col fixed bottom-0 right-0 font-bold bg-white border-2 z-[999]">
      {
        <div className={"flex gap-xxxs px-xxxxs"}>
          {themes.map((theme) => <label key={theme} className={"flex gap-2"}>
            <input type={"radio"} value={theme} name={"theme"} defaultChecked={theme === currentTheme} onChange={(e) => setTheme(e.target.value)} />
            {theme}
          </label>)}
        </div>
      }
    </div>
  );
};
