import { Inter } from "next/font/google";
import { Metadata, Viewport } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Toaster } from "react-hot-toast";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ReactNode } from "react";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { APP_NAME, APP_DEFAULT_TITLE, APP_TITLE_TEMPLATE, APP_DESCRIPTION } from "@/site/site-config";
import PWADebug from "@/components/PWADebug";
import PWAServiceWorkerRegister from "@/components/PWAServiceWorkerRegister";
import PWAInstallPrompt from "@/components/PWAInstallPrompt";
import OnlineStatus from "@/components/OnlineStatus";

// Font
const inter = Inter({ subsets: ["latin"] });

// Metadata Object (for use with the new Metadata API)
export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_DEFAULT_TITLE,
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: "summary",
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
};

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
};

// RootLayout Component
interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <head>
        {/* You can include other elements in <head> here if needed */}
      </head>
      <body className={inter.className}>
        <OnlineStatus />
        <ThemeProvider attribute="class" defaultTheme="light">
          <main className="container max-w-4xl p-4 mx-auto">
            <Toaster />
            <PWADebug />
            <Header />
            {children}
            <Footer />
            <PWAServiceWorkerRegister />
            <PWAInstallPrompt />
          </main>
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
