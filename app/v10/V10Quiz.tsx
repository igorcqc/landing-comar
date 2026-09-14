"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { getStoredUtmParams } from "@/lib/utm";
import { generateEventId, getFbc, getFbp, trackMetaEvent } from "@/lib/meta";
import styles from "./v10.module.css";

const WHATSAPP_NUMBER = "5553999044420";

const STEPS = [
  {
    label: "Ambiente",
    title: "Qual ambiente você quer transformar?",
    text: "Escolha o espaço que mais representa o seu projeto.",
  },
  {
    label: "Local",
    title: "Onde será realizado o projeto?",
    text: "Atendemos São José do Norte, Rio Grande e Cassino.",
  },
  {
    label: "Momento",
    title: "Quando você pretende começar?",
    text: "Isso nos ajuda a entender o seu momento de compra.",
  },
  {
    label: "Planejamento",
    title: "Qual faixa de investimento você imagina?",
    text: "Uma referência para orientarmos materiais e possibilidades.",
  },
  {
    label: "Contato",
    title: "Para quem enviamos os próximos passos?",
    text: "A equipe da Comar continua o atendimento pelo WhatsApp.",
  },
];

const AMBIENTES = [
  "Cozinha ou área gourmet",
  "Dormitório",
  "Closet",
  "Sala",
  "Banheiro",
  "Casa completa",
  "Outro ambiente",
];

const LOCAIS = ["São José do Norte", "Rio Grande", "Cassino"];
const PRAZOS = [
  "Quero começar agora",
  "Nos próximos 3 meses",
  "Ainda estou planejando",
];
const INVESTIMENTOS = [
  "Até R$15 mil",
  "R$15 mil a R$30 mil",
  "Acima de R$30 mil",
];

function formatWhatsApp(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return digits;
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

function trackCustom(name: string, data: Record<string, unknown> = {}) {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("trackCustom", name, data);
  }
}

interface Props {
  open: boolean;
  source: string;
  onClose: () => void;
}

