import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { NuqsAdapter } from "nuqs/adapters/next/app";

import { Providers } from "@/providers";
import Header from "@/components/common/header";
import TabBar from "@/components/common/tab-bar";

import Footer from "@/components/common/footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Providers>
          <div className="flex min-h-screen flex-1 flex-col">
            <Header />
            <main className="flex-1">
              <div className="container mx-auto pb-16 lg:pb-0">{children}</div>
            </main>
            <Footer />
            <TabBar />
          </div>
        </Providers>
        <div id="modal"></div>
      </body>
    </html>
  );
}
