import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useThemeToggle } from "../hooks/useThemeToggle";
import type { Theme } from "../contexts/ThemeContext";

interface ThemeToggleProps {
  className?: string;
  showLabel?: boolean;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ className = "", showLabel = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setSpecificTheme, getThemeIcon, getThemeLabel } = useThemeToggle();

  const themes: Array<{ value: Theme; label: string; icon: string }> = [
    { value: "light", label: "Light", icon: "☀️" },
    { value: "dark", label: "Dark", icon: "🌙" },
    { value: "system", label: "System", icon: "💻" },
  ];

  const handleThemeSelect = (selectedTheme: Theme) => {
    setSpecificTheme(selectedTheme);
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`relative ${className}`}>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleDropdown}
        className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-200 text-gray-700 dark:text-gray-300"
        aria-label="Toggle theme"
      >
        <span className="text-lg">{getThemeIcon()}</span>
        {showLabel && <span className="text-sm font-medium">{getThemeLabel()}</span>}
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-xs"
        >
          ▼
        </motion.span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />

            {/* Dropdown Menu */}
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-20"
            >
              <div className="py-1">
                {themes.map((themeOption) => (
                  <motion.button
                    key={themeOption.value}
                    whileHover={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
                    onClick={() => handleThemeSelect(themeOption.value)}
                    className={`w-full flex items-center space-x-3 px-4 py-2 text-left text-sm transition-colors ${
                      theme === themeOption.value
                        ? "text-saffron-600 dark:text-saffron-400 bg-saffron-50 dark:bg-saffron-900/20"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                    }`}
                  >
                    <span className="text-lg">{themeOption.icon}</span>
                    <span className="font-medium">{themeOption.label}</span>
                    {theme === themeOption.value && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="ml-auto text-saffron-600 dark:text-saffron-400"
                      >
                        ✓
                      </motion.span>
                    )}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ThemeToggle;
