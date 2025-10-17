import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { Navbar } from "@/components/navbar";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ACO Hero Optimizer - Dota 2 Team Composition",
  description: "Optimize your Dota 2 team composition using Ant Colony Optimization algorithm. Find the best hero combinations against enemy teams.",
  openGraph: {
    title: "ACO Hero Optimizer - Dota 2 Team Composition",
    description: "Optimize your Dota 2 team composition using Ant Colony Optimization algorithm. Find the best hero combinations against enemy teams.",
    url: "https://aco.rlatksk.site",
    siteName: "ACO Hero Optimizer",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <Navbar />
          {children}
          <Toaster position="top-right" theme="dark" richColors />
        </Providers>
      </body>
    </html>
  );
}
