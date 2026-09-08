"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { getStoredUtmParams } from "@/lib/utm";
import { generateEventId, getFbc, getFbp, trackMetaEvent } from "@/lib/meta";
import s from "./v3.module.css";

const steps = [
  { title: "Qual ambiente você quer transformar?", choices: ["Cozinha ou área gourmet", "Dormitório", "Closet", "Sala", "Banheiro", "Casa completa", "Outro ambiente"] },
  { title: "Onde será o seu projeto?", choices: ["São José do Norte", "Rio Grande", "Cassino"] },
  { title: "Quando você quer começar?", choices: ["Quero começar agora", "Nos próximos 3 meses", "Ainda estou planejando"] },
  { title: "Qual faixa você imagina investir?", choices: ["Até R$15 mil", "R$15 mil a R$30 mil", "Acima de R$30 mil"] },
];

export default function V3Quiz({ onClose }: { onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [nome, setNome] = useState("");
  const [whats, setWhats] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [waUrl, setWaUrl] = useState("");
  const eventId = useRef("");
  const busy = useRef(false);

  useEffect(() => {
    const previousFocus = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    dialog.current?.showModal();
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = overflow; previousFocus?.focus(); };
  }, []);
  useEffect(() => { heading.current?.focus(); }, [step, status]);

  function select(value: string) {
    setAnswers((previous) => { const next = [...previous]; next[step] = value; return next; });
    setStep(step + 1);
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy.current) return;
    if (!nome.trim() || !/^[1-9]{2}\d{8,9}$/.test(whats)) return;
    busy.current = true;
    setStatus("sending");
    const [ambiente, cidade, prazo, investimento] = answers;
    const message = `Olá! Meu nome é ${nome.trim()}.\nQuero planejar: ${ambiente}.\nLocal: ${cidade}.\nPrazo: ${prazo}.\nInvestimento: ${investimento}.\nMeu WhatsApp: ${whats}.`;
    setWaUrl(`https://wa.me/5553999044420?text=${encodeURIComponent(message)}`);
    if (!eventId.current) {
      eventId.current = generateEventId();
      trackMetaEvent("Lead", { content_name: ambiente, content_category: "projeto_v3" }, eventId.current);
    }
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 12000);
    try {
      const response = await fetch("/api/lead", {
        method: "POST", headers: { "Content-Type": "application/json" }, signal: controller.signal,
        body: JSON.stringify({ nome: nome.trim(), whats, ambiente, cidade, prazo, investimento, utm: getStoredUtmParams(), eventId: eventId.current, fbp: getFbp(), fbc: getFbc(), eventSourceUrl: window.location.href }),
      });
      if (!response.ok) throw new Error("Lead delivery failed");
      setStatus("done");
    } catch { setStatus("error"); }
    finally { clearTimeout(timeout); busy.current = false; }
  }

  const finished = status === "done" || status === "error";
  return <dialog ref={dialog} className={s.dialog} aria-labelledby="v3-quiz-heading" onCancel={onClose} onClick={(event) => { if (event.target === event.currentTarget) { const r = event.currentTarget.getBoundingClientRect(); if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) onClose(); } }}>
    <button className={s.close} onClick={onClose} aria-label="Fechar formulário">×</button>
    <span className={s.eyebrow}>COMAR / SEU PROJETO</span>
    {!finished && <><p className={s.stepLabel}>Etapa {step + 1} de 5 · Menos de 2 minutos</p><progress max={5} value={step + 1} aria-label="Progresso do formulário" /></>}
    <h2 ref={heading} tabIndex={-1} id="v3-quiz-heading">{finished ? "Sua ideia já tem um próximo passo." : step < 4 ? steps[step].title : "Como podemos falar com você?"}</h2>
    {finished ? <div className={s.completion}>
      <p role="status">{status === "done" ? "Recebemos suas preferências. Toque abaixo para continuar a conversa com a equipe da Comar." : "Não foi possível confirmar o envio pelo site. Você pode enviar todas as suas respostas diretamente pelo WhatsApp."}</p>
      <a className={s.primary} href={waUrl} target="_blank" rel="noopener noreferrer">Continuar no WhatsApp <span aria-hidden="true">↗</span></a>
      <small>A mensagem estará preenchida. Basta enviar.</small>
    </div> : step < 4 ? <div className={s.choices}>{steps[step].choices.map((choice) => <button key={choice} onClick={() => select(choice)}>{choice}<span aria-hidden="true">→</span></button>)}</div> : <form onSubmit={submit} className={s.form}>
      <p>Vamos usar seus dados apenas para o atendimento do seu projeto.</p>
      <label htmlFor="v3-name">Seu nome</label><input id="v3-name" autoComplete="name" value={nome} onChange={(e) => setNome(e.target.value)} required maxLength={100} pattern=".*\S.*" disabled={status === "sending"} />
      <label htmlFor="v3-phone">WhatsApp com DDD</label><input id="v3-phone" type="tel" inputMode="tel" autoComplete="tel-national" placeholder="53999999999" value={whats} onChange={(e) => setWhats(e.target.value.replace(/\D/g, "").slice(0, 11))} pattern="[1-9]{2}[0-9]{8,9}" title="Informe DDD e número, com 10 ou 11 dígitos" required disabled={status === "sending"} />
      <button className={s.primary} type="submit" disabled={status === "sending"}>{status === "sending" ? "Enviando suas preferências…" : "Enviar e continuar meu projeto"}</button>
    </form>}
    {step > 0 && !finished && <button className={s.back} disabled={status === "sending"} onClick={() => setStep(step - 1)}>← Voltar</button>}
  </dialog>;
}
