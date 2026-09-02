"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { captureUtmParams } from "@/lib/utm";
import { trackMetaEvent } from "@/lib/meta";
import V2QuoteQuiz from "./V2QuoteQuiz";
import styles from "./v2.module.css";

const CATEGORIES = [
  {
    name: "Cozinhas",
    description: "Fluxo inteligente para a rotina ganhar leveza.",
    image: "/projetos/cozinha-02.jpg",
  },
  {
    name: "Dormitórios",
    description: "Organização, aconchego e cada centímetro bem pensado.",
    image: "/projetos/quarto-03.jpg",
  },
  {
    name: "Closets",
    description: "Tudo no lugar, com acabamento feito para durar.",
    image: "/projetos/closet-03.jpg",
  },
  {
    name: "Salas & banheiros",
    description: "Soluções sob medida para completar a casa.",
    image: "/projetos/banheiro-01.jpg",
  },
];

const REVIEWS = [
  {
    quote:
      "Ótima experiência! Empresa nota 10, desde a parte de vendas ao planejamento dos móveis e a montagem.",
    name: "Giovana Westendorff Pegoraro",
  },
  {
    quote:
      "Atendimento e entrega perfeitos. Os móveis ficaram exatamente como imaginei. Super recomendo.",
    name: "Hélia Smidt",
  },
  {
    quote:
      "Foram super atenciosos e detalhistas desde o início. Entregaram no prazo prometido e com muita qualidade.",
    name: "Dayara Velasco",
  },
];

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12h14M14 7l5 5-5 5" />
    </svg>
  );
}

function SealIcon({ type }: { type: "project" | "factory" | "support" | "finish" }) {
  if (type === "project") {
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path d="M6 25V9l10-5 10 5v16H6Z" />
        <path d="M11 25v-8h10v8M10 12h2M15 12h2M20 12h2" />
      </svg>
    );
  }
  if (type === "factory") {
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path d="M5 26V12l8 4v-4l8 4V6h6v20H5Z" />
        <path d="M10 21h2M16 21h2M22 21h2" />
      </svg>
    );
  }
  if (type === "support") {
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path d="M7 15a9 9 0 0 1 18 0v8" />
        <path d="M7 16H4v7h5v-7H7ZM25 16h3v7h-5v-7h2ZM23 25c-2 3-6 3-8 3" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <path d="m16 4 3.2 6.3L26 12l-4.8 5 1 7-6.2-3.2L9.8 24l1-7L6 12l6.8-1.7L16 4Z" />
      <path d="m12.5 16 2.2 2.2 4.8-5" />
    </svg>
  );
}

