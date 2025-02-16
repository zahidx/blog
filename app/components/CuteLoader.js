import React from "react";
import { motion } from "framer-motion";

const CuteLoader = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 dark:bg-gray-900">
      <motion.div
        className="relative flex space-x-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="w-5 h-5 bg-pink-500 rounded-full"
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 0.6, ease: "easeInOut" }}
        />
        <motion.div
          className="w-5 h-5 bg-yellow-400 rounded-full"
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 0.6, ease: "easeInOut", delay: 0.2 }}
        />
        <motion.div
          className="w-5 h-5 bg-blue-400 rounded-full"
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 0.6, ease: "easeInOut", delay: 0.4 }}
        />
      </motion.div>
    </div>
  );
};

export default CuteLoader;
