import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";

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
    images: [
      {
        url: "https://aco.rlatksk.site/og-image.png",
        width: 1200,
        height: 630,
        alt: "ACO Hero Optimizer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ACO Hero Optimizer - Dota 2 Team Composition",
    description: "Optimize your Dota 2 team composition using Ant Colony Optimization algorithm.",
    images: ["https://aco.rlatksk.site/og-image.png"],
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
          {children}
        </Providers>
      </body>
    </html>
  );
}
