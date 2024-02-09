import { Inter } from "next/font/google";
import "./globals.css";
import AppProvider from "@/components/AppContext";
import Header from "@/components/layout/Header";
import { Toaster } from "react-hot-toast";
import { UsersProvider } from "@/components/UsersContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "EBYF Contact Info",
  description: "EBYF Contact Info",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
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
      </body>
    </html>
  );
}
