"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { captureUtmParams } from "@/lib/utm";
import { trackMetaEvent } from "@/lib/meta";
import V3Quiz from "./V3Quiz";
import s from "./v3.module.css";

const projects = [
  { name: "Cozinhas", image: "cozinha-03", text: "Mais espaço para cozinhar. Mais motivos para reunir." },
  { name: "Dormitórios", image: "quarto-03", text: "Organização que dá lugar ao descanso." },
  { name: "Salas", image: "sala-02", text: "O seu jeito de receber, em cada detalhe." },
  { name: "Closets", image: "closet-03", text: "Tudo à vista. Tudo no seu lugar." },
];

function Arrow() {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M4 12h15m-6-6 6 6-6 6" /></svg>;
}

function ScrollKitchen({ onStart }: { onStart: () => void }) {
  const root = useRef<HTMLElement>(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const section = root.current;
    if (!section) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let observer: IntersectionObserver | undefined;
    let active = true;
    const paint = () => {
      frame = 0;
      if (!active || preference.matches || paused) return;
      const rect = section.getBoundingClientRect();
      const sticky = section.firstElementChild as HTMLElement;
      const distance = Math.max(1, rect.height - sticky.offsetHeight);
      const progress = Math.min(1, Math.max(0, -rect.top / distance));
      // Assemble four photographic panels, then push into the finished kitchen.
      const assembled = Math.min(1, progress / 0.55);
      const remaining = Math.pow(1 - assembled, 3);
      section.style.setProperty("--spread", String(remaining));
      section.style.setProperty("--zoom", String(1 + Math.max(0, progress - 0.55) * 0.22));
      section.style.setProperty("--progress", String(progress));
      section.dataset.phase = progress < 0.3 ? "0" : progress < 0.65 ? "1" : "2";
    };
    const request = () => { if (!frame && active) frame = requestAnimationFrame(paint); };
    const configure = () => {
      const enabled = !preference.matches && !paused;
      section.dataset.motion = enabled ? "on" : "off";
      if (enabled) request();
    };
    if ("IntersectionObserver" in window) {
      observer = new IntersectionObserver(([entry]) => {
        active = entry.isIntersecting;
        if (active) request();
      }, { rootMargin: "200px" });
      observer.observe(section);
    }
    configure();
    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request);
    preference.addEventListener("change", configure);
    return () => {
      cancelAnimationFrame(frame);
      observer?.disconnect();
      window.removeEventListener("scroll", request);
      window.removeEventListener("resize", request);
      preference.removeEventListener("change", configure);
    };
  }, [paused]);

  return (
    <section ref={root} className={s.scrollSection} aria-labelledby="kitchen-title" data-phase="2">
      <div className={s.stickyScene}>
        <div className={s.sceneHeading}>
          <span className={s.eyebrow}>O detalhe faz o ambiente</span>
          <h2 id="kitchen-title">Cada parte pensada.<br /><em>Tudo se encaixa.</em></h2>
        </div>
        <div className={s.kitchenStage}>
          <div className={s.kitchenPhoto}>
            {[0, 1, 2, 3].map((panel) => (
              <div key={panel} className={`${s.photoPanel} ${s[`panel${panel}`]}`}>
                <Image src="/projetos/cozinha-02.jpg" alt={panel === 0 ? "Cozinha real da Comar com armários planejados, ilha e iluminação integrada" : ""} aria-hidden={panel !== 0 ? true : undefined} fill sizes="(max-width: 700px) 90vw, 56vw" />
              </div>
            ))}
          </div>
          <span className={s.photoCredit}>Cozinha · Projeto real Comar</span>
        </div>
        <div className={s.sceneDetails}>
          <div className={s.sceneSteps}>
            <div data-step="0"><span>01 / O espaço</span><h3>Cada centímetro conta.</h3><p>Armários que acompanham as medidas e as possibilidades do seu ambiente.</p></div>
            <div data-step="1"><span>02 / A sua rotina</span><h3>Beleza que funciona.</h3><p>Bancadas, armazenamento e circulação pensados para o seu dia a dia.</p></div>
            <div data-step="2"><span>03 / O conjunto</span><h3>Uma casa com a sua assinatura.</h3><p>Acabamentos e detalhes que conversam entre si. E com você.</p></div>
          </div>
          <button className={s.primary} onClick={onStart}>Quero um projeto assim <Arrow /></button>
          <div className={s.scrollControls}><span>Role para ver os detalhes</span><button onClick={() => setPaused(!paused)} aria-pressed={paused}>{paused ? "Ativar animação" : "Desativar animação"}</button></div>
          <div className={s.sceneProgress} aria-hidden="true"><span /></div>
        </div>
      </div>
    </section>
  );
}