export default function V10Quiz({ open, source, onClose }: Props) {
  const [step, setStep] = useState(0);
  const [ambiente, setAmbiente] = useState("");
  const [cidade, setCidade] = useState("");
  const [prazo, setPrazo] = useState("");
  const [investimento, setInvestimento] = useState("");
  const [nome, setNome] = useState("");
  const [whats, setWhats] = useState("");
  const [website, setWebsite] = useState("");
  const [formStartedAt, setFormStartedAt] = useState(Date.now());
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const closeRef = useRef<HTMLButtonElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;

    previousFocus.current = document.activeElement as HTMLElement;
    document.body.style.overflow = "hidden";
    setFormStartedAt(Date.now());
    setStep(0);
    setAmbiente("");
    setCidade("");
    setPrazo("");
    setInvestimento("");
    setNome("");
    setWhats("");
    setWebsite("");
    setError("");

    trackCustom("QuizStart", { source, version: "v10" });
    closeRef.current?.focus();

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
      previousFocus.current?.focus();
    };
  }, [open, onClose, source]);

  if (!open) return null;

  const current = STEPS[step];
  const progress = ((step + 1) / STEPS.length) * 100;

  function advance(next: number, answer: string) {
    trackCustom("QuizStep", {
      version: "v10",
      source,
      step: step + 1,
      label: STEPS[step].label,
      answer,
    });
    setStep(next);
  }

  function goBack() {
    setError("");
    setStep((currentStep) => Math.max(0, currentStep - 1));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const phoneDigits = whats.replace(/\D/g, "");
    if (nome.trim().length < 2) {
      setError("Digite seu nome para continuar.");
      return;
    }
    if (phoneDigits.length < 10) {
      setError("Digite um WhatsApp válido com DDD.");
      return;
    }

    setSubmitting(true);
    const eventId = generateEventId();

    try {
      const response = await fetch("/api/lead-v10", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: nome.trim(),
          whats,
          cidade,
          ambiente,
          investimento,
          prazo,
          website,
          formStartedAt,
          utm: getStoredUtmParams(),
          eventId,
          fbp: getFbp(),
          fbc: getFbc(),
          eventSourceUrl: window.location.href,
        }),
      });

      const data = await response.json().catch(() => ({}));
      if (!response.ok || !data?.ok) {
        throw new Error(data?.error || "Não foi possível enviar.");
      }

      trackMetaEvent(
        "Lead",
        {
          content_name: ambiente,
          content_category: "projeto_v10",
          value: 0,
          currency: "BRL",
        },
        eventId
      );
      trackCustom("QuizComplete", {
        version: "v10",
        source,
        ambiente,
        cidade,
        prazo,
        investimento,
      });

      const message = [
        `Olá! Meu nome é ${nome.trim()}.`,
        `Quero planejar: ${ambiente}.`,
        `Local do projeto: ${cidade}.`,
        `Momento: ${prazo}.`,
        `Faixa de investimento: ${investimento}.`,
        `Meu WhatsApp: ${whats}.`,
      ].join("\n");

      const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
      trackCustom("WhatsAppClick", { version: "v10", source: "quiz_complete" });
      window.location.assign(whatsappUrl);
    } catch (submitError) {
      console.error(submitError);
      setError(
        "Não conseguimos registrar agora. Confira os dados e tente novamente."
      );
      setSubmitting(false);
    }
  }

  function choiceList(
    items: string[],
    selected: string,
    setter: (value: string) => void,
    next: number
  ) {
    return (
      <div className={styles.quizChoices}>
        {items.map((item) => (
          <button
            key={item}
            type="button"
            className={selected === item ? styles.quizChoiceActive : styles.quizChoice}
            onClick={() => {
              setter(item);
              advance(next, item);
            }}
          >
            <span>{item}</span>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M5 12h14M14 7l5 5-5 5" />
            </svg>
          </button>
        ))}
      </div>
    );
  }

  return (
    <div
      className={styles.quizOverlay}
      role="dialog"
      aria-modal="true"
      aria-labelledby="v10-quiz-title"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !submitting) onClose();
      }}
    >
      <div className={styles.quizShell}>
        <aside className={styles.quizAside}>
          <div>
            <span className={styles.quizBrand}>COMAR</span>
            <small>Móveis planejados</small>
          </div>
          <blockquote>
            “Seu projeto começa entendendo como você realmente quer viver o ambiente.”
          </blockquote>
          <div className={styles.quizProof}>
            <strong>5,0 ★</strong>
            <span>117 avaliações no Google</span>
          </div>
        </aside>

        <div className={styles.quizMain}>
          <button
            ref={closeRef}
            type="button"
            className={styles.quizClose}
            onClick={onClose}
            disabled={submitting}
            aria-label="Fechar"
          >
            ×
          </button>

          <div className={styles.quizMeta}>
            <span>Etapa {step + 1} de {STEPS.length}</span>
            <span>menos de 1 minuto</span>
          </div>
          <div className={styles.quizProgress}>
            <span style={{ width: `${progress}%` }} />
          </div>

          <form className={styles.quizForm} onSubmit={handleSubmit}>
            <div className={styles.quizHeading}>
              <span>{current.label}</span>
              <h2 id="v10-quiz-title">{current.title}</h2>
              <p>{current.text}</p>
            </div>

            {step === 0 && choiceList(AMBIENTES, ambiente, setAmbiente, 1)}
            {step === 1 && choiceList(LOCAIS, cidade, setCidade, 2)}
            {step === 2 && choiceList(PRAZOS, prazo, setPrazo, 3)}
            {step === 3 &&
              choiceList(INVESTIMENTOS, investimento, setInvestimento, 4)}

            {step === 4 && (
              <div className={styles.contactStep}>
                <label>
                  <span>Seu nome</span>
                  <input
                    type="text"
                    value={nome}
                    onChange={(event) => setNome(event.target.value)}
                    autoComplete="name"
                    placeholder="Como podemos chamar você?"
                    required
                  />
                </label>
                <label>
                  <span>WhatsApp</span>
                  <input
                    type="tel"
                    inputMode="tel"
                    value={whats}
                    onChange={(event) => setWhats(formatWhatsApp(event.target.value))}
                    autoComplete="tel"
                    placeholder="(53) 99999-9999"
                    required
                  />
                </label>

                <label className={styles.honeypot} aria-hidden="true">
                  Website
                  <input
                    tabIndex={-1}
                    autoComplete="off"
                    value={website}
                    onChange={(event) => setWebsite(event.target.value)}
                  />
                </label>

                <p className={styles.privacy}>
                  Ao continuar, você autoriza a Comar a entrar em contato sobre
                  seu projeto. Seus dados são usados apenas para atendimento.
                </p>

                {error ? <p className={styles.quizError}>{error}</p> : null}

                <button
                  type="submit"
                  className={styles.quizSubmit}
                  disabled={submitting}
                >
                  {submitting ? "Enviando..." : "Continuar no WhatsApp"}
                  {!submitting ? (
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M5 12h14M14 7l5 5-5 5" />
                    </svg>
                  ) : null}
                </button>
              </div>
            )}

            {step > 0 && !submitting ? (
              <button type="button" className={styles.quizBack} onClick={goBack}>
                ← Voltar
              </button>
            ) : null}
          </form>
        </div>
      </div>
    </div>
  );
}
