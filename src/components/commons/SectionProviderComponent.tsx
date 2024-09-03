"use client";

import { SessionProvider } from "next-auth/react";

export default function SectionProviderComponent({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SessionProvider>{children}</SessionProvider>;
}
