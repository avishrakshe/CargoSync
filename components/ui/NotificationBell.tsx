"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function NotificationBell() {
  const [hasNotifications] = useState(true);
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen(!open)}
        className="relative p-2 rounded-xl bg-dark-600/80 border border-white/10 hover:border-accent-blue/30 text-white/80 hover:text-white transition-colors"
      >
        <motion.svg
          animate={{ rotate: open ? [0, -10, 10, 0] : 0 }}
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
          />
        </motion.svg>
        {hasNotifications && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full bg-red-500 border-2 border-dark-800"
          />
        )}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="absolute right-0 top-full mt-2 w-72 rounded-xl bg-dark-700 border border-white/10 shadow-xl py-2 z-50"
          >
            <div className="px-4 py-2 border-b border-white/10">
              <p className="text-sm font-medium">Notifications</p>
            </div>
            <div className="px-4 py-3 text-sm text-white/60">
              3 maintenance alerts require attention
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
