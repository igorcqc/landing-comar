import type { Metadata } from "next";
import "./globals.css";
import QuoteModalProvider from "@/components/QuoteModal";
import MetaPixel from "@/components/MetaPixel";

const SITE_URL = "https://comarmoveis.com.br";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Comar Móveis Planejados",
  description:
    "Móveis planejados em São José do Norte, Rio Grande, Cassino e região. Projetos para cozinha, dormitório, sala, closet, banheiro e outros ambientes.",
  keywords: [
    "móveis planejados são josé do norte",
    "móveis planejados rio grande rs",
    "móveis planejados cassino rs",
    "cozinha planejada",
    "closet planejado",
    "dormitório planejado",
    "móveis sob medida",
  ],
  alternates: {
    canonical: "/",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  name: "Comar Móveis Planejados",
  image: `${SITE_URL}/projetos/cozinha-02.jpg`,
  url: SITE_URL,
  telephone: "+5553999044420",
  address: {
    "@type": "PostalAddress",
    streetAddress: "R. Ramiro Barcelos, 910, Centro",
    addressLocality: "São José do Norte",
    addressRegion: "RS",
    postalCode: "96225-000",
    addressCountry: "BR",
  },
  areaServed: ["São José do Norte", "Rio Grande", "Cassino"],
  priceRange: "$$",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <MetaPixel />
        <QuoteModalProvider>{children}</QuoteModalProvider>
      </body>
    </html>
  );
}
