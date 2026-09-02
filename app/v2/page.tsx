import type { Metadata } from "next";
import V2Landing from "./V2Landing";

export const metadata: Metadata = {
  title: "Móveis planejados sob medida | Comar Móveis",
  description:
    "Planeje cozinhas, dormitórios, closets, salas e banheiros com a Comar Móveis. Fábrica própria e atendimento em São José do Norte, Rio Grande e Cassino.",
  alternates: {
    canonical: "/v2",
  },
  robots: {
    index: false,
    follow: true,
  },
  openGraph: {
    title: "Comar Móveis | Seu ambiente, verdadeiramente sob medida",
    description:
      "Do primeiro desenho à instalação: móveis planejados para a sua casa e a sua rotina.",
    url: "/v2",
    images: ["/og-image.jpg"],
  },
};

export default function V2Page() {
  return <V2Landing />;
}
