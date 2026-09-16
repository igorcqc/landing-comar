"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { captureUtmParams, getStoredUtmParams } from "@/lib/utm";
import { generateEventId, getFbc, getFbp, trackMetaEvent } from "@/lib/meta";
import s from "./organic.module.css";

const WHATSAPP_NUMBER = "5553999044420";

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
        <img src="/brand/comar-logo-color.webp" alt="Comar Móveis Planejados" className={s.brandLogoImage} />
      </a>
      <button className={s.brandHeaderCta} onClick={() => start("topo")}>Conversar pelo WhatsApp <Arrow /></button>
    </header>
    <main id="conteudo">
      <section id="inicio" ref={hero} className={s.hero}>
        <div className={s.heroCopy}>
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

    <footer className={s.footer}><div className={s.footerBrand}><a href="#inicio" aria-label="Comar Móveis Planejados"><img src="/brand/comar-logo-negative.webp" alt="Comar Móveis Planejados" className={s.footerLogo}/></a><p>Feito para a casa.<br/>Pensado para quem vive nela.</p></div><div><b>Venha conversar com a gente</b><p>R. Ramiro Barcelos, 910 · Centro<br/>São José do Norte / RS</p></div><div><b>Perto de você</b><p>São José do Norte<br/>Rio Grande, Cassino e Região</p><span className={s.footerContact}>WhatsApp: (53) 99904-4420</span></div><small>© 2026 Comar Móveis Planejados</small></footer>

    {sticky && <div className={s.sticky}><button className={s.cta} onClick={() => start("fixo_mobile")}>Conversar pelo WhatsApp <Arrow /></button></div>}
  </div>;
}