export default function V3Landing() {
  const [quizOpen, setQuizOpen] = useState(false);
  useEffect(() => { captureUtmParams(); }, []);
  const open = useCallback((source: string) => {
    trackMetaEvent("ViewContent", { content_name: `abriu_projeto_v3_${source}`, content_category: "projeto_v3" });
    setQuizOpen(true);
  }, []);
  const close = useCallback(() => setQuizOpen(false), []);

  return (
    <div className={s.page}>
      <a className={s.skipLink} href="#conteudo">Pular para o conteúdo</a>
      <header className={s.header}>
        <a className={s.brand} href="#inicio" aria-label="Comar Móveis, início">COMAR<small>MÓVEIS PLANEJADOS</small></a>
        <nav aria-label="Navegação principal"><a href="#ambientes">Ambientes</a><a href="#historias">Clientes</a><a href="#processo">Como funciona</a></nav>
        <button className={s.headerButton} onClick={() => open("header")}>Começar meu projeto <Arrow /></button>
      </header>
      <main id="conteudo">
        <section className={s.hero} id="inicio">
          <div className={s.heroCopy}>
            <span className={s.eyebrow}>São José do Norte · Rio Grande · Cassino</span>
            <h1>Não é só<br />sobre móveis.<br /><em>É sobre viver<br />melhor em casa.</em></h1>
            <p>Transforme espaços mal aproveitados em ambientes feitos para a sua rotina. Do projeto à instalação, a Comar cuida de cada detalhe.</p>
            <button className={s.primary} onClick={() => open("hero")}>Quero fazer meu projeto <Arrow /></button>
            <small>Conte sua ideia em menos de 2 minutos.</small>
            <div className={s.heroProof}><strong>400+</strong><span>ambientes entregues<br />desde 2021</span></div>
          </div>
          <div className={s.heroImage}>
            <Image src="/projetos/cozinha-03.jpg" alt="Cozinha Comar com bancada de pedra, armários sob medida e nichos iluminados" fill preload sizes="(max-width: 700px) 100vw, 52vw" />
            <div className={s.imageLabel}><span>Feito para caber na sua vida.</span><span>Projeto real Comar / 01</span></div>
          </div>
        </section>
        <div className={s.trustStrip}><span>Projeto sob medida</span><span>Fábrica própria</span><span>Instalação pela nossa equipe</span></div>
        <ScrollKitchen onStart={() => open("scroll")} />
        <section className={s.projects} id="ambientes">
          <div className={s.sectionHeading}><div><span className={s.eyebrow}>Inspiração que já virou realidade</span><h2>Qual ambiente vai<br /><em>mudar a sua rotina?</em></h2></div><p>Projetos executados pela nossa equipe.<br />O próximo pode começar com a sua ideia.</p></div>
          <div className={s.projectGrid}>{projects.map((project, i) => <article key={project.name}>
            <button onClick={() => open(`ambiente_${i}`)} aria-label={`Começar um projeto de ${project.name.toLowerCase()}`}>
              <div className={s.projectImage}><Image src={`/projetos/${project.image}.jpg`} alt={`${project.name} sob medida executados pela Comar`} fill sizes="(max-width: 700px) 85vw, 44vw" /><span>0{i + 1}</span></div>
              <div className={s.projectTitle}><h3>{project.name}</h3><Arrow /></div><p>{project.text}</p>
            </button>
          </article>)}</div>
          <p className={s.otherRooms}>Banheiro, área gourmet ou casa completa? <button onClick={() => open("outros")}>Vamos planejar seu ambiente.</button></p>
        </section>
        <section className={s.stories} id="historias">
          <div className={s.sectionHeading}><div><span className={s.eyebrow}>Quem vive, conta</span><h2>O projeto termina.<br /><em>A satisfação fica.</em></h2></div><p>Conheça a experiência de quem<br />já abriu as portas para a Comar.</p></div>
          <div className={s.storyGrid}>
            <blockquote><span className={s.quoteMark} aria-hidden="true">“</span><p>Os móveis ficaram exatamente como imaginei. Super recomendo.</p><cite>Hélia Smidt</cite><small>Cliente Comar Móveis</small></blockquote>
            <figure><video controls playsInline preload="none" poster="/videos/posters/depoimento-01.jpg" src="/videos/depoimento-01.mp4" aria-label="Depoimento de Everton e Katia" /><figcaption>Everton e Katia <span>Clientes Comar</span></figcaption></figure>
            <figure><video controls playsInline preload="none" poster="/videos/posters/depoimento-02.jpg" src="/videos/depoimento-02.mp4" aria-label="Depoimento de Idelaine" /><figcaption>Idelaine <span>Cliente Comar</span></figcaption></figure>
          </div>
          <button className={s.primary} onClick={() => open("depoimentos")}>Quero transformar meu ambiente <Arrow /></button>
        </section>
        <section className={s.process} id="processo">
          <div><span className={s.eyebrow}>Da ideia à casa pronta</span><h2>Você imagina.<br /><em>A gente planeja junto.</em></h2><p>Uma equipe da sua região, acompanhando cada etapa.</p></div>
          <ol>{[
            ["Conte o que você precisa", "Escolha seu ambiente e responda algumas perguntas. A conversa continua pelo WhatsApp."],
            ["Planeje com a nossa equipe", "Alinhamos medidas, referências, materiais e investimento para desenvolver seu projeto."],
            ["Veja tudo ganhar forma", "Com o projeto aprovado, seguimos para a fabricação e a instalação dos seus móveis."],
          ].map(([title, text], i) => <li key={title}><span>0{i + 1}</span><div><h3>{title}</h3><p>{text}</p></div></li>)}</ol>
        </section>
        <section className={s.faq}>
          <div><span className={s.eyebrow}>Antes de começar</span><h2>Vamos tirar<br /><em>suas dúvidas?</em></h2></div>
          <div>{[
            ["Vocês atendem a minha região?", "Atendemos São José do Norte, Rio Grande e Cassino. Selecione o local no formulário para orientar o atendimento."],
            ["Preciso ter um projeto pronto?", "Não. Você pode começar contando sua ideia, o ambiente e o que precisa melhorar. Nossa equipe orienta os próximos passos."],
            ["Posso planejar apenas um ambiente?", "Sim. Podemos conversar sobre uma cozinha, dormitório, closet, sala, banheiro ou um projeto para a casa completa."],
            ["Como sei o valor e o prazo do meu projeto?", "Eles dependem das medidas, dos materiais e do escopo. A equipe alinha essas informações com você antes da aprovação."],
          ].map(([q, a]) => <details key={q}><summary>{q}<span aria-hidden="true">+</span></summary><p>{a}</p></details>)}</div>
        </section>
        <section className={s.final}>
          <div className={s.finalImage}><Image src="/projetos/cozinha-02.jpg" alt="Detalhes da cozinha planejada Comar" fill sizes="(max-width: 700px) 100vw, 45vw" /></div>
          <div className={s.finalCopy}><span className={s.eyebrow}>Seu próximo passo</span><h2>A casa é sua.<br /><em>O projeto também<br />precisa ser.</em></h2><p>Conte o que você quer transformar. Vamos encontrar, juntos, o melhor jeito de aproveitar seu espaço.</p><button className={s.primary} onClick={() => open("final")}>Quero fazer meu projeto <Arrow /></button><small>Perguntas rápidas. Atendimento pelo WhatsApp.</small></div>
        </section>
      </main>
      <footer className={s.footer}><a className={s.brand} href="#inicio">COMAR<small>MÓVEIS PLANEJADOS</small></a><p>R. Ramiro Barcelos, 910 · Centro<br />São José do Norte / RS</p><div><a href="tel:+5553999044420">(53) 99904-4420</a><small>© 2026 Comar Móveis Planejados</small></div></footer>
      {!quizOpen && <div className={s.mobileBar}><button className={s.primary} onClick={() => open("mobile_fixo")}>Quero fazer meu projeto <Arrow /></button></div>}
      {quizOpen && <V3Quiz onClose={close} />}
    </div>
  );
}
