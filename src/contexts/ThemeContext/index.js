import React, { useContext, useEffect, useState } from "react";

const ThemeContext = React.createContext();
const ThemeUpdateContext = React.createContext();

// Make themes accessible for children

export function useTheme() {
  return useContext(ThemeContext);
}

export function useThemeUpdate() {
  return useContext(ThemeUpdateContext);
}

export function ThemeProvider({ children }) {
  const [darkTheme, setDarkTheme] = useState(true);

  useEffect(
    () =>
      (document.body.style.backgroundColor = darkTheme
        ? "rgb(36, 40, 47)"
        : "white")
  );

  function toggleTheme() {
    setDarkTheme((prevDarkTheme) => !prevDarkTheme);
  }

  return (
    <ThemeContext.Provider value={darkTheme}>
      <ThemeUpdateContext.Provider value={toggleTheme}>
        {children}
      </ThemeUpdateContext.Provider>
    </ThemeContext.Provider>
  );
}
