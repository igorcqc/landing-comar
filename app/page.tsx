import type { Metadata } from "next";
import OrganicLanding from "./OrganicLanding";

export const metadata: Metadata = {
  title: "Comar Móveis Planejados | Sua casa, do seu jeito",
  description:
    "Móveis planejados para sua rotina, com transporte e entrega próprios em São José do Norte, Rio Grande, Cassino e região. Converse com a equipe da Comar pelo WhatsApp.",
  alternates: {
    canonical: "https://comarmoveis.com.br",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Comar Móveis Planejados | Sua casa, do seu jeito",
    description:
      "Ambientes planejados para aproveitar melhor a casa e a rotina. Atendimento em São José do Norte, Rio Grande, Cassino e região.",
    url: "https://comarmoveis.com.br",
    siteName: "Comar Móveis Planejados",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Cozinha planejada pela Comar Móveis Planejados",
      },
    ],
  },
};

export default function Page() {
  return <OrganicLanding />;
}
