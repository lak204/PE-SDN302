import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport = "width=device-width, initial-scale=1";

export const metadata: Metadata = {
  title: "Contact Manager - Organize Your Contacts",
  description:
    "A modern, responsive contact management application. Create, edit, search, and organize your contacts with ease using a beautiful, professional interface.",
  keywords: [
    "contact manager",
    "contacts",
    "address book",
    "contact list",
    "contact management",
  ],
  authors: [{ name: "Contact Manager Team" }],
  robots: "index, follow",
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [{ url: "/apple-icon.svg", type: "image/svg+xml" }],
  },
  openGraph: {
    title: "Contact Manager - Organize Your Contacts",
    description:
      "A modern, responsive contact management application built with Next.js",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Manager - Organize Your Contacts",
    description:
      "A modern, responsive contact management application built with Next.js",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
