import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Providers from "./providers";
import type React from "react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body className={`${inter.className} bg-gray-900`}>
        <Providers>
          <Navigation />
          <main className="transition-all duration-300 pl-16 sm:pl-16">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
