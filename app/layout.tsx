import type { Metadata } from "next";
import { DM_Mono, DM_Sans } from "next/font/google";
import "./globals.css";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import Providers from "@/components/providers";

const fontSans = DM_Sans({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const fontMono = DM_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Docware | The new way to manage your project documentation",
  description:
    "A unified documentation solution that consolidates all your project's documentation, both internal and external, into a single, convenient interface. ",
  keywords: [
    "documentation",
    "docs",
    "project management",
    "knowledge base",
    "internal",
    "external",
    "unified",
    "easy",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${fontSans.variable} ${fontMono.variable} antialiased`}>
        <Providers>
          <Navbar />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
