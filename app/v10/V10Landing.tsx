"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { captureUtmParams } from "@/lib/utm";
import V10Quiz from "./V10Quiz";
import { Arrow, Check } from "./V10UI";
import { TrustAndProjects } from "./V10TrustProjects";
import { ProcessAndStories } from "./V10ProcessStories";
import { FaqFinalLocation, V10Footer } from "./V10FaqFinal";
import styles from "./v10.module.css";

function trackCustom(name: string, data: Record<string, unknown> = {}) {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("trackCustom", name, data);
  }
}

export default function V10Landing() {
  const [quizOpen, setQuizOpen] = useState(false);
  const [quizSource, setQuizSource] = useState("unknown");
  const [stickyVisible, setStickyVisible] = useState(false);

  useEffect(() => {
    captureUtmParams();

    const revealElements =
      document.querySelectorAll<HTMLElement>("[data-v10-reveal]");

    let observer: IntersectionObserver | undefined;
    if ("IntersectionObserver" in window) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add(styles.revealed);
            observer?.unobserve(entry.target);
          });
        },
        { threshold: 0.12 }
      );

      revealElements.forEach((element) => observer?.observe(element));
    } else {
      revealElements.forEach((element) =>
        element.classList.add(styles.revealed)
      );
    }

    const milestones = new Set<number>();
    const onScroll = () => {
      const doc = document.documentElement;
      const available = Math.max(1, doc.scrollHeight - window.innerHeight);
      const percent = Math.round((window.scrollY / available) * 100);

      [25, 50, 75].forEach((mark) => {
        if (percent >= mark && !milestones.has(mark)) {
          milestones.add(mark);
          trackCustom("ScrollDepth", { version: "v10", percent: mark });
        }
      });

      setStickyVisible(window.scrollY > window.innerHeight * 0.75);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      observer?.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const openQuiz = useCallback((source: string) => {
    trackCustom("CTA_Click", { version: "v10", source });
    setQuizSource(source);
    setQuizOpen(true);
  }, []);

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <a
          href="#inicio"
          className={styles.brand}
          aria-label="Comar Móveis, início"
        >
          <span>COMAR</span>
          <small>Móveis planejados</small>
        </a>

        <nav className={styles.nav} aria-label="Navegação principal">
          <a href="#projetos">Projetos</a>
          <a href="#processo">Como funciona</a>
          <a href="#clientes">Clientes</a>
          <a href="#faq">Dúvidas</a>
        </nav>

        <button
          type="button"
          className={styles.headerButton}
          onClick={() => openQuiz("header")}
        >
          Quero meu projeto
          <Arrow />
        </button>
      </header>

      <main>
        <section className={styles.hero} id="inicio">
          <div className={styles.heroBackdrop}>
            <Image
              src="/projetos/cozinha-02.jpg"
              alt="Cozinha planejada premium executada pela Comar Móveis"
              fill
              priority
              sizes="100vw"
              className={styles.heroImage}
            />
            <div className={styles.heroShade} />
          </div>

          <div className={styles.heroContent}>
            <div className={styles.heroCopy} data-v10-reveal>
              <div className={styles.googlePill}>
                <span>★★★★★</span>
                <b>5,0 no Google</b>
                <small>117 avaliações</small>
              </div>

              <p className={styles.kicker}>
                Móveis planejados · São José do Norte, Rio Grande e Cassino
              </p>

              <h1>
                Sua casa merece um projeto pensado
                <em> para a vida que acontece dentro dela.</em>
              </h1>

              <p className={styles.heroText}>
                Ambientes sob medida, com fábrica própria e acompanhamento do
                projeto à instalação — para você ter beleza, organização e
                confiança em cada detalhe.
              </p>

              <div className={styles.heroActions}>
                <button
                  type="button"
                  className={styles.primaryButton}
                  onClick={() => openQuiz("hero")}
                >
                  Quero planejar meu ambiente
                  <Arrow />
                </button>
                <div className={styles.microcopy}>
                  <Check />
                  <span>Leva menos de 1 minuto</span>
                </div>
              </div>
            </div>

            <div className={styles.heroProof} data-v10-reveal>
              <div>
                <strong>400+</strong>
                <span>ambientes entregues desde 2021</span>
              </div>
              <div>
                <strong>Fábrica própria</strong>
                <span>mais controle do projeto à instalação</span>
              </div>
              <div>
                <strong>Atendimento local</strong>
                <span>uma equipe perto de você</span>
              </div>
            </div>
          </div>

          <div className={styles.scrollHint} aria-hidden="true">
            <span />
            conheça a Comar
          </div>
        </section>

        <TrustAndProjects openQuiz={openQuiz} />
        <ProcessAndStories openQuiz={openQuiz} />
        <FaqFinalLocation openQuiz={openQuiz} />
      </main>

      <V10Footer />

      <button
        type="button"
        className={
          stickyVisible
            ? `${styles.mobileSticky} ${styles.mobileStickyVisible}`
            : styles.mobileSticky
        }
        onClick={() => openQuiz("mobile_sticky")}
      >
        Quero meu projeto
        <Arrow />
      </button>

      <V10Quiz
        open={quizOpen}
        source={quizSource}
        onClose={() => setQuizOpen(false)}
      />
    </div>
  );
}
