"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import NotificationBell from "@/components/ui/NotificationBell";

interface DropdownOption {
  value: string;
  label: string;
}

const GROUP_OPTIONS: DropdownOption[] = [
  { value: "status", label: "Status" },
  { value: "vehicleType", label: "Vehicle Type" },
  { value: "driver", label: "Driver" },
];

const FILTER_OPTIONS: DropdownOption[] = [
  { value: "all", label: "All" },
  { value: "onTrip", label: "On Trip" },
  { value: "ready", label: "Ready" },
  { value: "busy", label: "Busy" },
  { value: "maintenance", label: "Maintenance" },
];

const SORT_OPTIONS: DropdownOption[] = [
  { value: "tripId", label: "Trip ID" },
  { value: "vehicle", label: "Vehicle" },
  { value: "driver", label: "Driver" },
  { value: "status", label: "Status" },
];

function Dropdown({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: DropdownOption[];
  value: string;
  onChange: (value: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedLabel = options.find((o) => o.value === value)?.label ?? label;

  return (
    <div ref={ref} className="relative">
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-dark-600/80 border border-white/10 text-sm text-white/80 hover:border-accent-blue/40 hover:text-white transition-colors"
      >
        {selectedLabel}
        <motion.span animate={{ rotate: open ? 180 : 0 }} className="text-xs">
          ▼
        </motion.span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0 mt-2 py-1 min-w-[160px] rounded-xl bg-dark-700 border border-white/10 shadow-xl z-50"
          >
            {options.map((opt) => (
              <button
                key={opt.value}
                onClick={() => {
                  onChange(opt.value);
                  setOpen(false);
                }}
                className="w-full px-4 py-2.5 text-left text-sm text-white/80 hover:bg-accent-blue/20 hover:text-white transition-colors"
              >
                {opt.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

interface DashboardHeaderProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  groupBy: string;
  onGroupByChange: (v: string) => void;
  filterBy: string;
  onFilterChange: (v: string) => void;
  sortBy: string;
  onSortChange: (v: string) => void;
}

export default function DashboardHeader({
  searchQuery,
  onSearchChange,
  groupBy,
  onGroupByChange,
  filterBy,
  onFilterChange,
  sortBy,
  onSortChange,
}: DashboardHeaderProps) {
  const [searchFocused, setSearchFocused] = useState(false);

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="pb-6"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
            Fleet Flow
          </h1>
          <LiveIndicator />
        </div>
        <NotificationBell />
      </div>

      <div className="flex flex-col md:flex-row md:items-center flex-wrap gap-3">
        <motion.div
          animate={{
            scale: searchFocused ? 1.02 : 1,
            boxShadow: searchFocused
              ? "0 0 24px rgba(59, 130, 246, 0.2)"
              : "0 0 0 rgba(59, 130, 246, 0)",
          }}
          transition={{ duration: 0.2 }}
          className="flex-1 min-w-[200px] max-w-xs"
        >
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            placeholder="Search fleet..."
            className="w-full px-4 py-2.5 rounded-lg bg-dark-600/80 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-accent-blue/50 transition-colors"
          />
        </motion.div>

        <div className="flex items-center gap-2">
          <Dropdown
            label="Group by"
            options={GROUP_OPTIONS}
            value={groupBy}
            onChange={onGroupByChange}
          />
          <Dropdown
            label="Filter"
            options={FILTER_OPTIONS}
            value={filterBy}
            onChange={onFilterChange}
          />
          <Dropdown
            label="Sort by"
            options={SORT_OPTIONS}
            value={sortBy}
            onChange={onSortChange}
          />
        </div>

        <div className="flex items-center gap-2">
          <ActionButton label="New Trip" icon="+" />
          <ActionButton label="New Vehicle" icon="+" variant="secondary" />
        </div>
      </div>
    </motion.header>
  );
}

function LiveIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-green-500/10 border border-green-500/30"
    >
      <motion.span
        animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="w-2 h-2 rounded-full bg-green-500"
      />
      <span className="text-xs font-medium text-green-400">Live</span>
    </motion.div>
  );
}

function ActionButton({
  label,
  icon,
  variant = "primary",
}: {
  label: string;
  icon: string;
  variant?: "primary" | "secondary";
}) {
  return (
    <motion.button
      whileHover={{ scale: 1.03, boxShadow: "0 0 20px rgba(59, 130, 246, 0.4)" }}
      whileTap={{ scale: 0.98 }}
      className={`
        px-4 py-2.5 rounded-lg text-sm font-medium
        flex items-center gap-2
        transition-colors
        ${variant === "primary"
          ? "bg-accent-blue text-white border border-accent-blue/50 hover:bg-accent-blue/90"
          : "bg-transparent border border-accent-purple/50 text-accent-purple hover:bg-accent-purple/10"
        }
      `}
    >
      <span className="text-lg leading-none">{icon}</span>
      {label}
    </motion.button>
  );
}
