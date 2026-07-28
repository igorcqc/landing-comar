"use client";

import { useState, type FormEvent } from "react";
import { getStoredUtmParams } from "@/lib/utm";
import { generateEventId, getFbc, getFbp, trackMetaEvent } from "@/lib/meta";

const WHATSAPP_NUMBER = "5553999044420";
const CIDADES = ["São José do Norte", "Rio Grande", "Cassino"];
const AMBIENTES = [
  "Cozinha/Área Gourmet",
  "Sala",
  "Dormitório",
  "Banheiro",
  "Casa Completa",
  "Outro",
];
const INVESTIMENTOS = [
  "Até R$15 mil",
  "R$15 mil a R$30 mil",
  "Acima de R$30 mil",
];
const PRAZOS = [
  "Imediatamente",
  "Nos próximos 3 meses",
  "Daqui a alguns meses",
];

interface QuoteFormProps {
  onSubmitted?: () => void;
}

export default function QuoteForm({ onSubmitted }: QuoteFormProps) {
  const [nome, setNome] = useState("");
  const [whats, setWhats] = useState("");
  const [cidade, setCidade] = useState(CIDADES[0]);
  const [ambiente, setAmbiente] = useState(AMBIENTES[0]);
  const [investimento, setInvestimento] = useState(INVESTIMENTOS[0]);
  const [prazo, setPrazo] = useState(PRAZOS[0]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const eventId = generateEventId();
    const fbp = getFbp();
    const fbc = getFbc();

    trackMetaEvent(
      "Lead",
      { content_name: ambiente, content_category: "orcamento" },
      eventId
    );

    fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nome,
        whats,
        cidade,
        ambiente,
        investimento,
        prazo,
        utm: getStoredUtmParams(),
        eventId,
        fbp,
        fbc,
        eventSourceUrl: window.location.href,
      }),
      keepalive: true,
    }).catch(() => {});

    const linhas = [
      `Olá! Meu nome é ${nome || "(não informado)"}.`,
      `Local de atendimento: ${cidade}.`,
      `Tenho interesse em um projeto de: ${ambiente}.`,
      `Expectativa de investimento: ${investimento}.`,
      `Prazo para iniciar: ${prazo}.`,
      whats ? `Meu WhatsApp para retorno: ${whats}` : null,
    ].filter(Boolean);

    const texto = encodeURIComponent(linhas.join("\n"));
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${texto}`,
      "_blank",
      "noopener"
    );
    onSubmitted?.();
  }

  return (
    <form className="form-card" onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="nome">Nome completo</label>
        <input
          id="nome"
          type="text"
          placeholder="Seu nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />
      </div>
      <div className="field">
        <label htmlFor="whats">WhatsApp</label>
        <input
          id="whats"
          type="tel"
          placeholder="(53) 9 9999-9999"
          value={whats}
          onChange={(e) => setWhats(e.target.value)}
          required
        />
      </div>
      <div className="field">
        <label htmlFor="cidade">Qual local você deseja atendimento?</label>
        <select
          id="cidade"
          value={cidade}
          onChange={(e) => setCidade(e.target.value)}
        >
          {CIDADES.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
      </div>
      <div className="field">
        <label htmlFor="ambiente">Qual ambiente deseja planejar?</label>
        <select
          id="ambiente"
          value={ambiente}
          onChange={(e) => setAmbiente(e.target.value)}
        >
          {AMBIENTES.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
      </div>
      <div className="field">
        <label htmlFor="investimento">Qual sua expectativa de investimento?</label>
        <select
          id="investimento"
          value={investimento}
          onChange={(e) => setInvestimento(e.target.value)}
        >
          {INVESTIMENTOS.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
      </div>
      <div className="field">
        <label htmlFor="prazo">Em quanto tempo você deseja iniciar o projeto?</label>
        <select
          id="prazo"
          value={prazo}
          onChange={(e) => setPrazo(e.target.value)}
        >
          {PRAZOS.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
      </div>
      <button type="submit" className="btn btn-primary">
        Enviar via WhatsApp
      </button>
    </form>
  );
}
