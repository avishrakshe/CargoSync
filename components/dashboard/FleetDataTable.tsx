"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { FleetTrip, TripStatus } from "@/lib/mockData";

const STATUS_COLORS: Record<TripStatus, string> = {
  "On Trip": "bg-blue-500/20 text-blue-400 border-blue-500/40",
  Ready: "bg-green-500/20 text-green-400 border-green-500/40",
  Busy: "bg-orange-500/20 text-orange-400 border-orange-500/40",
  Maintenance: "bg-red-500/20 text-red-400 border-red-500/40",
};

const PAGE_SIZE = 5;

interface FleetDataTableProps {
  trips: FleetTrip[];
  searchQuery: string;
  filterBy: string;
  sortBy: string;
}

export default function FleetDataTable({
  trips,
  searchQuery,
  filterBy,
  sortBy,
}: FleetDataTableProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredAndSorted = useMemo(() => {
    let result = [...trips];

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (t) =>
          t.tripId.toLowerCase().includes(q) ||
          t.vehicle.toLowerCase().includes(q) ||
          t.driver.toLowerCase().includes(q)
      );
    }

    if (filterBy && filterBy !== "all") {
      const statusMap: Record<string, TripStatus> = {
        onTrip: "On Trip",
        ready: "Ready",
        busy: "Busy",
        maintenance: "Maintenance",
      };
      const status = statusMap[filterBy];
      if (status) result = result.filter((t) => t.status === status);
    }

    result.sort((a, b) => {
      const aVal = a[sortBy as keyof FleetTrip] ?? "";
      const bVal = b[sortBy as keyof FleetTrip] ?? "";
      return String(aVal).localeCompare(String(bVal));
    });

    return result;
  }, [trips, searchQuery, filterBy, sortBy]);

  const totalPages = Math.ceil(filteredAndSorted.length / PAGE_SIZE) || 1;
  const paginatedTrips = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredAndSorted.slice(start, start + PAGE_SIZE);
  }, [filteredAndSorted, currentPage]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="rounded-2xl overflow-hidden border border-white/10 bg-dark-800/60 backdrop-blur-xl"
    >
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              {["Trip ID", "Vehicle", "Driver", "Status"].map((h, i) => (
                <th
                  key={h}
                  className="px-6 py-4 text-left text-sm font-medium text-white/60"
                >
                  {h}
                </th>
              ))}
              <th className="w-12" />
            </tr>
          </thead>
          <tbody>
            <AnimatePresence mode="popLayout">
              {paginatedTrips.length === 0 ? (
                <motion.tr
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="border-b border-white/5"
                >
                  <td colSpan={5} className="px-6 py-16 text-center">
                    <motion.div
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="text-white/40"
                    >
                      <p className="text-lg mb-2">No fleet data found</p>
                      <p className="text-sm">Try adjusting your search or filters</p>
                    </motion.div>
                  </td>
                </motion.tr>
              ) : (
                paginatedTrips.map((trip, index) => (
                  <TableRow
                    key={trip.id}
                    trip={trip}
                    index={index}
                    isExpanded={expandedId === trip.id}
                    onToggle={() =>
                      setExpandedId(expandedId === trip.id ? null : trip.id)
                    }
                  />
                ))
              )}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      {filteredAndSorted.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center justify-between px-6 py-4 border-t border-white/10"
        >
          <p className="text-sm text-white/50">
            Showing {(currentPage - 1) * PAGE_SIZE + 1}–
            {Math.min(currentPage * PAGE_SIZE, filteredAndSorted.length)} of{" "}
            {filteredAndSorted.length}
          </p>
          <div className="flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={currentPage <= 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="px-3 py-1.5 rounded-lg bg-dark-600 text-sm disabled:opacity-40 disabled:cursor-not-allowed hover:bg-dark-500 transition-colors"
            >
              Previous
            </motion.button>
            <span className="text-sm text-white/70">
              Page {currentPage} of {totalPages}
            </span>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={currentPage >= totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              className="px-3 py-1.5 rounded-lg bg-dark-600 text-sm disabled:opacity-40 disabled:cursor-not-allowed hover:bg-dark-500 transition-colors"
            >
              Next
            </motion.button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

function TableRow({
  trip,
  index,
  isExpanded,
  onToggle,
}: {
  trip: FleetTrip;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  return (
    <>
      <motion.tr
        layout
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.05 }}
        className={`
          border-b border-white/5
          cursor-pointer
          transition-colors
          hover:bg-white/5
        `}
        onClick={onToggle}
      >
        <td className="px-6 py-4 text-sm font-medium text-white">{trip.tripId}</td>
        <td className="px-6 py-4 text-sm text-white/80">{trip.vehicle}</td>
        <td className="px-6 py-4 text-sm text-white/80">{trip.driver}</td>
        <td className="px-6 py-4">
          <StatusBadge status={trip.status} />
        </td>
        <td className="px-6 py-4 w-12">
          <motion.span
            animate={{ rotate: isExpanded ? 180 : 0 }}
            className="inline-block text-white/50"
          >
            ▼
          </motion.span>
        </td>
      </motion.tr>
      <AnimatePresence>
        {isExpanded && (
          <motion.tr
            layout
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="border-b border-white/5"
          >
            <td colSpan={5} className="px-6 py-4 bg-dark-700/50">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm"
              >
                <div>
                  <span className="text-white/50">Vehicle Type</span>
                  <p className="text-white">{trip.vehicleType}</p>
                </div>
                <div>
                  <span className="text-white/50">Origin</span>
                  <p className="text-white">{trip.origin || "—"}</p>
                </div>
                <div>
                  <span className="text-white/50">Destination</span>
                  <p className="text-white">{trip.destination || "—"}</p>
                </div>
                <div>
                  <span className="text-white/50">Status</span>
                  <StatusBadge status={trip.status} />
                </div>
              </motion.div>
            </td>
          </motion.tr>
        )}
      </AnimatePresence>
    </>
  );
}

function StatusBadge({ status }: { status: TripStatus }) {
  return (
    <motion.span
      initial={{ scale: 0.9, opacity: 0.8 }}
      animate={{ scale: 1, opacity: 1 }}
      className={`inline-flex px-3 py-1 rounded-full text-xs font-medium border ${STATUS_COLORS[status]}`}
    >
      {status}
    </motion.span>
  );
}
