import type { Metadata } from "next";
import "./globals.css";
import QuoteModalProvider from "@/components/QuoteModal";
import MetaPixel from "@/components/MetaPixel";

export const metadata: Metadata = {
  title: "Comar Móveis Planejados | Móveis sob medida",
  description:
    "Móveis planejados sob medida em São José do Norte e Rio Grande. Projeto, fabricação e instalação próprios, com mais de 400 ambientes entregues desde 2021.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        <MetaPixel />
        <QuoteModalProvider>{children}</QuoteModalProvider>
      </body>
    </html>
  );
}
