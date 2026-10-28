import type { Metadata, Viewport } from "next";
import { Outfit, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/navigation/Header";
import { Footer } from "@/components/navigation/Footer";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "optional",
  preload: false,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "optional",
  preload: false,
});

import {
  DEFAULT_OG_IMAGE,
  DEFAULT_TWITTER_IMAGE,
  SITE_URL,
  SOCIAL_IMAGE_ALT,
} from "@/lib/seo/site";

export const metadata: Metadata = {
  title: "Base64 Toolkit — Fast, Private In-Browser Base64 Utilities",
  description:
    "Encode, decode, convert, and inspect Base64, Base64URL, files, and images in your browser. Tool data stays in the page instead of being sent to a conversion backend.",
  metadataBase: new URL(SITE_URL),
  applicationName: "Base64 Toolkit",
  category: "technology",
  creator: "Base64 Toolkit",
  publisher: "Base64 Toolkit",
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Base64 Toolkit — Fast, Private In-Browser Base64 Utilities",
    description:
      "Browser-based Base64 tools for text, files, images, Base64URL, and Data URIs. Process tool data locally without a conversion upload.",
    type: "website",
    locale: "en_US",
    siteName: "Base64 Toolkit",
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 630,
        type: "image/png",
        alt: SOCIAL_IMAGE_ALT,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Base64 Toolkit — Fast, Private In-Browser Base64 Utilities",
    description:
      "Browser-based Base64 tools for text, files, images, Base64URL, and Data URIs. Process tool data locally without a conversion upload.",
    images: [{ url: DEFAULT_TWITTER_IMAGE, alt: SOCIAL_IMAGE_ALT }],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FAFAF8" },
    { media: "(prefers-color-scheme: dark)", color: "#0E0E10" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${outfit.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme: dark)').matches)){document.documentElement.classList.add('dark');document.documentElement.setAttribute('data-theme','dark');}else{document.documentElement.classList.remove('dark');document.documentElement.setAttribute('data-theme','light');}}catch(e){}})();`,
          }}
        />
      </head>
      <body className="min-h-dvh flex flex-col bg-background text-foreground font-sans">
        <Header />

        <main
          id="main-content"
          className="w-full min-w-0 flex-1 flex flex-col animate-page-enter"
        >
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}
