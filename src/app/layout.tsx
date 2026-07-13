import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { profile } from "@/data/profile";
import "./globals.css";

const siteUrl = "https://vijayvenkateshjayaraj.github.io";
const profileImage = "/vijay-jayaraj-profile.jpg";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter"
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Vijayvenkatesh Jayaraj | AI Engineer & Business Analyst",
    template: "%s | Vijayvenkatesh Jayaraj"
  },
  description:
    "Official portfolio of Vijayvenkatesh Jayaraj, an AI engineer and business analyst building decision intelligence, analytics systems, enterprise automation, and AI agents.",
  keywords: [
    "Vijayvenkatesh Jayaraj",
    "Vijay Venkatesh Jayaraj",
    "Vijay Jayaraj",
    "AI Engineer",
    "Business Analyst",
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
    locale: "en_US",
    images: [
      {
        url: profileImage,
        width: 768,
        height: 1024,
        alt: "Vijayvenkatesh Jayaraj"
      }
    ]
  },
  twitter: {
    card: "summary",
    title: "Vijayvenkatesh Jayaraj | Data Analyst Portfolio",
    description:
      "Data and business analytics portfolio covering dashboards, ETL automation, healthcare analytics, enterprise systems, and AI-powered workflow solutions.",
    images: [profileImage]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large"
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
