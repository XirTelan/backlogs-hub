import type { Metadata } from "next";
// import { Roboto } from "next/font/google";
import { Roboto } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

import Header from "@/containers/Header";
import Footer from "@/containers/Footer";

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
  params,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${roboto.className} bg-surface flex flex-col items-center `}
      >
        <Toaster
          toastOptions={{
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
        {children}

        <Footer />
      </body>
    </html>
  );
}
