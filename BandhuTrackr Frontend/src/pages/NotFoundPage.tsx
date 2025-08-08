import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, ArrowLeft, Search, AlertCircle } from "lucide-react";

const NotFoundPage: React.FC = () => {
  useEffect(() => {
    // Set document title for SEO
    document.title = "404 - Page Not Found | BandhuTrackr";

    // Add noindex meta tag to prevent search engine indexing
    const metaNoIndex = document.createElement("meta");
    metaNoIndex.name = "robots";
    metaNoIndex.content = "noindex, nofollow";
    document.head.appendChild(metaNoIndex);

    // Cleanup function to remove the meta tag when component unmounts
    return () => {
      document.head.removeChild(metaNoIndex);
    };
  }, []);
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-red-50 flex items-center justify-center p-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* Animated 404 */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8"
        >
          <h1 className="text-9xl font-bold text-saffron-500 mb-4">404</h1>
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="text-6xl"
          >
            🕵️‍♂️
          </motion.div>
        </motion.div>

        {/* Error Message */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-8"
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Oops! Page Nahi Mila! 😅</h2>
          <p className="text-xl text-gray-600 mb-2">Lagta hai aap galat jagah aa gaye hain...</p>
          <p className="text-lg text-gray-500">
            Don't worry, even the best detectives get lost sometimes! 🧭
          </p>
        </motion.div>

        {/* Fun Message Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-orange-200"
        >
          <div className="flex items-center justify-center mb-3">
            <AlertCircle className="w-5 h-5 text-orange-500 mr-2" />
            <span className="font-semibold text-orange-600">Desi Tip</span>
            <AlertCircle className="w-5 h-5 text-orange-500 ml-2" />
          </div>
          <p className="text-gray-700 italic">
            "Rastaa bhool gaye? Chalo ghar wapas chalte hain! 🏠"
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-saffron-500 to-orange-500 text-white px-6 py-3 rounded-full font-semibold flex items-center space-x-2 shadow-lg hover:shadow-xl transition-shadow"
          >
            <Link to="/" className="flex items-center space-x-2">
              <Home className="w-5 h-5" />
              <span>Home Chalo</span>
            </Link>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-green-500 to-teal-500 text-white px-6 py-3 rounded-full font-semibold flex items-center space-x-2 shadow-lg hover:shadow-xl transition-shadow"
          >
            <Link to="/auth" className="flex items-center space-x-2">
              <Search className="w-5 h-5" />
              <span>Track Karo</span>
            </Link>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.history.back()}
            className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-full font-semibold flex items-center space-x-2 shadow-lg hover:shadow-xl transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Go Back</span>
          </motion.button>
        </motion.div>

        {/* Animated Background Elements */}
        <div className="absolute top-20 left-10 w-16 h-16 bg-orange-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-12 h-12 bg-yellow-200 rounded-full opacity-20 animate-bounce"></div>
        <div className="absolute top-1/2 left-5 w-8 h-8 bg-red-200 rounded-full opacity-20 animate-ping"></div>
        <div className="absolute bottom-10 left-1/3 w-6 h-6 bg-green-200 rounded-full opacity-20 animate-pulse"></div>
      </div>
    </div>
  );
};

export default NotFoundPage;
