import type { Metadata } from "next";

import { Providers } from "@/providers";
import Header from "@/components/common/header";
import TabBar from "@/components/common/tab-bar";

import Footer from "@/components/common/footer";
import "./globals.css";
import ViewedProductsSidebar from "@/components/shop/viewed-products-sidebar";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.cicardi.store"),
  title: "시카디 | cicadi",
  description: "시카디에서 이쁜 옷들을 구매해보세요.",
  icons: {
    icon: "/favicon.ico",
    apple: [
      { url: "/apple-icon.png" },
      { url: "/apple-icon-152x152.png", sizes: "152x152", type: "image/png" },
      { url: "/apple-icon-180x180.png", sizes: "180x180", type: "image/png" },
      { url: "/apple-icon-192x192.png", sizes: "192x192", type: "image/png" },
    ],
  },
  openGraph: {
    title: "시카디 | cicadi",
    description: "시카디에서 이쁜 옷들을 구매해보세요.",
    url: "/",
    images: [
      {
        url: "/cicardi-meta.png?v=1",
        alt: "시카디",
        type: "image/png",
      },
    ],
    type: "website",
    siteName: "시카디 | cicadi",
    locale: "ko_KR",
  },
  twitter: {
    card: "summary_large_image",
    title: "시카디 | cicadi",
    description: "시카디에서 이쁜 옷들을 구매해보세요.",
    images: ["https://www.cicardi.store/cicardi-meta.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Providers>
          <div className="flex min-h-screen flex-1 flex-col">
            <Header />
            <main className="flex-1">
              <div className="container mx-auto pb-16 lg:pb-0">{children}</div>
              <div className="fixed right-14 top-32 z-50 hidden xl:block">
                <ViewedProductsSidebar />
              </div>
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
