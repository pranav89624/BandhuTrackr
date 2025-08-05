import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { PiBirdFill } from "react-icons/pi";
import Navbar from "../components/Navbar";

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-saffron-300 to-green-500">
        <motion.div
          animate={{
            rotate: [0, 15, -15, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="text-5xl"
        >
          <PiBirdFill className="text-saffron-500" />
        </motion.div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
    </>
  );
};

export default Home;
