import Image from "next/image";
import { Arrow, Check, SectionKicker } from "./V10UI";
import styles from "./v10.module.css";

const PROJECTS = [
  {
    src: "/projetos/cozinha-02.jpg",
    label: "Cozinha",
    alt: "Cozinha planejada escura com iluminação linear executada pela Comar",
    className: "projectHero",
  },
  {
    src: "/projetos/sala-03.jpg",
    label: "Sala",
    alt: "Sala planejada com painel ripado executada pela Comar",
    className: "projectSmall",
  },
  {
    src: "/projetos/quarto-03.jpg",
    label: "Dormitório",
    alt: "Dormitório planejado com bancada e iluminação executado pela Comar",
    className: "projectSmall",
  },
  {
    src: "/projetos/cozinha-01.jpg",
    label: "Cozinha",
    alt: "Cozinha azul planejada e executada pela Comar",
    className: "projectWide",
  },
];

export function TrustAndProjects({
  openQuiz,
}: {
  openQuiz: (source: string) => void;
}) {
  return (
    <>
      <section className={styles.trustSection}>
        <div className={styles.trustIntro} data-v10-reveal>
          <SectionKicker>Confiança antes de qualquer escolha</SectionKicker>
          <h2>
            Planejados são uma decisão importante.
            <span> Você precisa saber em quem confiar.</span>
          </h2>
        </div>

        <div className={styles.googleFeature} data-v10-reveal>
          <div className={styles.googleScore}>
            <span>Google</span>
            <strong>5,0</strong>
            <div>★★★★★</div>
            <small>117 avaliações</small>
          </div>
          <div className={styles.googleCopy}>
            <h3>A empresa mais bem avaliada de São José do Norte.</h3>
            <p>
              Antes de falar de acabamento, projeto ou estilo, existe algo
              ainda mais importante: a experiência de quem já confiou sua casa
              à Comar.
            </p>
            <div className={styles.googleStats}>
              <span><Check /> avaliações reais</span>
              <span><Check /> projetos entregues</span>
              <span><Check /> atendimento da região</span>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.projectsSection} id="projetos">
        <div className={styles.sectionHead} data-v10-reveal>
          <div>
            <SectionKicker>Projetos reais</SectionKicker>
            <h2>Veja o resultado antes de imaginar o seu.</h2>
          </div>
          <p>
            Uma seleção curta dos projetos que melhor mostram acabamento,
            aproveitamento de espaço e identidade.
          </p>
        </div>

        <div className={styles.projectGrid}>
          {PROJECTS.map((project) => (
            <figure
              key={project.src}
              className={styles[project.className]}
              data-v10-reveal
            >
              <Image
                src={project.src}
                alt={project.alt}
                fill
                sizes="(max-width: 720px) 100vw, 50vw"
              />
              <figcaption>
                <span>Projeto real</span>
                <b>{project.label}</b>
              </figcaption>
            </figure>
          ))}
        </div>

        <div className={styles.centerAction} data-v10-reveal>
          <p>Qual desses ambientes mais combina com o que você imagina?</p>
          <button
            type="button"
            className={styles.darkButton}
            onClick={() => openQuiz("projetos")}
          >
            Quero criar o meu projeto
            <Arrow />
          </button>
        </div>
      </section>
    </>
  );
}
