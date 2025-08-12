import { PiBirdFill } from "react-icons/pi";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Stop observing once visible for better performance and to avoid unnecessary re-renders
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);
  return (
    <>
      {/* Skip link for screen readers */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded z-50"
      >
        Skip to main content
      </a>

      <section
        ref={sectionRef}
        aria-label="Hero section"
        className="py-12 md:py-20 relative top-0 overflow-hidden"
      >
        {/* Decorative elements */}
        <div
          className="absolute top-10 -right-20 w-64 h-64 rounded-full bg-saffron-200 dark:bg-saffron-800/30 opacity-40"
          aria-hidden="true"
        />
        <div
          className="absolute bottom-20 left-10 w-32 h-32 rounded-full bg-green-200 dark:bg-green-800/30 opacity-40"
          aria-hidden="true"
        />

        <div className="container mx-auto px-4 flex flex-col items-center text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.2 }}
            className="mb-6"
          >
            <motion.div
              animate={
                prefersReducedMotion
                  ? {}
                  : {
                      y: [0, -10, 0],
                      rotate: [0, 5, -5, 0],
                    }
              }
              transition={
                prefersReducedMotion ? {} : { repeat: Infinity, duration: 3, ease: "easeInOut" }
              }
              className="inline-block"
            >
              <PiBirdFill
                className="text-saffron-500 text-6xl"
                aria-label="Bird icon representing tracking"
              />
            </motion.div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.4 }}
            className="text-5xl md:text-7xl font-display font-bold text-saffron-600 dark:text-saffron-400 mb-4"
            style={{ minHeight: "120px" }}
            id="main-heading"
            role="heading"
            aria-level={1}
          >
            BandhuTrackr
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.6 }}
            className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-8 max-w-2xl"
            role="doc-subtitle"
          >
            "Apne the ya nahi? Hum bata denge."
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.7 }}
            className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-12 max-w-3xl"
          >
            Track your followers and find out who's been playing games with the follow-unfollow
            strategy. It's time to clean house! 🧹
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.8 }}
          >
            <motion.button
              whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
              whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
              className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg cursor-pointer focus:outline-none focus:ring-4 focus:ring-green-300 focus:ring-opacity-50"
              aria-label="Start tracking your followers"
              type="button"
            >
              <Link to="/auth">Track Your Bandhu</Link>
            </motion.button>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
