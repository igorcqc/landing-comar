"use client";

import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
} from "react";
import { getStoredUtmParams } from "@/lib/utm";
import { generateEventId, getFbc, getFbp, trackMetaEvent } from "@/lib/meta";
import styles from "./v2.module.css";

const WHATSAPP_NUMBER = "5553999044420";

const AMBIENTES = [
  "Cozinha ou área gourmet",
  "Dormitório",
  "Closet",
  "Sala",
  "Banheiro",
  "Casa completa",
  "Outro ambiente",
];

const LOCAIS_ATENDIMENTO = ["São José do Norte", "Rio Grande", "Cassino"];

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

const STEP_COPY = [
  {
    kicker: "Seu projeto",
    title: "Qual ambiente você quer transformar?",
    text: "Escolha o espaço que melhor representa o seu momento.",
  },
  {
    kicker: "Atendimento",
    title: "Onde seu projeto será realizado?",
    text: "Selecione o local de atendimento para continuarmos.",
  },
  {
    kicker: "Seu momento",
    title: "Quando você pretende começar?",
    text: "Escolha a opção que mais combina com o seu planejamento.",
  },
  {
    kicker: "Planejamento",
    title: "Qual faixa você imagina investir?",
    text: "Essa informação ajuda a orientar materiais e possibilidades desde o início.",
  },
  {
    kicker: "Última etapa",
    title: "Para quem enviamos os próximos passos?",
    text: "A equipe da Comar continuará o atendimento pelo WhatsApp.",
  },
];

interface V2QuoteQuizProps {
  open: boolean;
  onClose: () => void;
}

