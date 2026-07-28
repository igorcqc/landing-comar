"use client";

import { useState, type FormEvent } from "react";
import { getStoredUtmParams } from "@/lib/utm";

const WHATSAPP_NUMBER = "5553999044420";
const AMBIENTES = [
  "Cozinha",
  "Quarto",
  "Closet",
  "Sala",
  "Banheiro",
  "Escritório",
  "Estofados",
  "Outro",
];
const CIDADES = ["São José do Norte", "Rio Grande", "Outra cidade"];
const INVESTIMENTOS = [
  "Até R$ 5.000",
  "R$ 5.000 a R$ 15.000",
  "R$ 15.000 a R$ 30.000",
  "Acima de R$ 30.000",
  "Ainda não sei",
];

interface QuoteFormProps {
  onSubmitted?: () => void;
}

export default function QuoteForm({ onSubmitted }: QuoteFormProps) {
  const [nome, setNome] = useState("");
  const [whats, setWhats] = useState("");
  const [ambiente, setAmbiente] = useState(AMBIENTES[0]);
  const [cidade, setCidade] = useState(CIDADES[0]);
  const [investimento, setInvestimento] = useState(INVESTIMENTOS[0]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nome,
        whats,
        ambiente,
        cidade,
        investimento,
        utm: getStoredUtmParams(),
      }),
      keepalive: true,
    }).catch(() => {});

    const linhas = [
      `Olá! Meu nome é ${nome || "(não informado)"}.`,
      `Tenho interesse em um projeto de: ${ambiente}.`,
      `Cidade: ${cidade}.`,
      `Expectativa de investimento: ${investimento}.`,
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
      <div className="field-row">
        <div className="field">
          <label htmlFor="ambiente">Tipo de ambiente</label>
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
          <label htmlFor="cidade">Cidade</label>
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
      </div>
      <div className="field">
        <label htmlFor="investimento">Expectativa de investimento</label>
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
      <button type="submit" className="btn btn-primary">
        Enviar via WhatsApp
      </button>
    </form>
  );
}
