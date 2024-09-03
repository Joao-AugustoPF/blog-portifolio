import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { Header } from "@/components/layout/Header";
import { getServerSession } from "next-auth";
import Footer from "@/components/layout/Footer";
import NextTopLoader from "nextjs-toploader";

const inter = Inter({ subsets: ["latin"] });

import Favicon from "./favicon.ico";

export const metadata: Metadata = {
  title: "João Augusto Dev Blog",
  description:
    "Blog construído com Next.js e Tailwind CSS com finalidade a ser exibido no meu portfólio.",
  icons: [{ rel: "icon", url: Favicon.src }],
  applicationName: "João Augusto Dev Blog",
  creator: "João Augusto",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();

  return (
    <html lang="pt-BR">
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <body className={inter.className}>
          {" "}
          <NextTopLoader showSpinner={false} />
          <Header session={session} />
          {children}
          <Footer />
        </body>
      </ThemeProvider>
    </html>
  );
}
