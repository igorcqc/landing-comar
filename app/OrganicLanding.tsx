"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { captureUtmParams, getStoredUtmParams } from "@/lib/utm";
import { generateEventId, getFbc, getFbp, trackMetaEvent } from "@/lib/meta";
import s from "./organic.module.css";

const WHATSAPP_NUMBER = "5553999044420";
const COMAR_LOGO_NEGATIVE = "data:image/webp;base64,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";

const projects = [
  { title: "Uma cozinha que acompanha sua rotina.", category: "COZINHA", image: "cozinha-02.jpg", text: "Espaço para preparar, guardar e reunir. Veja como a composição dos móveis e da iluminação muda o ambiente.", cta: "Quero planejar minha cozinha" },
  { title: "Um quarto para desacelerar.", category: "DORMITÓRIO", image: "quarto-03.jpg", text: "Armários integrados ao ambiente, com uma composição que deixa o quarto acolhedor e ajuda a manter tudo no lugar.", cta: "Quero planejar meu quarto" },
  { title: "A sala também merece seu jeito.", category: "SALA", image: "sala-01.jpg", text: "Painel, móveis e acabamentos conversando entre si. Um espaço pensado para os momentos que você vive em casa.", cta: "Quero planejar minha sala" },
];

const reviews = [
  ["Ótima experiência! Empresa nota 10, desde a parte de vendas, ao planejamento dos móveis e a montagem! Serviço completo! Parabéns!", "Giovana Westendorff Pegoraro"],
  ["Gostaria de parabenizar toda equipe da Comar Móveis, pelo ótimo atendimento e entrega perfeita. A equipe de montagem super atenciosa e organizada. Os móveis ficaram exatamente como imaginei. Super recomendo.", "Hélia Smidt"],
  ["Nossa experiência com a Comar foi ótima! Foram super atenciosos e detalhistas desde o início. Entregaram no prazo prometido e a qualidade dentro das nossas expectativas.", "Dayara Velasco"],
];

const faqs = [
  ["Posso fazer apenas um ambiente?", "Sim. Você pode começar por uma cozinha, dormitório, sala, banheiro ou outro ambiente. Conte para a Comar qual espaço deseja planejar."],
  ["Preciso ter planta ou medidas para conversar?", "Você pode começar contando sua ideia. Se tiver planta, fotos ou medidas, envie no atendimento para ajudar a equipe a entender o espaço e orientar os próximos passos."],
  ["Como descubro o investimento no meu projeto?", "O valor depende do ambiente, das medidas, dos materiais e dos acabamentos escolhidos. A conversa inicial ajuda a definir suas prioridades e as possibilidades para o projeto."],
  ["Como funcionam o prazo e o pagamento?", "Peça à equipe os prazos e as condições disponíveis para o seu projeto. Esses pontos precisam ser alinhados com você antes da contratação."],
  ["A Comar faz o transporte e a entrega?", "Sim. A Comar conta com transporte e entrega próprios. A equipe combina com você os detalhes de acesso e recebimento dos móveis."],
  ["Quais regiões vocês atendem?", "Atendemos São José do Norte, Rio Grande, Cassino e região. Chame nossa equipe no WhatsApp para conversar sobre o seu projeto."],
];

type Attribution = {
  source: string;
  trafficType: string;
  message: string;
};

function resolveAttribution(utm: Record<string, string>, referrer: string): Attribution {
  const source = (utm.utm_source || "").toLowerCase();
  const medium = (utm.utm_medium || "").toLowerCase();
  const ref = referrer.toLowerCase();

  if (source.includes("instagram") || ref.includes("instagram.com")) {
    return {
      source: "instagram",
      trafficType: medium.includes("paid") || medium.includes("cpc") ? "paid" : "organic",
      message: "Olá! Vim pelo Instagram da Comar e gostaria de conversar sobre um projeto de móveis planejados.",
    };
  }

  if (source.includes("google") || ref.includes("google.")) {
    return {
      source: "google",
      trafficType: medium.includes("cpc") || medium.includes("paid") ? "paid" : "organic",
      message: "Olá! Encontrei a Comar pelo Google e gostaria de conversar sobre um projeto de móveis planejados.",
    };
  }

  if (source) {
    return {
      source,
      trafficType: medium.includes("cpc") || medium.includes("paid") ? "paid" : "referral",
      message: "Olá! Gostaria de conversar sobre um projeto de móveis planejados com a Comar.",
    };
  }

  if (referrer) {
    return {
      source: "referral",
      trafficType: "referral",
      message: "Olá! Gostaria de conversar sobre um projeto de móveis planejados com a Comar.",
    };
  }

  return {
    source: "direct",
    trafficType: "direct",
    message: "Olá! Gostaria de conversar sobre um projeto de móveis planejados com a Comar.",
  };
}

