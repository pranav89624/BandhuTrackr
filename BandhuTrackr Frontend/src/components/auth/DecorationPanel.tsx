import React from 'react';
import { motion, easeInOut } from 'framer-motion';
import { Users, Heart, Sparkles } from 'lucide-react';
import { PiBirdFill } from "react-icons/pi";

interface DecorationPanelProps {
  mode: 'login' | 'signup';
  headline: string;
  subtitle: string;
  quote: string;
}

const DecorationPanel: React.FC<DecorationPanelProps> = ({ mode, headline, subtitle, quote }) => {
  const iconVariants = {
    initial: { scale: 0, rotate: -180 },
    animate: { 
      scale: 1, 
      rotate: 0,
      y: [0, -10, 0],
      transition: {
        scale: { duration: 0.6 },
        rotate: { duration: 0.6 },
        y: {
          duration: 3,
          repeat: Infinity,
          ease: easeInOut
        }
      }
    },
    hover: { scale: 1.1, rotate: 10 }
  };

  return (
    <div className="h-full flex flex-col items-center justify-start text-white p-8 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-16 h-16 border-2 border-white rounded-full"></div>
        <div className="absolute top-32 right-16 w-12 h-12 border-2 border-white rounded-lg rotate-45"></div>
        <div className="absolute bottom-20 left-20 w-8 h-8 border-2 border-white rounded-full"></div>
        <div className="absolute bottom-32 right-8 w-20 h-20 border-2 border-white rounded-lg rotate-12"></div>
      </div>

      <motion.div
        className="text-center relative z-10"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {/* Animated Icon */}
        <motion.div
          className="mb-8"
          variants={iconVariants}
          initial="initial"
          animate="animate"
          whileHover="hover"
        >
          {mode === 'login' ? (
            <PiBirdFill className="w-20 h-20 mx-auto" />
          ) : (
            <Users className="w-20 h-20 mx-auto" />
          )}
        </motion.div>

        {/* Main Headline */}
        <motion.h1 
          className="text-4xl md:text-5xl font-bold mb-4"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {headline}
        </motion.h1>

        {/* Subtitle */}
        <motion.p 
          className="text-xl md:text-2xl mb-8 opacity-90"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          {subtitle}
        </motion.p>

        {/* Quote Box */}
        <motion.div
          className="bg-[#ffffff42] bg-opacity-20 backdrop-blur-sm rounded-2xl p-6 max-w-sm mx-auto"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="flex items-center justify-center mb-3">
            <Heart className="w-5 h-5 mr-2 text-pink-200" fill="currentColor" />
            <span className="text-sm font-medium opacity-80">Desi Wisdom</span>
            <Sparkles className="w-5 h-5 ml-2 text-yellow-200" />
          </div>
          <p className="text-lg font-medium italic">"{quote}"</p>
        </motion.div>

        {/* Meme Placeholder */}
        <motion.div
          className="mt-8 bg-[#ffffff42] bg-opacity-10 rounded-xl p-4 max-w-xs mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <div className="text-6xl mb-2">
            {mode === 'login' ? '🕵️‍♂️' : '🤝'}
          </div>
          <p className="text-sm opacity-80">
            {mode === 'login' 
              ? 'Sherlock Holmes ki tarah investigate karo!' 
              : 'Naye dost banane ka time!'}
          </p>
        </motion.div>

        {/* Floating Elements */}
        <motion.div
          className="absolute top-1/4 left-8 text-2xl"
          animate={{ 
            rotate: [0, 10, -10, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 4,
            repeat: Infinity,
            repeatDelay: 2
          }}
        >
          🎯
        </motion.div>

        <motion.div
          className="absolute bottom-1/4 right-8 text-2xl"
          animate={{ 
            y: [0, -15, 0],
            rotate: [0, -5, 5, 0]
          }}
          transition={{ 
            duration: 5,
            repeat: Infinity,
            repeatDelay: 1
          }}
        >
          ✨
        </motion.div>
      </motion.div>
    </div>
  );
};

export default DecorationPanel;