import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Comar Móveis Planejados | Marcenaria sob medida",
  description:
    "Móveis planejados sob medida em São José do Norte e Rio Grande. Projeto, fabricação e instalação próprios — mais de 400 ambientes entregues desde 2021.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
