import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { AOSInit } from "@/components/aos";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const poppins = Poppins({ weight: ["800", "600", "500", "400"], subsets: ["latin"] });


export const metadata: Metadata = {
  title: "DAO",
  description: "Create DAO Voting",
  openGraph: {
    title: "DAO",
    description: "Create DAO Voting - Powered by Solana",
    type: "website",
    url: "/",
    images: "/images/dao6.jpg"
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
      <body className={poppins.className}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
