"use client";

import { useState } from "react";
import Sidebar from "./Sidebar";
import SearchBar from "./SearchBar";

type DashboardContentProps = {
  children: React.ReactNode;
};

export default function DashboardContent({ children }: DashboardContentProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      {/* Existing desktop sidebar */}
      <Sidebar />

      {/* Mobile backdrop */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
        />
      )}

      {/* Mobile backdrop */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-[110] bg-black/40 md:hidden"
        />
      )}

      {/* Mobile sidebar */}
      <div
        className={`fixed top-0 left-0 z-[120] h-dvh w-[260px] transition-transform duration-300 ease-in-out md:hidden ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Sidebar mobile onClose={() => setSidebarOpen(false)} />
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <SearchBar onMenuClick={() => setSidebarOpen(true)} />

        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
