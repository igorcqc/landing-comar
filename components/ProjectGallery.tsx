"use client";

import { useState } from "react";
import Image from "next/image";

type Categoria = "Cozinha" | "Quarto" | "Closet" | "Sala" | "Banheiro";

interface Projeto {
  src: string;
  alt: string;
  categoria: Categoria;
  destaqueTodos?: boolean;
  big?: boolean;
}

const PROJETOS: Projeto[] = [
  { src: "/projetos/cozinha-01.jpg", alt: "Cozinha planejada com marcenaria em tom azul e bancada branca", categoria: "Cozinha", destaqueTodos: true, big: true },
  { src: "/projetos/cozinha-02.jpg", alt: "Cozinha planejada com acabamento escuro e iluminação linear", categoria: "Cozinha", destaqueTodos: true },
  { src: "/projetos/cozinha-03.jpg", alt: "Cozinha planejada com ilha e geladeira integrada", categoria: "Cozinha" },

  { src: "/projetos/quarto-01.jpg", alt: "Quarto planejado com guarda-roupa espelhado", categoria: "Quarto", destaqueTodos: true },
  { src: "/projetos/quarto-02.jpg", alt: "Quarto planejado com bancada de estudos sob medida", categoria: "Quarto" },
  { src: "/projetos/quarto-03.jpg", alt: "Quarto planejado com espelho circular com LED", categoria: "Quarto" },

  { src: "/projetos/closet-01.jpg", alt: "Closet planejado com prateleiras em branco e madeira", categoria: "Closet" },
  { src: "/projetos/closet-02.jpg", alt: "Closet planejado modular em tom de cinza", categoria: "Closet" },
  { src: "/projetos/closet-03.jpg", alt: "Closet planejado com iluminação em LED embutida", categoria: "Closet", destaqueTodos: true, big: true },

  { src: "/projetos/sala-01.jpg", alt: "Sala planejada com painel para TV em cinza", categoria: "Sala" },
  { src: "/projetos/sala-02.jpg", alt: "Sala planejada com estante e painel para TV", categoria: "Sala" },
  { src: "/projetos/sala-03.jpg", alt: "Sala planejada com painel ripado e acabamento em pedra", categoria: "Sala", destaqueTodos: true },

  { src: "/projetos/banheiro-01.jpg", alt: "Banheiro planejado com bancada em mármore escuro", categoria: "Banheiro", destaqueTodos: true },
  { src: "/projetos/banheiro-02.jpg", alt: "Banheiro planejado com bancada suspensa em madeira", categoria: "Banheiro", destaqueTodos: true },
  { src: "/projetos/banheiro-03.jpg", alt: "Banheiro planejado com espelho iluminado", categoria: "Banheiro" },
];

const CATEGORIAS: Array<Categoria | "Todos"> = [
  "Todos",
  "Cozinha",
  "Quarto",
  "Closet",
  "Sala",
  "Banheiro",
];

export default function ProjectGallery() {
  const [ativo, setAtivo] = useState<Categoria | "Todos">("Todos");

  const visiveis = PROJETOS.filter((p) =>
    ativo === "Todos" ? p.destaqueTodos : p.categoria === ativo
  );

  return (
    <div>
      <div className="filters" role="tablist">
        {CATEGORIAS.map((cat) => (
          <button
            key={cat}
            className={`filter${ativo === cat ? " active" : ""}`}
            onClick={() => setAtivo(cat)}
            type="button"
            role="tab"
            aria-selected={ativo === cat}
          >
            {cat}
          </button>
        ))}
      </div>
      <div className="photo-grid reveal in">
        {visiveis.map((p) => (
          <figure
            className={`photo-card${p.big ? " big" : ""}`}
            key={p.src}
          >
            <Image
              src={p.src}
              alt={p.alt}
              fill
              sizes="(max-width: 700px) 50vw, (max-width: 1100px) 33vw, 400px"
              style={{ objectFit: "cover" }}
            />
            <figcaption>{p.categoria}</figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
