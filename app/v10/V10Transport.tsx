import Image from "next/image";
import { Arrow, Check, SectionKicker } from "./V10UI";
import styles from "./v10.module.css";

export function V10Transport({
  openQuiz,
}: {
  openQuiz: (source: string) => void;
}) {
  return (
    <section className={styles.transportSection}>
      <div className={styles.transportIntro} data-v10-reveal>
        <SectionKicker>Estrutura própria</SectionKicker>
        <h2>
          Transporte próprio para mais segurança, organização e controle na
          entrega.
        </h2>
        <p>
          Na Comar, o cuidado com o seu projeto não termina na fabricação.
          Contamos com <strong>transporte próprio</strong>, o que nos permite
          ter mais controle logístico, mais proteção no deslocamento dos móveis
          e mais confiança em cada etapa até a entrega.
        </p>

        <div className={styles.transportBenefits}>
          <span><Check /> Mais controle logístico</span>
          <span><Check /> Mais segurança no transporte</span>
          <span><Check /> Menor dependência de terceiros</span>
          <span><Check /> Mais organização da fábrica à instalação</span>
        </div>

        <button
          type="button"
          className={styles.darkButton}
          onClick={() => openQuiz("transporte")}
        >
          Quero planejar meu ambiente
          <Arrow />
        </button>
      </div>

      <div className={styles.transportGallery}>
        <figure className={styles.transportPhotoLarge} data-v10-reveal>
          <Image
            src="/transporte/transporte-01.webp"
            alt="Caminhão próprio da Comar em uma entrega residencial"
            fill
            sizes="(max-width: 900px) 100vw, 52vw"
          />
          <figcaption>Estrutura própria · entrega Comar</figcaption>
        </figure>

        <figure className={styles.transportPhotoSmall} data-v10-reveal>
          <Image
            src="/transporte/transporte-02.webp"
            alt="Caminhão próprio da Comar em frente a uma residência"
            fill
            sizes="(max-width: 900px) 50vw, 25vw"
          />
        </figure>

        <figure className={styles.transportPhotoSmall} data-v10-reveal>
          <Image
            src="/transporte/transporte-03.webp"
            alt="Veículo próprio da Comar usado no transporte dos móveis planejados"
            fill
            sizes="(max-width: 900px) 50vw, 25vw"
          />
        </figure>
      </div>
    </section>
  );
}
