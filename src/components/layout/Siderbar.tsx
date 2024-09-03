"use client";
import React from "react";
import { DashboardNav } from "@/components/navigation/DashboardNav";
import { navItems } from "@/constants/data";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/hooks/useSidebar";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "../ui/sheet";
import { Menu } from "lucide-react";
import Link from "next/link";
import { UserNav } from "../navigation/UserNav";
import { ModeToggle } from "../ui/mode-toggle";
import { Button } from "../ui/button";

type SidebarProps = {
  className?: string;
};

export default function Sidebar({ className }: SidebarProps) {
  const { isMinimized, toggle, isOpen, openSidebar, closeSidebar } =
    useSidebar();

  const handleToggle = () => {
    toggle();
  };

  return (
    <>
      {/* Mobile Sidebar */}
      {/* Mobile Sidebar */}
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="default"
            className="md:hidden fixed top-20 right-4 z-50 text-white dark:text-gray-900 focus:outline-none"
          >
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-4 w-72">
          <nav className="space-y-4">
            {navItems.map((item, index) => (
              <Link href={item.href ?? "#"} key={index} legacyBehavior passHref>
                <a className="block text-gray-900 dark:text-white font-medium transition-colors hover:text-indigo-500 dark:hover:text-indigo-300">
                  {item.label}
                </a>
              </Link>
            ))}
          </nav>
          <SheetClose />
        </SheetContent>
      </Sheet>

      {/* Sidebar */}
      <aside
        className={cn(
          `fixed md:relative top-0 left-0 h-full flex-none bg-card transition-[width] duration-500 z-50 md:z-auto`,
          isOpen ? "w-72" : "w-[72px]",
          isMinimized ? "md:w-[72px]" : "md:w-52",
          !isOpen && "md:block hidden",
          className
        )}
      >
        <svg
          onClick={handleToggle}
          className={cn(
            "absolute -right-3 top-10 z-50 cursor-pointer rounded-full border bg-background text-3xl text-foreground",
            isMinimized && "rotate-180"
          )}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="white"
          stroke="black"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
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
    </>
  );
}