function formatWhatsApp(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return digits;
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

export default function V2QuoteQuiz({ open, onClose }: V2QuoteQuizProps) {
  const [step, setStep] = useState(0);
  const [ambiente, setAmbiente] = useState("");
  const [localAtendimento, setLocalAtendimento] = useState("");
  const [prazo, setPrazo] = useState("");
  const [investimento, setInvestimento] = useState("");
  const [nome, setNome] = useState("");
  const [whats, setWhats] = useState("");
  const closeRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;

    previousFocusRef.current = document.activeElement as HTMLElement;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleEscape);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEscape);
      previousFocusRef.current?.focus();
    };
  }, [open, onClose]);

  if (!open) return null;

  const copy = STEP_COPY[step];
  const progress = ((step + 1) / STEP_COPY.length) * 100;

  function goBack() {
    const previousStep = Math.max(step - 1, 0);
    if (previousStep === 0) setAmbiente("");
    if (previousStep === 1) setLocalAtendimento("");
    if (previousStep === 2) setPrazo("");
    if (previousStep === 3) setInvestimento("");
    setStep(previousStep);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const eventId = generateEventId();

    trackMetaEvent(
      "Lead",
      {
        content_name: ambiente,
        content_category: "projeto_v2",
      },
      eventId
    );

    fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nome,
        whats,
        cidade: localAtendimento,
        ambiente,
        investimento,
        prazo,
        utm: getStoredUtmParams(),
        eventId,
        fbp: getFbp(),
        fbc: getFbc(),
        eventSourceUrl: window.location.href,
      }),
      keepalive: true,
    }).catch(() => {});

    const message = [
      `Olá! Meu nome é ${nome}.`,
      `Quero planejar: ${ambiente}.`,
      `Local de atendimento: ${localAtendimento}.`,
      `Faixa de investimento: ${investimento}.`,
      `Prazo: ${prazo}.`,
      `Meu WhatsApp para retorno: ${whats}.`,
    ].join("\n");

    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener"
    );
    onClose();
  }

  return (
    <div
      className={styles.quizOverlay}
      role="dialog"
      aria-modal="true"
      aria-labelledby="v2-quiz-title"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className={styles.quizPanel}>
        <div className={styles.quizVisual} aria-hidden="true">
          <div className={styles.quizVisualContent}>
            <span>COMAR</span>
            <p>Seu ambiente começa com uma boa conversa.</p>
          </div>
        </div>

        <div className={styles.quizBody}>
          <button
            ref={closeRef}
            type="button"
            className={styles.quizClose}
            onClick={onClose}
            aria-label="Fechar formulário"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>

          <div className={styles.quizTopline}>
            <span>Etapa {step + 1} de {STEP_COPY.length}</span>
            <span>Leva menos de 2 minutos</span>
          </div>
          <div className={styles.quizProgress} aria-hidden="true">
            <span style={{ width: `${progress}%` }} />
          </div>

          <form onSubmit={handleSubmit} className={styles.quizForm}>
            <div className={styles.quizHeading} aria-live="polite">
              <span>{copy.kicker}</span>
              <h2 id="v2-quiz-title">{copy.title}</h2>
              <p>{copy.text}</p>
            </div>

            {step === 0 && (
              <fieldset className={styles.choiceGrid}>
                <legend className={styles.srOnly}>Ambiente desejado</legend>
                {AMBIENTES.map((item) => (
                  <label className={styles.choiceCard} key={item}>
                    <input
                      type="radio"
                      name="ambiente"
                      value={item}
                      checked={ambiente === item}
                      onChange={() => {
                        setAmbiente(item);
                        setStep(1);
                      }}
                    />
                    <span>{item}</span>
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M5 12h14M14 7l5 5-5 5" />
                    </svg>
                  </label>
                ))}
              </fieldset>
            )}

            {step === 1 && (
              <fieldset className={styles.choiceGrid}>
                <legend className={styles.srOnly}>Local de atendimento</legend>
                {LOCAIS_ATENDIMENTO.map((item) => (
                  <label className={styles.choiceCard} key={item}>
                    <input
                      type="radio"
                      name="localAtendimento"
                      value={item}
                      checked={localAtendimento === item}
                      onChange={() => {
                        setLocalAtendimento(item);
                        setStep(2);
                      }}
                    />
                    <span>{item}</span>
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M5 12h14M14 7l5 5-5 5" />
                    </svg>
                  </label>
                ))}
              </fieldset>
            )}

            {step === 2 && (
              <fieldset className={styles.optionList}>
                <legend className={styles.srOnly}>Prazo para começar</legend>
                {PRAZOS.map((item) => (
                  <label key={item}>
                    <input
                      type="radio"
                      name="prazo"
                      value={item}
                      checked={prazo === item}
                      onChange={() => {
                        setPrazo(item);
                        setStep(3);
                      }}
                    />
                    <span>{item}</span>
                  </label>
                ))}
              </fieldset>
            )}

            {step === 3 && (
              <fieldset className={styles.investmentList}>
                <legend className={styles.srOnly}>Faixa de investimento</legend>
                {INVESTIMENTOS.map((item) => (
                  <label key={item}>
                    <input
                      type="radio"
                      name="investimento"
                      value={item}
                      checked={investimento === item}
                      onChange={() => {
                        setInvestimento(item);
                        setStep(4);
                      }}
                    />
                    <span>
                      <b>{item}</b>
                      <small>Selecionar esta faixa</small>
                    </span>
                    <span className={styles.radioMark} aria-hidden="true" />
                  </label>
                ))}
              </fieldset>
            )}

            {step === 4 && (
              <div className={styles.contactFields}>
                <div className={styles.quizField}>
                  <label htmlFor="v2-nome">Seu nome</label>
                  <input
                    id="v2-nome"
                    type="text"
                    value={nome}
                    onChange={(event) => setNome(event.target.value)}
                    placeholder="Como podemos chamar você?"
                    autoComplete="name"
                    required
                  />
                </div>
                <div className={styles.quizField}>
                  <label htmlFor="v2-whats">Seu WhatsApp</label>
                  <input
                    id="v2-whats"
                    type="tel"
                    inputMode="tel"
                    value={whats}
                    onChange={(event) => setWhats(formatWhatsApp(event.target.value))}
                    placeholder="(53) 99999-9999"
                    autoComplete="tel"
                    minLength={14}
                    required
                  />
                </div>
                <p className={styles.privacyNote}>
                  Seus dados serão usados apenas para o atendimento do seu projeto.
                </p>
              </div>
            )}

            <div className={styles.quizActions}>
              {step > 0 && (
                <button type="button" className={styles.backButton} onClick={goBack}>
                  Voltar
                </button>
              )}
              {step === STEP_COPY.length - 1 ? (
                <button type="submit" className={styles.quizPrimary}>
                  Receber atendimento no WhatsApp
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M5 12h14M14 7l5 5-5 5" />
                  </svg>
                </button>
              ) : null}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
