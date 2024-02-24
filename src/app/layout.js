import { Inter } from "next/font/google";
import "./globals.css";
import AppProvider from "@/components/AppContext";
import Header from "@/components/layout/Header";
import { Toaster } from "react-hot-toast";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ThemeProvider } from "@/components/ThemeProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  manifest: "/manifest.json",
  title: "EBYF Contacts Info",
  description:
    "EBYF Contacts Info: Easily connect with church youth. No more typing numbers—just tap and call.",
};

export const viewport = {
  themeColor: "#FFFFFF",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light">
          <main className="max-w-4xl p-4 mx-auto">
            <AppProvider>
              <Toaster />
              <Header />
              {children}
              <footer className="p-8 mt-16 text-center text-gray-500 border-t">
                &copy; 2024 All rights reserved
              </footer>
            </AppProvider>
          </main>
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
