import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Link from "next/link";
import HeroVideo from "@/components/background";
import Sidebar from "@/components/navigation/sidebar";
import StickyCursor from "@/components/stickyCursor";

const inter = Inter({ subsets: ["latin"] });

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
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <HeroVideo />
          <Sidebar />
              {children}
          </body>
      </html>
    </ClerkProvider>
  );
}
