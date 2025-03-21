import type { Metadata } from "next";
import "./globals.css";
import { AnimatePresence } from "framer-motion";

import { Toaster } from 'react-hot-toast'
export const metadata: Metadata = {
  title: "ATS Challenge",
  description: "ATS Challenge",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <body className="antialiased">
      {/* for diplaying toast in the whole app  */}
      <Toaster />  
      <AnimatePresence mode="wait">{children}</AnimatePresence>
    </body>
  </html>
  );
}