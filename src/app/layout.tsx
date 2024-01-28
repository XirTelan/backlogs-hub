import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

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
          <NavBar />
          <main className="container flex flex-col justify-center">
            {children}
          </main>
          <Footer />
        </body>
      </ClerkProvider>
    </html>
  );
}
