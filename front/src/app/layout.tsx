import type { Metadata } from "next";
import localFont from "next/font/local";

import { Providers } from "@/providers";
import Header from "@/components/common/header";
import TabBar from "@/components/common/tab-bar";

import Footer from "@/components/common/footer";
import "./globals.css";
import ViewedProductsSidebar from "@/components/shop/viewed-products-sidebar";

const font = localFont({
  src: [
    {
      path: "./fonts/42dotSans/42dotSans-Light.woff",
      weight: "300",
      style: "normal",
    },
    {
      path: "./fonts/42dotSans/42dotSans-Medium.woff",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/42dotSans/42dotSans-Bold.woff",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-42dot",
});

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
        url: "/cicardi-meta-image.png?v=3",
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
    images: ["https://www.cicardi.store/cicardi-meta-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className={`${font.variable} font-sans antialiased`}>
        <Providers>
          <div className="flex min-h-screen flex-1 flex-col">
            <Header />
            <main className="flex-1">
              <div className="">{children}</div>
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
