"use client";

import { motion } from "framer-motion";
import { useCountUp } from "@/hooks/useCountUp";
import { KPIStats } from "@/lib/mockData";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: (i: number) => ({
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.3 + i * 0.1 },
  }),
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

interface KPICardProps {
  title: string;
  value: number;
  suffix?: string;
  index: number;
  gradient: string;
}

function KPICard({ title, value, suffix = "", index, gradient }: KPICardProps) {
  const count = useCountUp(value, 1200);

  return (
    <motion.div
      variants={cardVariants}
      className="group relative"
    >
      <motion.div
        whileHover={{
          y: -6,
          scale: 1.02,
          transition: { duration: 0.2 },
        }}
        className="
          relative overflow-hidden
          rounded-2xl
          bg-dark-700/60 backdrop-blur-xl
          border border-white/10
          p-6
          shadow-xl
        "
        style={{
          background: "linear-gradient(135deg, rgba(26,26,37,0.8) 0%, rgba(18,18,26,0.9) 100%)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)",
        }}
      >
        {/* Subtle floating animation */}
        <motion.div
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 pointer-events-none"
        >
          <div
            className={`absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl opacity-20 ${gradient}`}
          />
        </motion.div>

        {/* Gradient border glow on hover */}
        <motion.div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300"
          style={{
            padding: "1px",
            background: `linear-gradient(135deg, rgba(59,130,246,0.3), rgba(139,92,246,0.3))`,
            WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
          }}
        />

        <div className="relative z-10">
          <p className="text-sm font-medium text-white/60 mb-2">{title}</p>
          <motion.p
            key={count}
            initial={{ opacity: 0.5, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-3xl font-bold bg-gradient-to-r from-accent-blue to-accent-purple bg-clip-text text-transparent"
          >
            {count}
            {suffix}
          </motion.p>
          <a
            href="#"
            className="mt-3 inline-block text-xs text-accent-blue/80 hover:text-accent-blue transition-colors"
          >
            View details →
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}

interface KPICardsProps {
  stats: KPIStats;
}

export default function KPICards({ stats }: KPICardsProps) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
    >
      <KPICard
        title="Active Fleet"
        value={stats.activeFleet}
        index={0}
        gradient="bg-blue-500"
      />
      <KPICard
        title="Maintenance Alerts"
        value={stats.maintenanceAlerts}
        index={1}
        gradient="bg-amber-500"
      />
      <KPICard
        title="Pending Cargo"
        value={stats.pendingCargo}
        index={2}
        gradient="bg-emerald-500"
      />
      <KPICard
        title="Utilization Rate"
        value={stats.utilizationRate}
        suffix="%"
        index={3}
        gradient="bg-purple-500"
      />
    </motion.div>
  );
}
