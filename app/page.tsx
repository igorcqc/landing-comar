import ScrollEffects from "@/components/ScrollEffects";
import QuoteForm from "@/components/QuoteForm";

const WHATSAPP_LINK = "https://wa.me/5553999044420";
const INSTAGRAM_LINK = "https://www.instagram.com/comarmoveis/";
const FACEBOOK_LINK = "https://www.facebook.com/comarmoveis";

const PROJETOS_DESTAQUE = [
  {
    label: "Cozinha planejada",
    icon: (
      <svg viewBox="0 0 24 24">
        <rect x="3" y="13" width="18" height="7" rx="1" />
        <path d="M5 13V8a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v5" />
        <circle cx="8" cy="16.5" r="0.6" fill="#6b4426" stroke="none" />
      </svg>
    ),
  },
  {
    label: "Quarto & suíte",
    icon: (
      <svg viewBox="0 0 24 24">
        <rect x="3" y="11" width="18" height="8" rx="2" />
        <path d="M5 11V9a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v2" />
        <path d="M3 19v2M21 19v2" />
      </svg>
    ),
  },
  {
    label: "Closet planejado",
    icon: (
      <svg viewBox="0 0 24 24">
        <rect x="4" y="3" width="16" height="18" rx="1.5" />
        <path d="M12 3v18" />
        <circle cx="9" cy="12" r="0.6" fill="#6b4426" stroke="none" />
        <circle cx="15" cy="12" r="0.6" fill="#6b4426" stroke="none" />
      </svg>
    ),
  },
  {
    label: "Sala & estofados",
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M5 20v-6a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v6" />
        <path d="M3 20h18M5 14V9M19 14V9" />
      </svg>
    ),
  },
];

const AMBIENTES = [
  {
    label: "Residencial",
    bg: "#e7d6bc",
    stroke: "#8a5a2c",
    paths: (
      <>
        <rect x="3" y="13" width="18" height="7" rx="1" />
        <path d="M5 13V8a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v5" />
      </>
    ),
  },
  {
    label: "Comercial",
    bg: "#d9c6ac",
    stroke: "#8a5a2c",
    paths: (
      <>
        <rect x="3" y="7" width="18" height="13" rx="1.5" />
        <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      </>
    ),
  },
  {
    label: "Estofados sob medida",
    bg: "#cbb190",
    stroke: "#6b4523",
    paths: (
      <>
        <path d="M5 20v-6a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v6" />
        <path d="M3 20h18M5 14V9M19 14V9" />
      </>
    ),
  },
];

const DEPOIMENTOS = [
  {
    quote:
      "Cada detalhe do projeto foi pensado pro nosso espaço. A instalação foi rápida e o acabamento surpreendeu.",
    who: "exemplo ilustrativo — cliente Cozinha",
  },
  {
    quote:
      "Prazo cumprido do jeito que foi combinado, com atualização em cada etapa da fabricação.",
    who: "exemplo ilustrativo — cliente Closet",
  },
  {
    quote:
      "Orçamento justo e sem enrolação. Hoje é impossível pensar no escritório sem o móvel que a Comar fez.",
    who: "exemplo ilustrativo — cliente Escritório",
  },
];

