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
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.className} `}>
        <div id="app" className="bg-surface flex flex-col items-center ">
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
          {children}

          <Footer />
        </div>
      </body>
    </html>
  );
}
