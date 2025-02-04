import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

import Header from "@/containers/Header";
import Footer from "@/containers/Footer";

import ProgressBarProvider from "@/components/ProgressBarProvider";
import Link from "next/link";

const roboto = Roboto({
  weight: ["400", "500", "700", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BacklogsHub",
  description: "All backlogs in one place",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark">
      <body className={`${roboto.className} `}>
        <Link
          href="#maincontent"
          aria-label="Skip directly to main content"
          className="absolute  left-0 top-0 z-50 -translate-y-full transform bg-blue-500 px-4 py-2 text-white transition focus:translate-y-0 "
        >
          Skip to main content
        </Link>
        <div
          id="app"
          className="flex flex-col text-text-primary bg-bg-main min-h-screen "
        >
          <Toaster
            reverseOrder={false}
            toastOptions={{
              position: "top-right",
              className: "",
              style: {
                borderRadius: "5px",
                background: "#222",
                color: "#fff",
                border: "solid 2px #333",
              },
            }}
          />

          <Header />
          <ProgressBarProvider>
            <div className="mt-12 flex flex-col">{children}</div>
          </ProgressBarProvider>

          <Footer />
        </div>
      </body>
    </html>
  );
}