export function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

type OrganicLandingProps = {
  forcedSource?: "instagram";
};

function withForcedAttribution(
  utm: Record<string, string>,
  forcedSource?: "instagram"
): Record<string, string> {
  if (forcedSource === "instagram") {
    return {
      ...utm,
      utm_source: "instagram",
      utm_medium: "organic",
      utm_campaign: "bio",
    };
  }
  return utm;
}

export default function OrganicLanding({ forcedSource }: OrganicLandingProps = {}) {
  const [more, setMore] = useState(false);
  const [sticky, setSticky] = useState(false);
  const hero = useRef<HTMLElement>(null);

  useEffect(() => {
    captureUtmParams();
    const storedUtm = getStoredUtmParams();
    const utm = withForcedAttribution(storedUtm, forcedSource);
    const attribution = resolveAttribution(utm, document.referrer);

    trackMetaEvent("ViewContent", {
      content_name: "site_organico_comar",
      content_category: "site_organico",
      page_version: "organic",
      traffic_type: attribution.trafficType,
      source: attribution.source,
      utm_source: utm.utm_source,
      utm_medium: utm.utm_medium,
      utm_campaign: utm.utm_campaign,
    });

    const observer = new IntersectionObserver(([entry]) => setSticky(!entry.isIntersecting));
    if (hero.current) observer.observe(hero.current);
    return () => observer.disconnect();
  }, [forcedSource]);

  function start(source: string) {
    const eventId = generateEventId();
    const storedUtm = getStoredUtmParams();
    const utm = withForcedAttribution(storedUtm, forcedSource);
    const referrer = document.referrer;
    const attribution = resolveAttribution(utm, referrer);

    const eventParams = {
      content_name: "whatsapp_site_organico",
      content_category: "contato_whatsapp",
      contact_method: "whatsapp",
      page_version: "organic",
      traffic_type: attribution.trafficType,
      source: attribution.source,
      cta_source: source,
      utm_source: utm.utm_source,
      utm_medium: utm.utm_medium,
      utm_campaign: utm.utm_campaign,
      utm_term: utm.utm_term,
      utm_content: utm.utm_content,
    };

    trackMetaEvent("Contact", eventParams, eventId);

    void fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      keepalive: true,
      body: JSON.stringify({
        eventId,
        eventSourceUrl: window.location.href,
        referrer,
        ctaSource: source,
        pageVersion: "organic",
        trafficType: attribution.trafficType,
        source: attribution.source,
        utm,
        fbp: getFbp(),
        fbc: getFbc(),
      }),
    }).catch(() => undefined);

    const whatsapp = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(attribution.message)}`;
    window.open(whatsapp, "_blank", "noopener,noreferrer");
  }

  return <div className={s.page}>
    <a className={s.skip} href="#conteudo">Ir para o conteúdo</a>
    <header className={s.brandHeader}>
      <a className={s.brandLogoLink} href="#inicio" aria-label="Comar Móveis Planejados">
        <img src={COMAR_LOGO_NEGATIVE} alt="Comar Móveis Planejados" className={s.brandLogoImage} />
      </a>
      <div className={s.brandHeaderMeta}>
        <span>PROJETOS SOB MEDIDA</span>
        <span>São José do Norte · Rio Grande · Cassino</span>
      </div>
      <button className={s.brandHeaderCta} onClick={() => start("topo")}>Conversar pelo WhatsApp <Arrow /></button>
    </header>
    <main id="conteudo">
      <section id="inicio" ref={hero} className={s.hero}>
        <div className={s.heroCopy}>
          <div className={s.heroBrandMark} aria-hidden="true"></div>
          <p className={s.eyebrow}>MÓVEIS PLANEJADOS · PROJETOS COM PERSONALIDADE</p>
          <h1>Sua casa com<br/>espaço para tudo.<br/><em>E com o seu jeito.</em></h1>
          <p className={s.lede}>Móveis planejados para organizar a rotina, aproveitar cada ambiente e fazer você se sentir em casa. Do primeiro projeto à instalação, conte com a Comar.</p>
          <button className={s.cta} onClick={() => start("inicio")}>Quero fazer meu projeto <Arrow /></button>
          <p className={s.region}>São José do Norte · Rio Grande · Cassino e Região</p>
          <div className={s.googleProof} aria-label="Google: 5,0 estrelas, 124 avaliações. A empresa mais bem avaliada de São José do Norte.">
            <span className={s.googleMark} aria-hidden="true">G</span>
            <div className={s.googleProofCopy}>
              <div className={s.ratingLine}><span className={s.stars} aria-hidden="true">★★★★★</span><strong>5,0</strong></div>
              <p><b>124 avaliações</b> · a empresa mais bem avaliada de São José do Norte</p>
            </div>
          </div>
        </div>
        <figure className={s.heroPhoto}>
          <Image src="/projetos/cozinha-02.jpg" alt="Cozinha planejada da Comar com móveis escuros e iluminação integrada" fill priority sizes="(max-width: 760px) 100vw, 55vw" />
          <figcaption><span>UM NOVO OLHAR PARA O SEU LAR</span><b>Planejado para viver.</b></figcaption>
        </figure>
      </section>
      <div className={s.trustStrip}><span>Projeto sob medida</span><span>Transporte e entrega próprios</span><span>Acompanhamento até a instalação</span></div>

      <section id="projetos" className={s.section}>
        <div className={s.sectionHeading}><div><p className={s.eyebrow}>01 / AMBIENTES COMAR</p><h2>O próximo ambiente<br/>pode ser o seu.</h2></div><p>Olhe os detalhes. Imagine sua rotina.<br/>Encontre ideias para a sua casa.</p></div>
        <div className={s.projects}>{projects.map((p, i) => <article className={s.project} key={p.category}>
          <div className={s.projectImage}><Image src={`/projetos/${p.image}`} alt={`${p.category.toLowerCase()} planejado apresentado no portfólio da Comar`} fill sizes="(max-width: 760px) 100vw, 33vw"/><span>0{i + 1}</span></div>
          <p className={s.eyebrow}>{p.category}</p><h3>{p.title}</h3><p>{p.text}</p><button className={s.textButton} onClick={() => start(`ambiente_${p.category.toLowerCase()}`)}>{p.cta} <Arrow /></button>
        </article>)}</div>
        {more && <div className={s.moreProjects}>{["cozinha-01.jpg", "cozinha-03.jpg", "banheiro-01.jpg", "closet-03.jpg"].map((name) => <div key={name}><Image src={`/projetos/${name}`} alt={`Mais um ambiente Comar: ${name.split("-")[0]}`} width={800} height={650} sizes="(max-width:760px) 100vw, 25vw"/></div>)}</div>}
        <button className={s.outlineButton} aria-expanded={more} onClick={() => setMore(!more)}>{more ? "Mostrar menos ambientes −" : "Ver mais ambientes +"}</button>
      </section>

      <section id="clientes" className={s.stories}>
        <div className={s.sectionHeading}><div><p className={s.eyebrow}>02 / QUEM JÁ VIVE ESSA EXPERIÊNCIA</p><h2>A casa fica pronta.<br/>A história continua.</h2></div><p>Clientes da Comar contando,<br/>com suas palavras, como foi.</p></div>
        <div className={s.videos}>{[["Everton e Katia", "01"], ["Idelaine", "02"]].map(([name, id]) => <figure key={id}><video controls playsInline preload="none" poster={`/videos/posters/depoimento-${id}.jpg`} src={`/videos/depoimento-${id}.mp4`} aria-label={`Depoimento de ${name}`}/><figcaption><strong>{name}</strong><span>Clientes Comar Móveis</span></figcaption></figure>)}</div>
        <div className={s.reviews}>{reviews.map(([quote, name]) => <blockquote key={name}><span className={s.quoteMark} aria-hidden="true">“</span><p>{quote}</p><cite>{name}</cite></blockquote>)}</div>
        <p className={s.googleReviewsNote}>Avaliações de clientes publicadas no Google</p>
      </section>

      <section id="processo" className={s.section}>
        <div className={s.sectionHeading}><div><p className={s.eyebrow}>03 / UMA ETAPA DE CADA VEZ</p><h2>Você conta a ideia.<br/>A gente planeja junto.</h2></div><p>Entenda o caminho entre imaginar<br/>o ambiente e ter os móveis em casa.</p></div>
        <div className={s.steps}>{[
          ["A conversa", "Conte qual ambiente quer mudar, o que precisa guardar e como usa o espaço. Planta, fotos e referências ajudam a começar."],
          ["O projeto", "A equipe orienta o levantamento do espaço e conversa sobre distribuição, materiais e acabamentos. Você participa das escolhas."],
          ["O combinado", "Com o projeto definido, alinhe investimento, condições e prazo. É a hora de tirar as dúvidas antes de seguir."],
          ["Sua casa pronta", "Transporte e entrega próprios, com os detalhes de recebimento e instalação alinhados com você."],
        ].map(([title, text], i) => <article key={title}><span>0{i + 1}</span><h3>{title}</h3><p>{text}</p></article>)}</div>
      </section>

      <section id="entrega" className={s.delivery} aria-labelledby="entrega-titulo">
        <div className={s.deliveryCopy}>
          <img src={COMAR_LOGO_NEGATIVE} alt="" aria-hidden="true" className={s.deliveryLogo}/>
          <p className={s.eyebrow}>04 / TRANSPORTE E ENTREGA PRÓPRIOS</p><h2 id="entrega-titulo">O cuidado também<br/>vai a caminho<br/><em>da sua casa.</em></h2><p>Escolher os móveis é só uma parte da história. A chegada deles também merece atenção.</p><p>Na Comar, o transporte e a entrega são próprios. Você combina os detalhes com a nossa equipe e sabe quem está levando seu projeto até você.</p><ul><li>Veículo próprio da Comar</li><li>Entrega alinhada com você</li><li>Contato direto com a nossa equipe</li></ul><button className={s.cta} onClick={() => start("entrega")}>Quero fazer meu projeto <Arrow /></button></div>
        <div className={s.deliveryGallery}>
          <figure className={s.deliveryMain}><Image src="/entrega/comar-entrega.jpeg" alt="Veículo da Comar em frente a uma casa durante uma entrega" fill sizes="(max-width:760px) 100vw, 50vw"/><figcaption>Da Comar até a sua casa.</figcaption></figure>
          <figure><Image src="/entrega/comar-residencia.jpeg" alt="Caminhão da Comar em frente a um prédio residencial" fill sizes="(max-width:760px) 50vw, 25vw"/></figure>
          <figure><Image src="/entrega/comar-transporte.jpeg" alt="Veículo próprio com a identificação Comar Móveis Planejados" fill sizes="(max-width:760px) 50vw, 25vw"/></figure>
        </div>
      </section>

      <section id="duvidas" className={`${s.section} ${s.faq}`}><div><p className={s.eyebrow}>05 / ANTES DE COMEÇAR</p><h2>Vamos tirar<br/>suas dúvidas?</h2><p>Uma boa decisão começa<br/>com uma conversa clara.</p></div><div>{faqs.map(([q, a]) => <details key={q}><summary>{q}<span aria-hidden="true">+</span></summary><p>{a}</p></details>)}</div></section>

      <section className={s.final}><p className={s.eyebrow}>UM PROJETO COMEÇA COM UMA CONVERSA</p><h2>Qual parte da sua casa<br/>você quer transformar?</h2><p>Conte sua ideia. Vamos pensar no seu ambiente juntos.</p><button className={s.cta} onClick={() => start("final")}>Conversar pelo WhatsApp <Arrow /></button><small>Atendimento direto com a equipe da Comar.</small></section>
    </main>

    <footer className={s.footer}><div className={s.footerBrand}><a href="#inicio" aria-label="Comar Móveis Planejados"><img src={COMAR_LOGO_NEGATIVE} alt="Comar Móveis Planejados" className={s.footerLogo}/></a><p>Feito para a casa.<br/>Pensado para quem vive nela.</p></div><div><b>Venha conversar com a gente</b><p>R. Ramiro Barcelos, 910 · Centro<br/>São José do Norte / RS</p></div><div><b>Perto de você</b><p>São José do Norte<br/>Rio Grande, Cassino e Região</p><span className={s.footerContact}>WhatsApp: (53) 99904-4420</span></div><small>© 2026 Comar Móveis Planejados</small></footer>

    {sticky && <div className={s.sticky}><button className={s.cta} onClick={() => start("fixo_mobile")}>Conversar pelo WhatsApp <Arrow /></button></div>}
  </div>;
}
