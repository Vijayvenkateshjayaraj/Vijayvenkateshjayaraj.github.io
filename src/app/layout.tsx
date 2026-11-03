import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { profile } from "@/data/profile";
import "./globals.css";

const siteUrl = "https://vijayvenkateshjayaraj.github.io";
const socialImage = "/og.png";

const sans = Geist({
  subsets: ["latin"],
  variable: "--font-sans"
});

const mono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono"
});

// Applies a saved light/dark choice before first paint so the page never flashes the wrong theme.
const themeScript = `(function(){try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark")document.documentElement.dataset.theme=t;}catch(e){}})();`;

// Leading with the full name keeps every search snippet tied to one consistent identity.
const title = `${profile.name} | AI Developer`;
const description =
  `${profile.name} (Vijay Jayaraj) is an AI developer in Princeton, NJ building tool-calling agents, document-intelligence pipelines, and governed AI platforms on Claude, Azure, and Microsoft Graph.`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: "%s | Vijayvenkatesh Jayaraj"
  },
  description,
  keywords: [
    "Vijayvenkatesh Jayaraj",
    "Vijay Venkatesh Jayaraj",
    "Vijay Jayaraj",
    "AI Developer",
    "AI Engineer",
    "AI Agents",
    "Claude API",
    "Tool Calling",
    "Microsoft Graph",
    "Copilot Studio",
    "Azure AI",
    "Enterprise Automation",
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
    title,
    description,
    siteName: profile.name,
    locale: "en_US",
    images: [
      {
        url: socialImage,
        width: 1200,
        height: 630,
        alt: `${profile.name} - AI Developer`
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
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

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafafa" },
    { media: "(prefers-color-scheme: dark)", color: "#07070b" }
  ]
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className={`${sans.variable} ${mono.variable}`}>{children}</body>
    </html>
  );
}
