import type { Metadata } from "next";
import OrganicLanding from "../OrganicLanding";

export const metadata: Metadata = {
  title: "Comar Móveis Planejados | Instagram",
  description:
    "Conheça os projetos da Comar Móveis Planejados e converse com a equipe pelo WhatsApp.",
  alternates: {
    canonical: "https://comarmoveis.com.br",
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function InstagramPage() {
  return <OrganicLanding forcedSource="instagram" />;
}
