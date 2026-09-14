import type { Metadata } from "next";
import V10Landing from "./V10Landing";

export const metadata: Metadata = {
  title: "Móveis planejados sob medida | Comar Móveis",
  description:
    "Projetos de móveis planejados com fábrica própria, atendimento próximo e nota 5,0 no Google. São José do Norte, Rio Grande e Cassino.",
  alternates: { canonical: "/v10" },
  robots: { index: false, follow: true },
  openGraph: {
    title: "Comar Móveis | Seu projeto começa aqui",
    description:
      "Móveis planejados sob medida, do projeto à instalação, com atendimento em São José do Norte, Rio Grande e Cassino.",
    url: "/v10",
    images: ["/og-image.jpg"],
  },
};

export default function V10Page() {
  return <V10Landing />;
}
