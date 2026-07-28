"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import QuoteForm from "@/components/QuoteForm";

interface QuoteModalContextValue {
  openQuoteModal: () => void;
}

const QuoteModalContext = createContext<QuoteModalContextValue | null>(null);

export function useQuoteModal() {
  const ctx = useContext(QuoteModalContext);
  if (!ctx) {
    throw new Error("useQuoteModal must be used within QuoteModalProvider");
  }
  return ctx;
}

export default function QuoteModalProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);

  const openQuoteModal = useCallback(() => setOpen(true), []);
  const closeQuoteModal = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;

    document.body.style.overflow = "hidden";
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeQuoteModal();
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, closeQuoteModal]);

  const value = useMemo(() => ({ openQuoteModal }), [openQuoteModal]);

  return (
    <QuoteModalContext.Provider value={value}>
      {children}
      {open && (
        <div
          className="modal-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Solicitar orçamento"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeQuoteModal();
          }}
        >
          <div className="modal-panel">
            <button
              type="button"
              className="modal-close"
              aria-label="Fechar"
              onClick={closeQuoteModal}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                <path d="M6 6l12 12M18 6 6 18" />
              </svg>
            </button>
            <p className="eyebrow">Orçamento</p>
            <h2 className="modal-title">Solicite seu projeto</h2>
            <p className="modal-lede">
              Preencha os dados abaixo. Sua mensagem só é enviada pelo
              WhatsApp depois de preencher tudo.
            </p>
            <QuoteForm onSubmitted={closeQuoteModal} />
          </div>
        </div>
      )}
    </QuoteModalContext.Provider>
  );
}
