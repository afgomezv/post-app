import type { Metadata } from "next";
import { Providers } from "./providers";
import "./globals.css";
import { NavbarComp } from "@/components/NavbarComp";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Post-App",
  description:
    "Aplicación nos permite crear diferente posts de diferentes usuarios.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="h-screen bg-[#f8f9f9] dark:bg-[#212F3C]">
        <Providers>
          <NavbarComp />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
