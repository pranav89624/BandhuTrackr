import React, { createContext, useEffect, useState } from "react";

export type Theme = "light" | "dark" | "system";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  effectiveTheme: "light" | "dark";
}

// eslint-disable-next-line react-refresh/only-export-components
export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    // Get theme from localStorage or default to system
    const savedTheme = localStorage.getItem("bandhu-trackr-theme") as Theme;
    return savedTheme || "system";
  });

  const [effectiveTheme, setEffectiveTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const root = window.document.documentElement;

    // Function to get system preference
    const getSystemPreference = (): "light" | "dark" => {
      return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    };

    // Function to apply theme
    const applyTheme = (currentTheme: Theme) => {
      let actualTheme: "light" | "dark";

      if (currentTheme === "system") {
        actualTheme = getSystemPreference();
      } else {
        actualTheme = currentTheme;
      }

      setEffectiveTheme(actualTheme);

      // Remove existing theme classes
      root.classList.remove("light", "dark");

      // Add the appropriate theme class
      root.classList.add(actualTheme);

      // Update CSS custom properties for dynamic theming
      if (actualTheme === "dark") {
        root.style.colorScheme = "dark";
      } else {
        root.style.colorScheme = "light";
      }
    };

    // Apply initial theme
    applyTheme(theme);

    // Listen for system theme changes when theme is set to 'system'
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleSystemThemeChange = () => {
      if (theme === "system") {
        applyTheme("system");
      }
    };

    mediaQuery.addEventListener("change", handleSystemThemeChange);

    // Save theme to localStorage
    localStorage.setItem("bandhu-trackr-theme", theme);

    return () => {
      mediaQuery.removeEventListener("change", handleSystemThemeChange);
    };
  }, [theme]);

  const value = {
    theme,
    setTheme,
    effectiveTheme,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};
