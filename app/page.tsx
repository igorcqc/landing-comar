"use client";

import Image from "next/image";
import ScrollEffects from "@/components/ScrollEffects";
import ProjectGallery from "@/components/ProjectGallery";
import VideoTestimonialCard from "@/components/VideoTestimonialCard";
import GoogleRatingBadge from "@/components/GoogleRatingBadge";
import { useQuoteModal } from "@/components/QuoteModal";

const INSTAGRAM_LINK = "https://www.instagram.com/comarmoveis/";
const FACEBOOK_LINK = "https://www.facebook.com/comarmoveis";
const GOOGLE_MAPS_LINK =
  "https://www.google.com/maps/place/Comar+M%C3%B3veis+Planejados/@-32.0098652,-52.0403119,17z/data=!3m1!4b1!4m6!3m5!1s0x95119d235c6770bb:0xdb716984f62c2203!8m2!3d-32.0098652!4d-52.0403119!16s%2Fg%2F11qqfgs9l9";

const DEPOIMENTOS_ESCRITOS = [
  {
    quote:
      "Cada detalhe do projeto foi pensado pro nosso espaço. A instalação foi rápida e o acabamento surpreendeu.",
    who: "exemplo ilustrativo, cliente Cozinha",
  },
  {
    quote:
      "Prazo cumprido do jeito que foi combinado, com atualização em cada etapa da fabricação.",
    who: "exemplo ilustrativo, cliente Closet",
  },
  {
    quote:
      "Orçamento justo e sem enrolação. Hoje é impossível pensar no escritório sem o móvel que a Comar fez.",
    who: "exemplo ilustrativo, cliente Escritório",
  },
];

