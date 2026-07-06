import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { profile } from "@/data/profile";
import "./globals.css";

const siteUrl = "https://vijayvenkateshjayaraj.github.io";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter"
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Vijayvenkatesh Jayaraj | Data Analyst Portfolio",
    template: "%s | Vijayvenkatesh Jayaraj"
  },
  description:
    "Official portfolio of Vijayvenkatesh Jayaraj, a data and business analyst focused on healthcare data, enterprise systems, ETL automation, business intelligence, and AI automation.",
  keywords: [
    "Vijayvenkatesh Jayaraj",
    "Vijay Venkatesh Jayaraj",
    "Vijay Jayaraj",
    "Data Analyst",
    "Business Analyst",
    "BI Analyst",
    "AI Automation",
    "Healthcare Data Analyst",
    "Portfolio"
  ],
  authors: [{ name: profile.name, url: siteUrl }],
  creator: profile.name,
  publisher: profile.name,
  alternates: {
    canonical: siteUrl
  },
  openGraph: {
    type: "profile",
    url: siteUrl,
    title: "Vijayvenkatesh Jayaraj | Data Analyst Portfolio",
    description:
      "Data and business analytics portfolio covering dashboards, ETL automation, healthcare analytics, enterprise systems, and AI-powered workflow solutions.",
    siteName: "Vijayvenkatesh Jayaraj Portfolio",
    locale: "en_US"
  },
  twitter: {
    card: "summary",
    title: "Vijayvenkatesh Jayaraj | Data Analyst Portfolio",
    description:
      "Data and business analytics portfolio covering dashboards, ETL automation, healthcare analytics, enterprise systems, and AI-powered workflow solutions."
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true
    }
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>{children}</body>
    </html>
  );
}
