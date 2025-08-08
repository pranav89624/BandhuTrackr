import React, { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams } from "react-router-dom";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import DecorationPanel from "./DecorationPanel";
import { AUTH_CONTENT } from "../../constants";
import { Link } from "react-router-dom";

type AuthMode = "login" | "signup";

const AuthLayout: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isAnimating, setIsAnimating] = useState(false);

  // Get initial mode from URL params, default to 'login'
  const getInitialMode = useCallback((): AuthMode => {
    const modeParam = searchParams.get("mode");
    return modeParam === "signup" || modeParam === "login" ? modeParam : "login";
  }, [searchParams]);

  const [mode, setMode] = useState<AuthMode>(getInitialMode);

  // Memoize current content based on mode
  const currentContent = useMemo(
    () => ({
      decoration: mode === "login" ? AUTH_CONTENT.decoration.login : AUTH_CONTENT.decoration.signup,
      pageTitle: mode === "login" ? "Login to BandhuTrackr" : "Join BandhuTrackr",
    }),
    [mode]
  );

  // Update mode when URL params change (browser back/forward)
  useEffect(() => {
    const newMode = getInitialMode();
    if (newMode !== mode) {
      setMode(newMode);
    }
  }, [searchParams, mode, getInitialMode]);

  // Update page title dynamically
  useEffect(() => {
    document.title = currentContent.pageTitle;
  }, [currentContent.pageTitle]);

  const toggleMode = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    const newMode = mode === "login" ? "signup" : "login";
    setMode(newMode);

    // Update URL without page reload
    setSearchParams({ mode: newMode });
  }, [isAnimating, mode, setSearchParams]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [mode]);

  // Memoize animation variants for better performance
  const panelVariants = useMemo(
    () => ({
      initial: { x: "100%", opacity: 0, scale: 0.95 },
      animate: { x: 0, opacity: 1, scale: 1 },
      exit: { x: "-100%", opacity: 0, scale: 0.95 },
    }),
    []
  );

  const transition = useMemo(
    () => ({
      duration: 0.5,
      ease: "easeInOut" as const,
    }),
    []
  );

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-green-50 flex flex-col items-center justify-center p-4"
      role="main"
      aria-label={`${mode === "login" ? "Login" : "Signup"} page`}
    >
      <motion.div
        className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        role="dialog"
        aria-label={`${mode === "login" ? "Login" : "Signup"} form container`}
      >
        {/* Desktop Layout (Large screens 1024px+) */}
        <div className="hidden md:flex" role="group" aria-label="Desktop authentication layout">
          <AnimatePresence mode="wait">
            {mode === "login" ? (
              <motion.div
                key="login-layout"
                className="flex w-full"
                variants={panelVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={transition}
              >
                {/* Left: Decoration Panel */}
                <div
                  className="w-1/2 bg-gradient-to-bl from-orange-400 to-red-500"
                  role="complementary"
                >
                  <DecorationPanel
                    mode="login"
                    headline={currentContent.decoration.headline}
                    subtitle={currentContent.decoration.subtitle}
                    quote={currentContent.decoration.quote}
                  />
                </div>
                {/* Right: Login Form */}
                <div className="w-1/2 flex items-center justify-center p-12" role="main">
                  <LoginForm onToggleMode={toggleMode} isAnimating={isAnimating} />
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="signup-layout"
                className="flex w-full"
                variants={panelVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={transition}
              >
                {/* Left: Signup Form */}
                <div className="w-1/2 flex items-center justify-center p-12" role="main">
                  <SignupForm onToggleMode={toggleMode} isAnimating={isAnimating} />
                </div>
                {/* Right: Decoration Panel */}
                <div
                  className="w-1/2 bg-gradient-to-bl from-green-400 to-teal-500"
                  role="complementary"
                >
                  <DecorationPanel
                    mode="signup"
                    headline={currentContent.decoration.headline}
                    subtitle={currentContent.decoration.subtitle}
                    quote={currentContent.decoration.quote}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden" role="group" aria-label="Mobile authentication layout">
          <AnimatePresence mode="wait">
            <motion.div
              key={mode}
              className="min-h-[600px]"
              variants={panelVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={transition}
            >
              {/* Decoration Panel - Always on top for mobile */}
              <div
                className={`${
                  mode === "login"
                    ? "bg-gradient-to-bl from-orange-400 to-red-500"
                    : "bg-gradient-to-bl from-green-400 to-teal-500"
                } h-68`}
                role="complementary"
                aria-label={`${mode === "login" ? "Login" : "Signup"} decoration panel`}
              >
                <DecorationPanel
                  mode={mode}
                  headline={currentContent.decoration.headline}
                  subtitle={currentContent.decoration.subtitle}
                  quote={currentContent.decoration.quote}
                />
              </div>

              {/* Form Panel */}
              <div className="p-8 flex items-center justify-center min-h-[400px]" role="main">
                {mode === "login" ? (
                  <LoginForm onToggleMode={toggleMode} isAnimating={isAnimating} />
                ) : (
                  <SignupForm onToggleMode={toggleMode} isAnimating={isAnimating} />
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
      <Link
        to="/"
        className="mt-6 text-gray-600 hover:text-gray-800 transition-colors duration-200"
        aria-label="Go back to home page"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default AuthLayout;
