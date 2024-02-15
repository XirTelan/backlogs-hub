import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

import NavBar from "@/containers/NavBar";
import Footer from "@/containers/Footer";

const roboto = Roboto({
  weight: "400",
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
    <html lang="en">
        <body className={`${roboto.className} flex flex-col items-center `}>
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
          <NavBar />
          {children}

          <Footer />
        </body>
    </html>
  );
}
