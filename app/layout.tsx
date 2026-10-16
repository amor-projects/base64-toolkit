import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/navigation/Header";
import { Footer } from "@/components/navigation/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Base64 Toolkit — Fast, Private In-Browser Base64 Utilities",
  description:
    "Encode, decode, convert, and inspect Base64, Base64URL, files, and images directly in your browser. Fast, private by design, with zero server uploads.",
  metadataBase: new URL("https://base64toolkit.com"),
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans">
        <Header />
        <div className="flex-1 flex flex-col">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
