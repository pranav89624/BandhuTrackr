import { motion } from "framer-motion";
import { PiBirdFill } from "react-icons/pi";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  fullScreen?: boolean;
  message?: string;
  className?: string;
}

const LoadingSpinner = ({
  size = "md",
  fullScreen = false,
  message = "Loading...",
  className = "",
}: LoadingSpinnerProps) => {
  const sizeClasses = {
    sm: "text-2xl",
    md: "text-3xl",
    lg: "text-5xl",
  };

  const containerClasses = fullScreen
    ? "min-h-screen flex items-center justify-center bg-gradient-to-br from-saffron-300 to-green-500"
    : "flex items-center justify-center";

  return (
    <div className={`${containerClasses} ${className}`} role="status" aria-label={message}>
      <motion.div
        animate={{
          rotate: [0, 15, -15, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{ repeat: Infinity, duration: 1.5 }}
        className={sizeClasses[size]}
      >
        <PiBirdFill className="text-saffron-500" aria-label="Loading indicator" />
      </motion.div>
      <span className="sr-only">{message}</span>
    </div>
  );
};

export default LoadingSpinner;
