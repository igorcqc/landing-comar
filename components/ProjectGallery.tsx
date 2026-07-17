"use client";

import { useState } from "react";
import Image from "next/image";

type Categoria = "Cozinha" | "Quarto" | "Closet" | "Sala" | "Banheiro" | "Detalhes";

interface Projeto {
  src: string;
  alt: string;
  categoria: Categoria;
  big?: boolean;
}

const PROJETOS: Projeto[] = [
  { src: "/projetos/cozinha-01.jpg", alt: "Cozinha planejada com ilha em preto fosco e marcenaria em madeira", categoria: "Cozinha", big: true },
  { src: "/projetos/quarto-01.jpg", alt: "Quarto planejado com painel ripado em madeira e iluminação embutida", categoria: "Quarto" },
  { src: "/projetos/closet-01.jpg", alt: "Closet planejado com iluminação em LED e portas amadeiradas", categoria: "Closet" },
  { src: "/projetos/sala-01.jpg", alt: "Estofado sob medida em linho claro", categoria: "Sala" },
  { src: "/projetos/banheiro-01.jpg", alt: "Banheiro planejado com bancada em preto e marmorizado", categoria: "Banheiro", big: true },
  { src: "/projetos/quarto-02.jpg", alt: "Quarto planejado com cabeceira em madeira e criado-mudo em concreto", categoria: "Quarto" },
  { src: "/projetos/cozinha-02.jpg", alt: "Cozinha planejada com marcenaria escura e iluminação linear", categoria: "Cozinha" },
  { src: "/projetos/sala-02.jpg", alt: "Sala planejada com painel para TV e acabamento em pedra", categoria: "Sala" },
  { src: "/projetos/detalhe-01.jpg", alt: "Detalhe de acabamento em estofado sob medida", categoria: "Detalhes" },
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

  const visiveis = PROJETOS.filter(
    (p) => ativo === "Todos" || p.categoria === ativo
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
