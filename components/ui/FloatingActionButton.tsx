"use client";

import { motion } from "framer-motion";

export default function FloatingActionButton() {
  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.4 }}
      whileHover={{ scale: 1.1, boxShadow: "0 0 30px rgba(59, 130, 246, 0.5)" }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-8 right-8 z-30 w-14 h-14 rounded-2xl bg-gradient-to-br from-accent-blue to-accent-purple flex items-center justify-center text-white shadow-lg"
    >
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
      </svg>
    </motion.button>
  );
}