export default function Home() {
  return (
    <>
      <ScrollEffects />

      <header className="site-header" id="header">
        <div className="header-inner">
          <a className="wordmark" href="#top">
            Comar
          </a>
          <nav className="main-nav">
            <a href="#projetos">Projetos</a>
            <a href="#ambientes">Ambientes</a>
            <a href="#avaliacoes">Avaliações</a>
            <a href="#localizacao">Localização</a>
          </nav>
          <div className="header-actions">
            <a className="btn btn-primary btn-sm" href="#orcamento">
              Orçamento
            </a>
            <a
              className="icon-btn"
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
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
            </a>
          </div>
        </div>
      </header>

      <main>
        <section className="hero" id="top">
          <div className="hero-inner">
            <div className="hero-copy reveal">
              <p className="eyebrow">Móveis planejados · SJN &amp; Rio Grande</p>
              <h1>Marcenaria sob medida para cada ambiente.</h1>
              <p className="lede">
                Projeto, fabricação e instalação próprios — mais de 400
                ambientes planejados desde 2021, do apartamento compacto ao
                espaço comercial.
              </p>
              <div className="hero-ctas">
                <a
                  className="btn btn-primary"
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Solicitar orçamento
                </a>
                <a className="btn btn-outline" href="#projetos">
                  Ver projetos
                </a>
              </div>
            </div>
            <div className="hero-art reveal" aria-hidden="true">
              <svg
                viewBox="0 0 600 500"
                width="100%"
                height="100%"
                preserveAspectRatio="xMidYMid slice"
              >
                <ellipse cx="300" cy="405" rx="250" ry="55" fill="#e9dbc7" />
                <rect
                  x="90"
                  y="240"
                  width="300"
                  height="110"
                  rx="26"
                  fill="#f8efe2"
                  stroke="#e3d3bd"
                  strokeWidth="1"
                />
                <rect
                  x="90"
                  y="205"
                  width="300"
                  height="70"
                  rx="22"
                  fill="#f8efe2"
                  stroke="#e3d3bd"
                  strokeWidth="1"
                />
                <rect x="108" y="222" width="76" height="58" rx="14" fill="#ffffff" />
                <rect x="192" y="222" width="76" height="58" rx="14" fill="#e3a63e" />
                <rect x="276" y="222" width="76" height="58" rx="14" fill="#ffffff" />
                <rect x="96" y="330" width="18" height="26" rx="4" fill="#a97b48" />
                <rect x="366" y="330" width="18" height="26" rx="4" fill="#a97b48" />
                <path
                  d="M420 300c-30 0-46 22-46 48s20 44 46 44 46-20 46-44-16-48-46-48z"
                  fill="#6b4426"
                />
                <rect x="392" y="360" width="10" height="30" fill="#4d3019" />
                <rect x="438" y="360" width="10" height="30" fill="#4d3019" />
                <ellipse cx="270" cy="368" rx="58" ry="14" fill="#c9a876" />
                <rect x="240" y="330" width="60" height="38" rx="6" fill="#b98354" />
                <rect x="255" y="300" width="10" height="34" fill="#8a5a2c" />
                <rect x="285" y="300" width="10" height="34" fill="#8a5a2c" />
                <ellipse cx="264" cy="292" rx="12" ry="16" fill="#e7dccb" />
                <line x1="264" y1="276" x2="270" y2="255" stroke="#8a9b6e" strokeWidth="2" />
                <line x1="264" y1="276" x2="256" y2="258" stroke="#8a9b6e" strokeWidth="2" />
                <line x1="264" y1="276" x2="264" y2="252" stroke="#8a9b6e" strokeWidth="2" />
              </svg>
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
              <h2>Projetos em destaque</h2>
              <p>Uma amostra dos ambientes que já planejamos e instalamos.</p>
            </div>
            <div className="grid reveal">
              {PROJETOS_DESTAQUE.map((item) => (
                <div className="card" key={item.label}>
                  <div className="thumb">{item.icon}</div>
                  <figcaption>{item.label}</figcaption>
                </div>
              ))}
            </div>
            <div className="grid-cta reveal">
              <a
                className="btn btn-outline"
                href={INSTAGRAM_LINK}
                target="_blank"
                rel="noopener noreferrer"
              >
                Ver mais projetos →
              </a>
            </div>
          </div>
        </section>

        <section id="ambientes" style={{ background: "var(--cream-panel)" }}>
          <div className="section-inner">
            <div className="section-head reveal">
              <p className="eyebrow">Especialidades</p>
              <h2>Ambientes que projetamos</h2>
            </div>
            <div className="triptych reveal">
              {AMBIENTES.map((item) => (
                <div className="tri-card" key={item.label}>
                  <div className="panel" style={{ background: item.bg }}>
                    <svg viewBox="0 0 24 24" stroke={item.stroke} strokeWidth="1.2" fill="none">
                      {item.paths}
                    </svg>
                  </div>
                  <figcaption>{item.label}</figcaption>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="avaliacoes">
          <div className="section-inner">
            <div className="section-head reveal">
              <p className="eyebrow">Avaliações</p>
              <h2>Quem já planejou com a gente</h2>
            </div>
            <div className="t-grid reveal">
              {DEPOIMENTOS.map((item) => (
                <div className="t-card" key={item.who}>
                  <div className="stars">★★★★★</div>
                  <p className="quote">&quot;{item.quote}&quot;</p>
                  <p className="who">{item.who}</p>
                </div>
              ))}
            </div>
            <div className="t-foot reveal">
              <p className="note">
                depoimentos ilustrativos — substituir por avaliações reais do
                Google
              </p>
              <a className="g-link" href="#">
                Ver avaliações no Google →
              </a>
            </div>
          </div>
        </section>

        <section className="statement" style={{ background: "var(--cream-panel)" }}>
          <blockquote className="reveal">
            Móvel planejado: decora, organiza, possibilita,{" "}
            <b>transforma o ambiente e a vida.</b>
          </blockquote>
          <a className="btn btn-primary reveal" href="#orcamento">
            Quero um projeto assim
          </a>
        </section>

        <section id="orcamento">
          <div className="section-inner">
            <div className="form-wrap">
              <div className="reveal">
                <p className="eyebrow">Orçamento</p>
                <h2>Solicite seu projeto sem compromisso</h2>
                <p className="lede" style={{ marginTop: "1.1rem", color: "var(--ink-soft)" }}>
                  Preencha os dados abaixo e nossa equipe retorna pelo
                  WhatsApp com os próximos passos da medição.
                </p>
              </div>
              <QuoteForm />
            </div>
          </div>
        </section>

        <section id="localizacao" style={{ background: "var(--cream-panel)" }}>
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
                    R. Ramiro Barcelos, 910 — Centro
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
                <span className="map-pin"></span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="footer-inner">
          <div className="footer-top">
            <a className="wordmark" href="#top">
              Comar
            </a>
            <div className="footer-links">
              <a href="#projetos">Projetos</a>
              <a href="#avaliacoes">Avaliações</a>
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
