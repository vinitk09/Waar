import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./navigation.css";
import "./typography.css";
import SectionNavigation from "@/components/layout/SectionNavigation";
import SectionAnimations from "@/components/layout/SectionAnimations";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "WAAR",
  description: "Courses and tutorials for defence such as NDA,SSB and other",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col"><SectionNavigation /><SectionAnimations />{children}</body>
    </html>
  );
}
