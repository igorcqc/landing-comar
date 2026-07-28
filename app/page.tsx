"use client";

import Image from "next/image";
import ScrollEffects from "@/components/ScrollEffects";
import ProjectGallery from "@/components/ProjectGallery";
import VideoTestimonialCard from "@/components/VideoTestimonialCard";
import GoogleRatingBadge from "@/components/GoogleRatingBadge";
import { useQuoteModal } from "@/components/QuoteModal";

const DEPOIMENTOS_ESCRITOS = [
  {
    quote:
      "Ótima experiência! Empresa nota 10, desde a parte de vendas, ao planejamento dos móveis e a montagem! Serviço completo! Parabéns!",
    who: "Giovana Westendorff Pegoraro",
  },
  {
    quote:
      "Gostaria de parabenizar toda equipe da Comar Móveis, pelo ótimo atendimento e entrega perfeita. A equipe de montagem super atenciosa e organizada. Os móveis ficaram exatamente como imaginei. Super recomendo.",
    who: "Hélia Smidt",
  },
  {
    quote:
      "Nossa experiência com a Comar foi ótima! Foram super atenciosos e detalhistas desde o início. Entregaram no prazo prometido e a qualidade dentro das nossas expectativas.",
    who: "Dayara Velasco",
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
            <div className="section-cta reveal">
              <button
                type="button"
                className="btn btn-primary"
                onClick={openQuoteModal}
              >
                Quero um projeto assim
              </button>
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
                nome="Everton e Katia"
                ambiente="Depoimento"
              />
              <VideoTestimonialCard
                video="/videos/depoimento-02.mp4"
                poster="/videos/posters/depoimento-02.jpg"
                nome="Idelaine"
                ambiente="Depoimento"
              />
            </div>
            <div className="section-cta reveal">
              <button
                type="button"
                className="btn btn-primary"
                onClick={openQuoteModal}
              >
                Quero meu orçamento também
              </button>
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
              <h2>Solicite seu projeto</h2>
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
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={openQuoteModal}
                >
                  Solicitar orçamento
                </button>
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
