import * as React from "react";
import Link from "next/link";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
} from "@/components/ui/sheet";
import { Menu, X } from "lucide-react";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { UserNav } from "@/components/navigation/UserNav";
import content from "@/app/content.json";
import { Session } from "next-auth";

export function MobileNav({ session }: { session: Session | null }) {
  // Ajuste aqui para aceitar null
  const { navigationItems } = content.header;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="text-gray-900 dark:text-white focus:outline-none">
          <Menu className="h-6 w-6" />
        </button>
      </SheetTrigger>
      <SheetContent side="left" className="p-4">
        <nav className="space-y-4">
          {navigationItems.slice(0, 3).map((item, index) => (
            <Link href={item.link} key={index} legacyBehavior passHref>
              <a className="block text-gray-900 dark:text-white font-medium transition-colors hover:text-indigo-500 dark:hover:text-indigo-300">
                {item.label}
              </a>
            </Link>
          ))}
          {session ? (
            <Link href={navigationItems[3].link} legacyBehavior passHref>
              <a className="block text-gray-900 dark:text-white font-medium transition-colors hover:text-indigo-500 dark:hover:text-indigo-300">
                {navigationItems[3].label}
              </a>
            </Link>
          ) : (
            <Link href={navigationItems[4].link} legacyBehavior passHref>
              <a className="block text-gray-900 dark:text-white font-medium transition-colors hover:text-indigo-500 dark:hover:text-indigo-300">
                {navigationItems[4].label}
              </a>
            </Link>
          )}
          {session && (
            <div className="flex items-center mt-4">
              <UserNav user={session.user} />
              <div className="ml-5">
                <ModeToggle />
              </div>
            </div>
          )}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
