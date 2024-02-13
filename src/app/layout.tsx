import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
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
      <ClerkProvider>
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
          <main className="container flex grow flex-col justify-center">
            {children}
          </main>
          <Footer />
        </body>
      </ClerkProvider>
    </html>
  );
}
