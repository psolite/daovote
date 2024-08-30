import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import localFont from "next/font/local";
import { AOSInit } from "@/components/aos";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { cn } from "@/lib/utils";
import AppWalletProvider from "./providers/AppWalletProvider";
import { CanvasWalletProvider } from "./providers/CanvasWalletProvider";

const poppins = Poppins({ weight: ["800", "600", "500", "400"], subsets: ["latin"] });

const publicPixel = localFont({
  src: "./fonts/PublicPixel.ttf",
  variable: "--font-publicPixel",
});


export const metadata: Metadata = {
  title: "DAO",
  description: "Create DAO Voting",
  openGraph: {
    title: "DAO",
    description: "Create DAO Voting - Powered by Solana",
    type: "website",
    url: "http://localhost:3000",
    images: "http://localhost:3000/images/dao6.jpg"
  },
  other: {
    'dscvr:canvas:version': "vNext",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

    <html lang="en" suppressHydrationWarning>
      <AOSInit />
      <body className={cn(poppins.className, publicPixel.variable)}>
        <AppWalletProvider>
          <CanvasWalletProvider>
            <Navbar />
            {children}
            <Footer />
          </CanvasWalletProvider>
        </AppWalletProvider>
      </body>
    </html>
  );
}