export default function Home() {
  const { openQuoteModal } = useQuoteModal();

  return (
    <>
      <ScrollEffects />

      <header className="site-header" id="header">
        <div className="header-inner">
          <a className="wordmark" href="#top">
            Comar Móveis Planejados
          </a>
          <nav className="main-nav">
            <a href="#projetos">Projetos</a>
            <a href="#depoimentos">Depoimentos</a>
            <a href="#localizacao">Localização</a>
          </nav>
          <div className="header-actions">
            <button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={openQuoteModal}
            >
              Orçamento
            </button>
            <button
              type="button"
              className="icon-btn"
              onClick={openQuoteModal}
              aria-label="WhatsApp"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 11.5a8.4 8.4 0 0 1-8.9 8.4 8.5 8.5 0 0 1-4-1L3 20l1.2-4.8a8.4 8.4 0 0 1-1-4A8.4 8.4 0 0 1 11.9 3a8.4 8.4 0 0 1 9.1 8.5z" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <main>
        <section className="hero" id="top">
          <div className="hero-inner">
            <div className="hero-copy reveal">
              <p className="eyebrow">Móveis planejados · SJN &amp; Rio Grande</p>
              <h1>O móvel planejado que transforma sua casa no lugar que você sempre sonhou.</h1>
              <p className="lede">
                Projeto, fabricação e instalação próprios, sob medida para
                cada canto da sua casa. Mais de 400 ambientes entregues
                desde 2021, do apartamento compacto ao espaço comercial.
              </p>
              <div className="hero-ctas">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={openQuoteModal}
                >
                  Solicitar orçamento
                </button>
                <a className="btn btn-outline" href="#projetos">
                  Ver projetos
                </a>
              </div>
              <GoogleRatingBadge variant="inline" />
            </div>
            <div className="hero-art reveal">
              <Image
                src="/projetos/cozinha-02.jpg"
                alt="Cozinha planejada pela Comar Móveis Planejados, com acabamento escuro e iluminação linear"
                fill
                priority
                sizes="(max-width: 900px) 100vw, 50vw"
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>
        </section>

        <section className="trust">
          <div className="trust-inner reveal">
            <div className="trust-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
                <circle cx="12" cy="12" r="9" />
                <path d="M8 12l3 3 5-6" />
              </svg>
              <div>
                <strong>+400 projetos</strong>
                <span>entregues desde 2021</span>
              </div>
            </div>
            <div className="trust-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
                <path d="M12 2 3 7v6c0 5 4 8 9 9 5-1 9-4 9-9V7z" />
              </svg>
              <div>
                <strong>Fábrica própria</strong>
                <span>do projeto à instalação</span>
              </div>
            </div>
            <div className="trust-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
                <path d="M4 17h16M4 12h16M4 7h10" />
              </svg>
              <div>
                <strong>Orçamento gratuito</strong>
                <span>sem compromisso</span>
              </div>
            </div>
          </div>
        </section>

        <hr className="divider" />

        <section id="projetos">
          <div className="section-inner">
            <div className="section-head reveal">
              <p className="eyebrow">Ambientes</p>
              <h2>Olhe os ambientes que já executamos</h2>
              <p>Projetos reais, entregues e instalados pela nossa equipe.</p>
            </div>
            <ProjectGallery />
            <div className="grid-cta reveal">
              <a
                className="btn btn-outline"
                href={INSTAGRAM_LINK}
                target="_blank"
                rel="noopener noreferrer"
              >
                Ver mais projetos no Instagram →
              </a>
            </div>
          </div>
        </section>

        <section id="depoimentos" style={{ background: "var(--cream-panel)" }}>
          <div className="section-inner">
            <div className="section-head reveal">
              <p className="eyebrow">Depoimentos</p>
              <h2>Quem já planejou com a gente conta como foi</h2>
              <p>Depoimentos em vídeo dos nossos clientes.</p>
            </div>
            <div className="video-grid reveal">
              <VideoTestimonialCard
                video="/videos/depoimento-01.mp4"
                poster="/videos/posters/depoimento-01.jpg"
                nome="Cliente Comar"
                ambiente="Depoimento"
                quote="Confira o depoimento em vídeo."
              />
              <VideoTestimonialCard
                video="/videos/depoimento-02.mp4"
                poster="/videos/posters/depoimento-02.jpg"
                nome="Cliente Comar"
                ambiente="Depoimento"
                quote="Confira o depoimento em vídeo."
              />
            </div>
          </div>
        </section>

        <section id="avaliacoes" style={{ background: "var(--cream-panel)" }}>
          <div className="section-inner">
            <div className="section-head reveal">
              <p className="eyebrow">Avaliações</p>
              <h2>Os móveis planejados mais bem avaliados da região</h2>
            </div>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: "3rem" }}>
              <GoogleRatingBadge variant="block" />
            </div>
            <div className="t-grid reveal">
              {DEPOIMENTOS_ESCRITOS.map((item) => (
                <div className="t-card" key={item.who}>
                  <div className="stars">★★★★★</div>
                  <p className="quote">&quot;{item.quote}&quot;</p>
                  <p className="who">{item.who}</p>
                </div>
              ))}
            </div>
            <div className="t-foot reveal">
              <p className="note">
                depoimentos escritos ilustrativos, a substituir por
                avaliações reais do Google
              </p>
              <a
                className="g-link"
                href={GOOGLE_MAPS_LINK}
                target="_blank"
                rel="noopener noreferrer"
              >
                Ver avaliações no Google →
              </a>
            </div>
          </div>
        </section>

        <section className="statement">
          <blockquote className="reveal">
            Móvel planejado: decora, organiza, possibilita,{" "}
            <b>transforma o ambiente e a vida.</b>
          </blockquote>
          <button
            type="button"
            className="btn btn-primary reveal"
            onClick={openQuoteModal}
          >
            Quero um projeto assim
          </button>
        </section>

        <section id="orcamento" style={{ background: "var(--cream-panel)" }}>
          <div className="section-inner">
            <div className="cta-panel reveal">
              <p className="eyebrow">Orçamento</p>
              <h2>Solicite seu projeto sem compromisso</h2>
              <p className="lede" style={{ marginTop: "1.1rem", color: "var(--ink-soft)" }}>
                Preencha os dados no formulário e nossa equipe retorna pelo
                WhatsApp com os próximos passos da medição.
              </p>
              <button
                type="button"
                className="btn btn-primary"
                onClick={openQuoteModal}
              >
                Solicitar orçamento
              </button>
            </div>
          </div>
        </section>

        <section id="localizacao">
          <div className="section-inner">
            <div className="loc-wrap">
              <div className="loc-info reveal">
                <p className="eyebrow">Localização</p>
                <h2 style={{ marginBottom: "1.6rem" }}>
                  Nos visite ou peça atendimento em casa
                </h2>
                <dl>
                  <dt>Endereço</dt>
                  <dd>
                    R. Ramiro Barcelos, 910, Centro
                    <br />
                    São José do Norte / RS, 96225-000
                  </dd>
                  <dt>WhatsApp</dt>
                  <dd>(53) 99904-4420</dd>
                  <dt>Atendemos</dt>
                  <dd>São José do Norte e Rio Grande</dd>
                </dl>
                <a
                  className="btn btn-outline"
                  href="https://www.google.com/maps/search/?api=1&query=R.+Ramiro+Barcelos+910+Centro+S%C3%A3o+Jos%C3%A9+do+Norte+RS"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Abrir no Google Maps
                </a>
              </div>
              <div className="map-placeholder reveal">
                <iframe
                  className="map-frame"
                  src="https://www.google.com/maps?q=R.+Ramiro+Barcelos,+910,+Centro,+S%C3%A3o+Jos%C3%A9+do+Norte,+RS,+96225-000&output=embed"
                  title="Localização da Comar Móveis Planejados no Google Maps"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="footer-inner">
          <div className="footer-top">
            <a className="wordmark" href="#top">
              Comar Móveis Planejados
            </a>
            <div className="footer-links">
              <a href="#projetos">Projetos</a>
              <a href="#depoimentos">Depoimentos</a>
              <a href="#localizacao">Localização</a>
            </div>
            <div className="footer-social">
              <a href={INSTAGRAM_LINK} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" stroke="none" />
                </svg>
              </a>
              <a href={FACEBOOK_LINK} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M14 9h3V6h-3a3 3 0 0 0-3 3v2H9v3h2v6h3v-6h3l1-3h-4v-1.5A.5.5 0 0 1 14 9z" />
                </svg>
              </a>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© 2026 Comar Móveis Planejados</span>
            <span>Móveis planejados e complementos · SJN &amp; Rio Grande</span>
          </div>
        </div>
      </footer>
    </>
  );
}
