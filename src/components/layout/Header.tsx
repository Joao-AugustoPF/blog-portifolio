"use client";

import * as React from "react";
import Link from "next/link";
import { Icons } from "@/components/commons/Icons";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { Session } from "next-auth";
import { UserNav } from "@/components/navigation/UserNav";
import content from "@/app/content.json";
import { MobileNav } from "@/components/navigation/MobileNav";

export function Header({ session }: { session: Session | null }) {
  const { logoText, navigationItems } = content.header;

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4">
        <Link href="/" legacyBehavior passHref>
          <a className="flex items-center space-x-2">
            <Icons.logo className="h-8 w-8 text-indigo-500 dark:text-indigo-300" />
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              {logoText}
            </span>
          </a>
        </Link>
        <div className="md:hidden">
          <MobileNav session={session} />
        </div>
        <NavigationMenu className="hidden md:flex items-center space-x-6">
          <NavigationMenuList>
            {navigationItems.slice(0, 3).map((item, index) => (
              <NavigationMenuItem key={index}>
                <Link href={item.link} legacyBehavior passHref>
                  <NavigationMenuLink className="text-gray-900 ml-4 dark:text-white font-medium transition-colors hover:text-indigo-500 dark:hover:text-indigo-300">
                    {item.label}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            ))}
            {session && (
              <NavigationMenuItem>
                <Link href={navigationItems[3].link} legacyBehavior passHref>
                  <NavigationMenuLink className="text-gray-900 ml-4 dark:text-white font-medium transition-colors hover:text-indigo-500 dark:hover:text-indigo-300">
                    {navigationItems[3].label}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            )}

            <div className="flex items-center ml-4">
              {session ? (
                <UserNav user={session.user} />
              ) : (
                <NavigationMenuItem>
                  <Link href={navigationItems[4].link} legacyBehavior passHref>
                    <NavigationMenuLink className="text-gray-900 ml-4 dark:text-white font-medium transition-colors hover:text-indigo-500 dark:hover:text-indigo-300">
                      {navigationItems[4].label}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              )}
              <div className="ml-5">
                <ModeToggle />
              </div>
            </div>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </header>
  );
}
