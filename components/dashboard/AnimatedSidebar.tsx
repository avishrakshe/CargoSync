"use client";

import { motion, AnimatePresence } from "framer-motion";

const MENU_ITEMS = [
  { id: "dashboard", label: "Dashboard", active: true },
  { id: "vehicle-registry", label: "Vehicle Registry", active: false },
  { id: "trip-dispatcher", label: "Trip Dispatcher", active: false },
  { id: "maintenance", label: "Maintenance", active: false },
  { id: "trip-expense", label: "Trip & Expense", active: false },
  { id: "performance", label: "Performance", active: false },
  { id: "analytics", label: "Analytics", active: false },
];

interface AnimatedSidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export default function AnimatedSidebar({ collapsed, onToggle }: AnimatedSidebarProps) {
  return (
    <motion.aside
      initial={{ x: -280, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      initial={{ width: 260 }}
      animate={{ width: collapsed ? 72 : 260, x: 0, opacity: 1 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="
        fixed left-0 top-0 z-40 h-screen
        flex flex-col
        bg-dark-800/80 backdrop-blur-xl
        border-r border-white/5
        shadow-2xl
      "
    >
      {/* Logo area */}
      <div className="flex h-16 items-center justify-between px-4 border-b border-white/5">
        <AnimatePresence mode="wait">
          {!collapsed && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-lg font-semibold bg-gradient-to-r from-accent-blue to-accent-purple bg-clip-text text-transparent"
            >
              CargoSync
            </motion.span>
          )}
        </AnimatePresence>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={onToggle}
          className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors"
        >
          <motion.svg
            animate={{ rotate: collapsed ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
          </motion.svg>
        </motion.button>
      </div>

      {/* Menu items */}
      <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
        {MENU_ITEMS.map((item, index) => (
          <SidebarItem
            key={item.id}
            item={item}
            index={index}
            collapsed={collapsed}
          />
        ))}
      </nav>
    </motion.aside>
  );
}

function SidebarItem({
  item,
  index,
  collapsed,
}: {
  item: (typeof MENU_ITEMS)[0];
  index: number;
  collapsed: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.1 + index * 0.05, duration: 0.3 }}
      className="relative"
    >
      <motion.a
        href="#"
        whileHover={{ scale: 1.02, x: 4 }}
        whileTap={{ scale: 0.98 }}
        className={`
          flex items-center gap-3 px-3 py-2.5 rounded-xl
          transition-colors duration-200
          ${item.active
            ? "text-white"
            : "text-white/60 hover:text-white/90 hover:bg-white/5"
          }
        `}
      >
        {item.active && (
          <motion.div
            layoutId="activeIndicator"
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="absolute inset-0 rounded-xl bg-gradient-to-r from-accent-blue/20 to-accent-purple/20 border border-accent-blue/30 shadow-glow"
            style={{ boxShadow: "0 0 20px rgba(59, 130, 246, 0.15)" }}
          />
        )}
        <span className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-sm font-medium flex-shrink-0 relative z-10">
          {item.label.charAt(0)}
        </span>
        <AnimatePresence mode="wait">
          {!collapsed && (
            <motion.span
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "auto" }}
              exit={{ opacity: 0, width: 0 }}
              transition={{ duration: 0.2 }}
              className="relative z-10 truncate font-medium"
            >
              {item.label}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.a>
    </motion.div>
  );
}
