"use client";

import { useState, type FormEvent } from "react";

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

export default function QuoteForm() {
  const [nome, setNome] = useState("");
  const [whats, setWhats] = useState("");
  const [ambiente, setAmbiente] = useState(AMBIENTES[0]);
  const [mensagem, setMensagem] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const linhas = [
      `Olá! Meu nome é ${nome || "(não informado)"}.`,
      `Tenho interesse em um projeto de: ${ambiente}.`,
      mensagem ? `Detalhes: ${mensagem}` : null,
      whats ? `Meu WhatsApp para retorno: ${whats}` : null,
    ].filter(Boolean);

    const texto = encodeURIComponent(linhas.join("\n"));
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${texto}`,
      "_blank",
      "noopener"
    );
  }

  return (
    <form className="form-card reveal" onSubmit={handleSubmit}>
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
        <label htmlFor="mensagem">Mensagem</label>
        <textarea
          id="mensagem"
          placeholder="Conte um pouco sobre o seu projeto"
          value={mensagem}
          onChange={(e) => setMensagem(e.target.value)}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Enviar via WhatsApp
      </button>
    </form>
  );
}
