import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { PiBirdFill } from "react-icons/pi";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0, transition: { duration: 0.5 } }}
      transition={{ type: "keyframes" }}
      className={`sticky top-0 z-50 py-3 transition-colors duration-300${
        scrolled
          ? "bg-white/80 backdrop-blur-xs shadow-md lg:max-w-4xl xl:max-w-5xl 2xl:max-w-6xl lg:rounded-4xl mx-auto"
          : "bg-transparent"
      }`}
      layout
    >
      <motion.div
        className={`transition-all duration-500 px-4 flex justify-between items-center mx-auto ${
          scrolled
            ? "lg:max-w-4xl lg:rounded-4xl xl:max-w-5xl 2xl:max-w-6xl"
            : "max-w-full"
        }`}
        layout
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex items-center space-x-2"
        >
          <PiBirdFill className="text-saffron-500 text-xl sm:text-2xl" />
          <h1 className="text-xl sm:text-2xl font-display font-bold text-saffron-600">
            Bandutrachkr
          </h1>
        </motion.div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-green-500 text-white px-5 py-2 rounded-full font-medium shadow-lg"
        >
          Get Started
        </motion.button>
      </motion.div>
    </motion.nav>
  );
};

export default Navbar;
