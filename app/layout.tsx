import type { Metadata } from "next";
import { Zilla_Slab } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import Container from "@/components/global/Container";
import Footer from "@/components/footer/Footer";

const zillaSlab = Zilla_Slab({
  variable: "--font-zilla-slab",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Scandleted",
  description: "Scandleted",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={` ${zillaSlab.variable} antialiased`}>
        <Navbar />
        <Container>{children}</Container>
        <Footer />
      </body>
    </html>
  );
}
