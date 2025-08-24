import "./globals.css";

import { Metadata } from "next";
import { Geist } from "next/font/google";

const poppins = Geist({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FSW Donalds",
  description:
    "Projeto de um site de fast food chamado FSw Donalds, inspirado no McDonald's, desenvolvido por um estudante de Sistemas para Internet.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.className} antialiased`}>{children}</body>
    </html>
  );
}
