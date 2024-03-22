import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import SessionAuthProviders from "@/context/SessionAuthProviders";
import "@fontsource-variable/onest";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Aplicasión personal Fitness",
  description:
    "Crea rutinas y dietas a tu gusto para mantenerte saludable y tener una mejor calidad de vida",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <SessionAuthProviders>
          <Navigation />
          {children}
        </SessionAuthProviders>
      </body>
    </html>
  );
}