export default function V2Landing() {
  const [quizOpen, setQuizOpen] = useState(false);

  useEffect(() => {
    captureUtmParams();

    const elements = document.querySelectorAll<HTMLElement>("[data-v2-reveal]");
    if (!("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add(styles.visible));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add(styles.visible);
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12 }
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  const openQuiz = useCallback((source: string) => {
    trackMetaEvent("ViewContent", {
      content_name: `abriu_projeto_v2_${source}`,
      content_category: "projeto_v2",
    });
    setQuizOpen(true);
  }, []);

  const closeQuiz = useCallback(() => setQuizOpen(false), []);

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <a className={styles.brand} href="#inicio" aria-label="Comar Móveis - início">
          <span>COMAR</span>
          <small>Móveis planejados</small>
        </a>
        <nav className={styles.navigation} aria-label="Navegação principal">
          <a href="#ambientes">Ambientes</a>
          <a href="#processo">Como funciona</a>
          <a href="#historias">Clientes</a>
        </nav>
        <button className={styles.headerCta} type="button" onClick={() => openQuiz("header")}>
          Solicitar projeto
          <ArrowIcon />
        </button>
      </header>

      <main>
        <section className={styles.hero} id="inicio">
          <div className={styles.heroCopy} data-v2-reveal>
            <span className={styles.eyebrow}>Móveis planejados · SJN, Rio Grande e Cassino</span>
            <h1>
              Sua casa merece um projeto que pareça ter sido feito para ela.
              <em> Porque foi.</em>
            </h1>
            <p>
              Ambientes sob medida que unem estética, organização e a rotina de quem vive neles — do primeiro desenho à instalação.
            </p>
            <div className={styles.heroActions}>
              <button className={styles.primaryCta} type="button" onClick={() => openQuiz("hero")}>
                Quero planejar meu ambiente
                <ArrowIcon />
              </button>
              <span>Comece seu projeto<br />em menos de 2 minutos</span>
            </div>
          </div>

          <div className={styles.heroMedia} data-v2-reveal>
            <div className={styles.heroMainImage}>
              <Image
                src="/projetos/cozinha-02.jpg"
                alt="Cozinha planejada contemporânea executada pela Comar Móveis"
                fill
                priority
                sizes="(max-width: 900px) 100vw, 56vw"
              />
            </div>
            <div className={styles.heroDetailImage}>
              <Image
                src="/projetos/closet-03.jpg"
                alt="Closet planejado com iluminação embutida"
                fill
                sizes="(max-width: 900px) 40vw, 210px"
              />
            </div>
            <div className={styles.heroSeal}>
              <strong>400+</strong>
              <span>ambientes<br />entregues</span>
            </div>
          </div>

          <div className={styles.proofBar} data-v2-reveal>
            <div>
              <b>5,0 no Google</b>
              <span>117 avaliações de clientes</span>
            </div>
            <div>
              <b>Fábrica própria</b>
              <span>Projeto, produção e instalação</span>
            </div>
            <div>
              <b>Desde 2021</b>
              <span>Transformando ambientes na região</span>
            </div>
          </div>
        </section>

        <section className={styles.desireSection}>
          <div className={styles.desireIntro} data-v2-reveal>
            <span className={styles.eyebrow}>Design que acompanha a vida</span>
            <h2>Bonito aos olhos. Inteligente para todos os dias.</h2>
            <p>
              Um bom planejado não ocupa apenas um espaço. Ele organiza a rotina, valoriza a casa e faz cada ambiente trabalhar a seu favor.
            </p>
          </div>
          <div className={styles.desireImage} data-v2-reveal>
            <Image
              src="/projetos/sala-02.jpg"
              alt="Sala planejada com painel de televisão e iluminação indireta"
              fill
              sizes="(max-width: 900px) 100vw, 52vw"
            />
            <div className={styles.imageCaption}>
              <span>Projeto real Comar</span>
              <b>Sala sob medida</b>
            </div>
          </div>
        </section>

        <section className={styles.categoriesSection} id="ambientes">
          <div className={styles.sectionHeadingLight} data-v2-reveal>
            <span>Ambientes para viver melhor</span>
            <h2>Comece pelo espaço que mais pede uma transformação.</h2>
          </div>
          <div className={styles.categoryGrid}>
            {CATEGORIES.map((category, index) => (
              <article className={styles.categoryCard} data-v2-reveal key={category.name}>
                <button type="button" onClick={() => openQuiz(`categoria_${index + 1}`)} aria-label={`Solicitar projeto para ${category.name}`}>
                  <div className={styles.categoryImage}>
                    <Image
                      src={category.image}
                      alt={`Projeto de ${category.name.toLowerCase()} realizado pela Comar Móveis`}
                      fill
                      sizes="(max-width: 700px) 80vw, (max-width: 1100px) 42vw, 25vw"
                    />
                  </div>
                  <div className={styles.categoryContent}>
                    <span>0{index + 1}</span>
                    <h3>{category.name}</h3>
                    <p>{category.description}</p>
                    <b>Quero fazer meu projeto <ArrowIcon /></b>
                  </div>
                </button>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.whySection}>
          <div className={styles.centerHeading} data-v2-reveal>
            <span className={styles.eyebrow}>Por que escolher a Comar</span>
            <h2>Um projeto bonito é só o começo.</h2>
          </div>
          <div className={styles.benefitGrid}>
            <article data-v2-reveal>
              <SealIcon type="project" />
              <h3>Feito para você</h3>
              <p>O projeto nasce das suas medidas, necessidades e referências.</p>
            </article>
            <article data-v2-reveal>
              <SealIcon type="factory" />
              <h3>Fábrica própria</h3>
              <p>Mais controle em cada etapa, da produção à montagem final.</p>
            </article>
            <article data-v2-reveal>
              <SealIcon type="finish" />
              <h3>Acabamento preciso</h3>
              <p>Detalhes pensados para unir beleza, funcionalidade e duração.</p>
            </article>
            <article data-v2-reveal>
              <SealIcon type="support" />
              <h3>Atendimento próximo</h3>
              <p>Você acompanha o projeto com uma equipe da sua região.</p>
            </article>
          </div>
        </section>

        <section className={styles.processSection} id="processo">
          <div className={styles.processMedia} data-v2-reveal>
            <Image
              src="/projetos/quarto-01.jpg"
              alt="Dormitório planejado e instalado pela Comar Móveis"
              fill
              sizes="(max-width: 900px) 100vw, 48vw"
            />
            <div className={styles.processTag}>Do desenho à instalação</div>
          </div>
          <div className={styles.processCopy} data-v2-reveal>
            <span className={styles.eyebrow}>Um processo simples e próximo</span>
            <h2>Seu projeto ganha forma em três etapas.</h2>
            <ol>
              <li>
                <span>01</span>
                <div>
                  <h3>Conte o que você imagina</h3>
                  <p>Entendemos seu ambiente, momento e prioridades.</p>
                </div>
              </li>
              <li>
                <span>02</span>
                <div>
                  <h3>Receba uma proposta sob medida</h3>
                  <p>O projeto traduz suas ideias em uma solução possível e funcional.</p>
                </div>
              </li>
              <li>
                <span>03</span>
                <div>
                  <h3>Veja seu ambiente acontecer</h3>
                  <p>Nossa equipe cuida da fabricação e da instalação.</p>
                </div>
              </li>
            </ol>
            <button className={styles.textCta} type="button" onClick={() => openQuiz("processo")}>
              Começar meu projeto <ArrowIcon />
            </button>
          </div>
        </section>

        <section className={styles.projectsSection}>
          <div className={styles.projectsHeading} data-v2-reveal>
            <div>
              <span className={styles.eyebrow}>Projetos reais</span>
              <h2>Casas diferentes.<br />Soluções únicas.</h2>
            </div>
            <p>
              Cada ambiente abaixo foi projetado, produzido e instalado pela equipe da Comar Móveis.
            </p>
          </div>
          <div className={styles.projectMosaic}>
            <figure className={styles.mosaicTall} data-v2-reveal>
              <Image src="/projetos/cozinha-01.jpg" alt="Cozinha azul planejada pela Comar" fill sizes="(max-width: 700px) 100vw, 43vw" />
              <figcaption>Cozinha · Projeto real</figcaption>
            </figure>
            <figure data-v2-reveal>
              <Image src="/projetos/banheiro-02.jpg" alt="Banheiro planejado em madeira clara" fill sizes="(max-width: 700px) 100vw, 28vw" />
              <figcaption>Banheiro · Projeto real</figcaption>
            </figure>
            <figure data-v2-reveal>
              <Image src="/projetos/sala-03.jpg" alt="Sala com painel planejado e iluminação" fill sizes="(max-width: 700px) 100vw, 28vw" />
              <figcaption>Sala · Projeto real</figcaption>
            </figure>
          </div>
          <div className={styles.mosaicCta} data-v2-reveal>
            <p>Já imaginou um desses ambientes na sua casa?</p>
            <button className={styles.primaryCta} type="button" onClick={() => openQuiz("projetos")}>
              Quero visualizar meu projeto <ArrowIcon />
            </button>
          </div>
        </section>

        <section className={styles.storiesSection} id="historias">
          <div className={styles.storyTop} data-v2-reveal>
            <div className={styles.googleScore}>
              <span>Google</span>
              <strong>5,0</strong>
              <div>★★★★★</div>
              <small>117 avaliações</small>
            </div>
            <div>
              <span className={styles.eyebrow}>Histórias de quem já escolheu a Comar</span>
              <h2>Quando o resultado supera o projeto.</h2>
            </div>
          </div>

          <div className={styles.reviewGrid}>
            {REVIEWS.map((review) => (
              <blockquote data-v2-reveal key={review.name}>
                <div>★★★★★</div>
                <p>“{review.quote}”</p>
                <cite>{review.name}</cite>
                <span>Cliente Comar Móveis</span>
              </blockquote>
            ))}
          </div>

          <div className={styles.videoStories}>
            <div className={styles.videoHeading} data-v2-reveal>
              <span>Veja e ouça</span>
              <h3>Clientes contando a experiência com as próprias palavras.</h3>
            </div>
            <article className={styles.videoCard} data-v2-reveal>
              <video src="/videos/depoimento-01.mp4" poster="/videos/posters/depoimento-01.jpg" controls playsInline preload="metadata" />
              <div><b>Everton e Katia</b><span>Clientes Comar</span></div>
            </article>
            <article className={styles.videoCard} data-v2-reveal>
              <video src="/videos/depoimento-02.mp4" poster="/videos/posters/depoimento-02.jpg" controls playsInline preload="metadata" />
              <div><b>Idelaine</b><span>Cliente Comar</span></div>
            </article>
          </div>
        </section>

        <section className={styles.finalCta}>
          <div className={styles.finalImage} data-v2-reveal>
            <Image
              src="/projetos/cozinha-03.jpg"
              alt="Cozinha contemporânea planejada pela Comar Móveis"
              fill
              sizes="(max-width: 900px) 100vw, 45vw"
            />
          </div>
          <div className={styles.finalCopy} data-v2-reveal>
            <span className={styles.eyebrow}>O próximo ambiente pode ser o seu</span>
            <h2>Vamos transformar a sua ideia em um projeto de verdade?</h2>
            <p>
              Responda algumas perguntas rápidas. Nossa equipe recebe suas preferências e continua o atendimento pelo WhatsApp.
            </p>
            <button className={styles.primaryCta} type="button" onClick={() => openQuiz("final")}>
              Quero fazer meu projeto <ArrowIcon />
            </button>
            <ul>
              <li>Atendimento em São José do Norte</li>
              <li>Rio Grande e Cassino</li>
            </ul>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerBrand}>
          <span>COMAR</span>
          <small>Móveis planejados</small>
        </div>
        <div className={styles.footerAddress}>
          <b>Visite nosso showroom</b>
          <span>R. Ramiro Barcelos, 910 · Centro</span>
          <span>São José do Norte / RS</span>
        </div>
        <div className={styles.footerContact}>
          <b>Atendimento</b>
          <a href="tel:+5553999044420">(53) 99904-4420</a>
          <button type="button" onClick={() => openQuiz("footer")}>Solicitar projeto</button>
        </div>
        <div className={styles.footerBottom}>
          <span>© 2026 Comar Móveis Planejados</span>
          <span>Projeto · fabricação · instalação</span>
        </div>
      </footer>

      <button className={styles.mobileCta} type="button" onClick={() => openQuiz("mobile_fixo")}>
        Solicitar meu projeto <ArrowIcon />
      </button>

      {quizOpen ? <V2QuoteQuiz open onClose={closeQuiz} /> : null}
    </div>
  );
}
