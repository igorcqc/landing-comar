import type { Metadata } from "next";
import Landing from "./Landing";

export const metadata: Metadata = {
  title: "Sua casa, do seu jeito | Comar Móveis Planejados",
  description: "Móveis planejados para sua rotina. Conheça os projetos da Comar, com transporte e entrega próprios em São José do Norte, Rio Grande, Cassino e região.",
  alternates: { canonical: "https://lp.comarmoveis.com.br/v2" },
};

export default function Page() { return <Landing />; }
