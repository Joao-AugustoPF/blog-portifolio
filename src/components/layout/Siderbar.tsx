"use client";
import React from "react";
import { DashboardNav } from "@/components/navigation/DashboardNav";
import { navItems } from "@/constants/data";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/hooks/useSidebar";

type SidebarProps = {
  className?: string;
};

export default function Sidebar({ className }: SidebarProps) {
  const { isMinimized, toggle } = useSidebar();

  const handleToggle = () => {
    toggle();
  };

  return (
    <aside
      className={cn(
        `relative hidden h-screen flex-none border-r bg-card transition-[width] duration-500 md:block`,
        !isMinimized ? "w-52" : "w-[72px]",
        className
      )}
    >
      <svg
        onClick={handleToggle}
        className={cn(
          "absolute  -right-3 top-10 z-10 cursor-pointer rounded-full border bg-background text-3xl text-foreground",
          isMinimized && "rotate-180"
        )}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="white"
        stroke="black"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <circle cx="12" cy="12" r="10" fill="white" />
        <path d="m14 16-4-4 4-4" fill="none" />
      </svg>

      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="mt-3 space-y-1">
            <DashboardNav items={navItems} />
          </div>
        </div>
      </div>
    </aside>
  );
}
