import type { Metadata } from "next";
import { Outfit, Geist_Mono } from "next/font/google";
import "./globals.css";
import "@fontsource/comic-mono/400.css";
import "@fontsource/comic-mono/700.css";
import { Header } from "@/components/navigation/Header";
import { Footer } from "@/components/navigation/Footer";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

import { SITE_URL } from "@/lib/seo/site";

export const metadata: Metadata = {
  title: "Base64 Toolkit — Fast, Private In-Browser Base64 Utilities",
  description:
    "Encode, decode, convert, and inspect Base64, Base64URL, files, and images directly in your browser. Fast, private by design, with zero server uploads.",
  metadataBase: new URL(SITE_URL),
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Base64 Toolkit — Fast, Private In-Browser Base64 Utilities",
    description:
      "Client-side Base64 tools for developers and creators. Process text and files locally with zero server transmissions.",
    type: "website",
    locale: "en_US",
    siteName: "Base64 Toolkit",
  },
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
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans">
        <Header />
        <main className="flex-1 flex flex-col animate-page-enter">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
