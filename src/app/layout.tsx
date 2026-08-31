import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { profile } from "@/data/profile";
import "./globals.css";

const siteUrl = "https://vijayvenkateshjayaraj.github.io";
const socialImage = "/og.png";

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
    "Portfolio of Vijay Jayaraj, an AI engineer and business analyst building decision-intelligence systems, enterprise automation, analytics platforms, and AI agents.",
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
    title: "Vijay Jayaraj | AI Engineer & Business Analyst",
    description:
      "AI systems that turn business complexity into clear decisions across analytics, automation, governance, and enterprise workflows.",
    siteName: "Vijay Jayaraj · Decision Intelligence Portfolio",
    locale: "en_US",
    images: [
      {
        url: socialImage,
        width: 1200,
        height: 630,
        alt: "Vijay Jayaraj — AI Engineer and Business Analyst"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Vijay Jayaraj | AI Engineer & Business Analyst",
    description:
      "AI systems that turn business complexity into clear decisions across analytics, automation, governance, and enterprise workflows.",
    images: [socialImage]
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
