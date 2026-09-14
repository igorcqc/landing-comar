import Image from "next/image";
import { Arrow, SectionKicker } from "./V10UI";
import { V10Transport } from "./V10Transport";
import styles from "./v10.module.css";

const REVIEWS = [
  {
    quote:
      "Ótima experiência! Empresa nota 10, desde a parte de vendas ao planejamento dos móveis e a montagem. Serviço completo!",
    name: "Giovana Westendorff Pegoraro",
  },
  {
    quote:
      "Atendimento e entrega perfeitos. A equipe de montagem foi super atenciosa e organizada. Os móveis ficaram exatamente como imaginei.",
    name: "Hélia Smidt",
  },
  {
    quote:
      "Foram super atenciosos e detalhistas desde o início. Entregaram no prazo prometido e a qualidade ficou dentro das nossas expectativas.",
    name: "Dayara Velasco",
  },
];

export function ProcessAndStories({
  openQuiz,
}: {
  openQuiz: (source: string) => void;
}) {
  return (
    <>
      <section className={styles.processSection} id="processo">
        <div className={styles.processVisual} data-v10-reveal>
          <Image
            src="/projetos/closet-03.jpg"
            alt="Closet planejado com iluminação embutida pela Comar"
            fill
            sizes="(max-width: 900px) 100vw, 48vw"
          />
          <div className={styles.visualStamp}>
            <strong>Do primeiro contato</strong>
            <span>à instalação</span>
          </div>
        </div>

        <div className={styles.processCopy} data-v10-reveal>
          <SectionKicker>Como funciona</SectionKicker>
          <h2>Um processo claro para uma decisão mais tranquila.</h2>
          <p className={styles.processLead}>
            Você não precisa chegar sabendo tudo. Nosso trabalho começa
            entendendo o que precisa funcionar melhor na sua casa.
          </p>

          <ol className={styles.steps}>
            <li>
              <span>01</span>
              <div>
                <h3>Conte o que você imagina</h3>
                <p>Ambiente, referências, rotina e prioridades.</p>
              </div>
            </li>
            <li>
              <span>02</span>
              <div>
                <h3>Construímos o projeto com você</h3>
                <p>Medidas, materiais e soluções pensadas para o espaço.</p>
              </div>
            </li>
            <li>
              <span>03</span>
              <div>
                <h3>Ajustamos cada detalhe</h3>
                <p>O projeto evolui até fazer sentido para a sua casa.</p>
              </div>
            </li>
            <li>
              <span>04</span>
              <div>
                <h3>Produção e instalação</h3>
                <p>Nossa equipe acompanha a execução até a entrega.</p>
              </div>
            </li>
          </ol>

          <button
            type="button"
            className={styles.textButton}
            onClick={() => openQuiz("processo")}
          >
            Começar meu projeto
            <Arrow />
          </button>
        </div>
      </section>

      <section className={styles.differencesSection}>
        <div className={styles.centerHead} data-v10-reveal>
          <SectionKicker>Por que a Comar</SectionKicker>
          <h2>O que você leva além dos móveis.</h2>
        </div>

        <div className={styles.differenceGrid}>
          <article data-v10-reveal>
            <span>01</span>
            <h3>Projeto verdadeiramente sob medida</h3>
            <p>
              O ambiente é pensado para suas medidas, sua rotina e a forma
              como você quer usar a casa.
            </p>
          </article>
          <article data-v10-reveal>
            <span>02</span>
            <h3>Fábrica própria</h3>
            <p>
              Mais controle sobre produção, execução e qualidade em cada
              etapa.
            </p>
          </article>
          <article data-v10-reveal>
            <span>03</span>
            <h3>Equipe próxima</h3>
            <p>
              Atendimento regional para uma compra que exige conversa,
              confiança e acompanhamento.
            </p>
          </article>
          <article data-v10-reveal>
            <span>04</span>
            <h3>Prova real de satisfação</h3>
            <p>
              Nota 5,0 e 117 avaliações no Google ajudam você a decidir com
              menos risco.
            </p>
          </article>
        </div>
      </section>

      <V10Transport openQuiz={openQuiz} />

      <section className={styles.storiesSection} id="clientes">
        <div className={styles.storyHeader} data-v10-reveal>
          <div>
            <SectionKicker light>Quem já escolheu a Comar</SectionKicker>
            <h2>
              Não é sobre o que prometemos. É sobre o que os clientes contam.
            </h2>
          </div>
          <div className={styles.storyScore}>
            <strong>5,0</strong>
            <span>★★★★★</span>
            <small>Google · 117 avaliações</small>
          </div>
        </div>

        <div className={styles.reviewGrid}>
          {REVIEWS.map((review) => (
            <blockquote key={review.name} data-v10-reveal>
              <div>★★★★★</div>
              <p>“{review.quote}”</p>
              <footer>
                <b>{review.name}</b>
                <span>Cliente Comar Móveis</span>
              </footer>
            </blockquote>
          ))}
        </div>

        <div className={styles.videoStrip}>
          <div className={styles.videoIntro} data-v10-reveal>
            <span>Depoimentos em vídeo</span>
            <h3>Ouça a experiência com as próprias palavras.</h3>
          </div>

          <article data-v10-reveal>
            <video
              controls
              playsInline
              preload="none"
              poster="/videos/posters/depoimento-01.jpg"
              src="/videos/depoimento-01.mp4"
            />
            <div>
              <b>Everton e Katia</b>
              <span>Clientes Comar</span>
            </div>
          </article>

          <article data-v10-reveal>
            <video
              controls
              playsInline
              preload="none"
              poster="/videos/posters/depoimento-02.jpg"
              src="/videos/depoimento-02.mp4"
            />
            <div>
              <b>Idelaine</b>
              <span>Cliente Comar</span>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
