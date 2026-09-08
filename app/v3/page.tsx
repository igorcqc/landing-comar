import type { Metadata } from "next";
import V3Landing from "./V3Landing";

export const metadata: Metadata = {
  title: "Seu espaço. Seu jeito. Sob medida. | Comar Móveis",
  description: "Móveis planejados para aproveitar cada centímetro da sua casa. Projeto, fabricação e instalação em São José do Norte, Rio Grande e Cassino.",
  alternates: { canonical: "/v3" },
  robots: { index: false, follow: true },
  openGraph: {
    title: "Comar Móveis | Seu espaço. Seu jeito. Sob medida.",
    description: "Da sua primeira ideia ao último detalhe da instalação. Comece seu projeto com a Comar.",
    url: "/v3",
    images: ["/og-image.jpg"],
  },
};

export default function V3Page() {
  return <V3Landing />;
}
