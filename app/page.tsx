"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import AnimatedSidebar from "@/components/dashboard/AnimatedSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import KPICards from "@/components/dashboard/KPICards";
import FleetDataTable from "@/components/dashboard/FleetDataTable";
import AnimatedBackground from "@/components/ui/AnimatedBackground";
import FloatingActionButton from "@/components/ui/FloatingActionButton";
import { MOCK_TRIPS, MOCK_KPI } from "@/lib/mockData";

export default function DashboardPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [groupBy, setGroupBy] = useState("status");
  const [filterBy, setFilterBy] = useState("all");
  const [sortBy, setSortBy] = useState("tripId");

  return (
    <div className="min-h-screen">
      <AnimatedBackground />

      <AnimatedSidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      <main
        className={`min-h-screen transition-all duration-300 ${
          sidebarCollapsed ? "ml-[72px]" : "ml-[260px]"
        }`}
      >
        <div className="p-6 lg:p-8">
          <DashboardHeader
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            groupBy={groupBy}
            onGroupByChange={setGroupBy}
            filterBy={filterBy}
            onFilterChange={setFilterBy}
            sortBy={sortBy}
            onSortChange={setSortBy}
          />

          <div className="space-y-6">
            <KPICards stats={MOCK_KPI} />
            <FleetDataTable
              trips={MOCK_TRIPS}
              searchQuery={searchQuery}
              filterBy={filterBy}
              sortBy={sortBy}
            />
          </div>
        </div>
      </main>

      <FloatingActionButton />
    </div>
  );
}
