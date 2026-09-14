import Image from "next/image";
import { Arrow, Check, SectionKicker } from "./V10UI";
import styles from "./v10.module.css";

const FAQ = [
  {
    q: "A Comar atende quais regiões?",
    a: "Atendemos projetos em São José do Norte, Rio Grande e Cassino. No quiz você escolhe o local do seu projeto e nossa equipe orienta os próximos passos.",
  },
  {
    q: "Posso planejar apenas um ambiente?",
    a: "Sim. Você pode começar por cozinha, área gourmet, dormitório, closet, sala, banheiro ou conversar com a equipe sobre outro ambiente.",
  },
  {
    q: "Como começa o meu projeto?",
    a: "Você responde algumas perguntas rápidas sobre ambiente, local, momento e faixa de investimento. Depois, nossa equipe continua o atendimento pelo WhatsApp para entender medidas, referências e necessidades.",
  },
  {
    q: "A Comar também fabrica e instala?",
    a: "Sim. A Comar possui fábrica própria e acompanha o processo do projeto à instalação, trazendo mais controle sobre execução e acabamento.",
  },
  {
    q: "Preciso ter todas as medidas antes de falar com vocês?",
    a: "Não. O primeiro contato serve justamente para entendermos o seu momento. A equipe orienta quando e como a medição entra no processo.",
  },
  {
    q: "Quanto tempo leva para receber atendimento?",
    a: "Depois de concluir o quiz, você é direcionado ao WhatsApp com as informações do projeto já organizadas para agilizar a conversa.",
  },
];

export function FaqFinalLocation({
  openQuiz,
}: {
  openQuiz: (source: string) => void;
}) {
  return (
    <>
      <section className={styles.faqSection} id="faq">
        <div className={styles.faqIntro} data-v10-reveal>
          <SectionKicker>Dúvidas antes de começar?</SectionKicker>
          <h2>Informação clara também faz parte de um bom projeto.</h2>
          <p>
            Se ainda restar alguma dúvida, o quiz organiza seu pedido e nossa
            equipe continua a conversa no WhatsApp.
          </p>
          <button
            type="button"
            className={styles.darkButton}
            onClick={() => openQuiz("faq")}
          >
            Falar sobre meu projeto
            <Arrow />
          </button>
        </div>

        <div className={styles.faqList}>
          {FAQ.map((item) => (
            <details key={item.q} data-v10-reveal>
              <summary>
                <span>{item.q}</span>
                <b>+</b>
              </summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className={styles.finalSection}>
        <div className={styles.finalMedia}>
          <Image
            src="/projetos/cozinha-03.jpg"
            alt="Cozinha planejada completa executada pela Comar"
            fill
            sizes="(max-width: 900px) 100vw, 50vw"
          />
        </div>
        <div className={styles.finalCopy} data-v10-reveal>
          <SectionKicker light>Seu projeto pode começar agora</SectionKicker>
          <h2>
            Conte o que você imagina. A Comar ajuda a transformar em ambiente.
          </h2>
          <p>
            São cinco etapas rápidas. Você escolhe o ambiente, local, momento e
            faixa de investimento e já chega ao WhatsApp com tudo organizado.
          </p>
          <button
            type="button"
            className={styles.lightButton}
            onClick={() => openQuiz("final")}
          >
            Quero planejar meu ambiente
            <Arrow />
          </button>
          <ul>
            <li><Check /> São José do Norte</li>
            <li><Check /> Rio Grande</li>
            <li><Check /> Cassino</li>
          </ul>
        </div>
      </section>

      <section className={styles.locationSection}>
        <div className={styles.locationCopy} data-v10-reveal>
          <SectionKicker>Comar Móveis Planejados</SectionKicker>
          <h2>
            Uma empresa da região para cuidar do seu projeto de perto.
          </h2>
          <address>
            <b>Showroom</b>
            <span>R. Ramiro Barcelos, 910 · Centro</span>
            <span>São José do Norte / RS · 96225-000</span>
          </address>
          <a href="tel:+5553999044420">(53) 99904-4420</a>
        </div>

        <div className={styles.mapWrap} data-v10-reveal>
          <iframe
            src="https://www.google.com/maps?q=R.+Ramiro+Barcelos,+910,+Centro,+S%C3%A3o+Jos%C3%A9+do+Norte,+RS,+96225-000&output=embed"
            title="Localização da Comar Móveis Planejados"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      </section>
    </>
  );
}

export function V10Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerBrand}>
        <span>COMAR</span>
        <small>Móveis planejados</small>
      </div>
      <p>
        Projeto · fabricação · instalação<br />
        São José do Norte · Rio Grande · Cassino
      </p>
      <div>
        <a href="#projetos">Projetos</a>
        <a href="#processo">Como funciona</a>
        <a href="#clientes">Clientes</a>
        <a href="#faq">Dúvidas</a>
      </div>
      <small>
        © 2026 Comar Móveis Planejados · Seus dados são utilizados apenas para
        atendimento do seu projeto.
      </small>
    </footer>
  );
}
