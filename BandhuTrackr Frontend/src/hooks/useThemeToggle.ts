import { useTheme } from "./useTheme";

export const useThemeToggle = () => {
  const { theme, setTheme, effectiveTheme } = useTheme();

  const toggleTheme = () => {
    const themes: Array<"light" | "dark" | "system"> = ["light", "dark", "system"];
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex]);
  };

  const setSpecificTheme = (newTheme: "light" | "dark" | "system") => {
    setTheme(newTheme);
  };

  const getThemeLabel = () => {
    switch (theme) {
      case "light":
        return "Light";
      case "dark":
        return "Dark";
      case "system":
        return "System";
      default:
        return "System";
    }
  };

  const getThemeIcon = () => {
    switch (theme) {
      case "light":
        return "☀️";
      case "dark":
        return "🌙";
      case "system":
        return "💻";
      default:
        return "💻";
    }
  };

  return {
    theme,
    effectiveTheme,
    toggleTheme,
    setSpecificTheme,
    getThemeLabel,
    getThemeIcon,
  };
};
