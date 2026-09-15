"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { getStoredUtmParams } from "@/lib/utm";
import { generateEventId, getFbc, getFbp, trackMetaEvent } from "@/lib/meta";
import s from "./alternativa.module.css";

const steps = [
  { key: "ambiente", title: "Qual ambiente você quer planejar?", options: ["Cozinha ou área gourmet", "Dormitório", "Sala", "Closet", "Banheiro", "Casa completa", "Outro ambiente"] },
  { key: "cidade", title: "Onde será o seu projeto?", options: ["São José do Norte", "Rio Grande", "Cassino"] },
  { key: "prazo", title: "Quando você pensa em começar?", options: ["Quero começar agora", "Nos próximos 3 meses", "Ainda estou planejando"] },
  { key: "investimento", title: "Qual investimento você imagina?", options: ["Até R$15 mil", "R$15 mil a R$30 mil", "Acima de R$30 mil", "Ainda preciso de orientação"] },
];

export default function Quiz({ open, onClose }: { open: boolean; onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);
  const submitted = useRef(false);
  const isContact = step === steps.length;
  const message = [`Olá! Meu nome é ${name.trim()}.`, `Quero fazer meu projeto: ${answers.ambiente}.`, `Local: ${answers.cidade}.`, `Momento: ${answers.prazo}.`, `Investimento: ${answers.investimento}.`, `Meu WhatsApp: ${phone}.`].join("\n");
  const whatsapp = `https://wa.me/5553999044420?text=${encodeURIComponent(message)}`;

  useEffect(() => {
    if (!open) return;
    const element = dialog.current;
    const oldOverflow = document.body.style.overflow;
    element?.showModal();
    document.body.style.overflow = "hidden";
    return () => { element?.close(); document.body.style.overflow = oldOverflow; };
  }, [open]);
  useEffect(() => { if (open) heading.current?.focus(); }, [step, open]);

  function submit(event: FormEvent) {
    event.preventDefault();
    if (submitted.current) return;
    if (!name.trim() || phone.replace(/\D/g, "").length < 10) { setError("Preencha seu nome e um WhatsApp com DDD."); return; }
    submitted.current = true;
    setError("");
    const eventId = generateEventId();
    trackMetaEvent("Lead", { content_name: answers.ambiente, content_category: "projeto_alternativa" }, eventId);
    // Reuses the site's established integrations; WhatsApp remains available if they fail.
    void fetch("/api/lead", { method: "POST", headers: { "Content-Type": "application/json" }, keepalive: true, body: JSON.stringify({ ...answers, nome: name.trim(), whats: phone, eventId, utm: getStoredUtmParams(), fbp: getFbp(), fbc: getFbc(), eventSourceUrl: window.location.href }) }).then(response => {
      if (!response.ok) setError("Não conseguimos registrar o formulário. Continue pelo WhatsApp para enviar seu projeto diretamente à equipe.");
    }).catch(() => setError("Não conseguimos registrar o formulário. Continue pelo WhatsApp para enviar seu projeto diretamente à equipe."));
    window.open(whatsapp, "_blank", "noopener,noreferrer");
    setSent(true);
  }

  return <dialog ref={dialog} className={s.dialog} aria-labelledby="quiz-title" onCancel={onClose} onClick={event => { if (event.target === event.currentTarget) onClose(); }}>
    <div className={s.quizBody}>
      <button className={s.close} onClick={onClose} aria-label="Fechar formulário">×</button>
      <p className={s.eyebrow}>SEU PROJETO COMAR</p>
      <p className={s.progressLabel}>{sent ? "Próximo passo: WhatsApp" : `Etapa ${step + 1} de 5`}</p>
      <div className={s.progress}><span style={{ width: `${(step + 1) * 20}%` }}/></div>
      <h2 ref={heading} tabIndex={-1} id="quiz-title">{sent ? "Agora é só enviar a mensagem." : isContact ? "Como podemos chamar você?" : steps[step].title}</h2>
      {sent ? <div className={s.success}><p>Seu WhatsApp foi aberto com os detalhes do projeto. Envie a mensagem para iniciar a conversa com a Comar.</p><a className={s.cta} href={whatsapp} target="_blank" rel="noopener noreferrer">Abrir WhatsApp novamente ↗</a></div> : !isContact ? <div className={s.choices}>{steps[step].options.map(option => <button key={option} type="button" onClick={() => { setAnswers({ ...answers, [steps[step].key]: option }); setStep(step + 1); }} aria-pressed={answers[steps[step].key] === option}>{option}<span aria-hidden="true">→</span></button>)}</div> : <form onSubmit={submit} className={s.contactForm}>
        <label htmlFor="projeto-nome">Seu nome</label><input id="projeto-nome" autoComplete="name" required maxLength={100} value={name} onChange={e => setName(e.target.value)} placeholder="Como você gosta de ser chamado?"/>
        <label htmlFor="projeto-whatsapp">WhatsApp com DDD</label><input id="projeto-whatsapp" type="tel" inputMode="tel" autoComplete="tel-national" required minLength={10} maxLength={16} value={phone} onChange={e => setPhone(e.target.value.replace(/[^\d()+ -]/g, ""))} placeholder="(53) 99999-9999"/>
        <p>Ao continuar, abriremos o WhatsApp com sua mensagem preenchida. Envie a mensagem para iniciar o atendimento.</p><button className={s.cta} type="submit">Continuar no WhatsApp ↗</button><small>Usaremos seus dados para atender ao seu pedido de projeto.</small>
      </form>}
      {error && <p className={s.formError} role="alert">{error}</p>}
      {step > 0 && !sent && <button className={s.back} onClick={() => setStep(step - 1)}>← Voltar</button>}
    </div>
  </dialog>;
}
