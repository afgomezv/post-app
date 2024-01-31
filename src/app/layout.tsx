import type { Metadata } from "next";
import { Providers } from "./providers";
import "./globals.css";
import { NavbarComp } from "@/components/NavbarComp";

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
      <body>
        <Providers>
          <NavbarComp />
          {children}
        </Providers>
      </body>
    </html>
  );
}
