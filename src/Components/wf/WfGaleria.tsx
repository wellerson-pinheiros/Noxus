import { useState } from "react";
import cidadeCaida from "../../assets/wf-galeria/wf-02-cidade-caida.jpg";
import placeholder1 from "../../assets/wf-galeria/wf-02-placeholder-1.png";
import placeholder2 from "../../assets/wf-galeria/wf-02-placeholder-2.png";

const fonteTitulo = "'Butcherman Caps', 'Butcherman', cursive";
const fonteCorpo = "'Inter', sans-serif";

// As 3 imagens do Figma, multiplicadas por 2 para o carrossel (6 itens, 3 visíveis por vez)
const ITENS = [
  { imagem: cidadeCaida, alt: "A cidade caída", titulo: "A CIDADE CAÍDA" },
  { imagem: placeholder1, alt: "A torre silenciosa", titulo: "A TORRE SILENCIOSA" },
  { imagem: placeholder2, alt: "Fragmentos", titulo: "FRAGMENTOS" },
];
const GALERIA = [...ITENS, ...ITENS];

const VISIVEIS = 3;
const MAX_INDICE = GALERIA.length - VISIVEIS; // 3 posições de navegação

// Medidas do Figma em cqw (1% da largura do frame de 1920px): as letras e os espaços acompanham a tela
const CARD_LARGURA = 29.167;
const CARD_ALTURA = 16.25;
const ESPACO = 2.917; // espaço entre as imagens (56px no Figma)
const PASSO = CARD_LARGURA + ESPACO;
const INICIO = 3.333;
const AREA_LARGURA = 89.17; // até a borda da terceira imagem, como no Figma

// WF 02 — Galeria em Destaque, com anterior e próximo
function WfGaleria() {
  const [indice, setIndice] = useState(0);
  const progresso = ((indice + 1) / (MAX_INDICE + 1)) * 93.33;

  return (
    <section id="galeria" className="@container relative w-full aspect-[1920/912] overflow-hidden bg-[#121c2e]">
      {/* Gradiente que escurece em direção à base */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0)_0%,#000_114.25%)]" />

      {/* Cabeçalho da seção */}
      <div className="absolute left-[3.333cqw] top-[6.25cqw] flex h-[1.25cqw] w-[93.33cqw] items-center justify-between">
        <div className="flex items-center gap-[0.833cqw]" style={{ fontFamily: fonteCorpo }}>
          <span className="text-[0.729cqw] font-semibold tracking-[0.109cqw] text-[#db1f1f]">02</span>
          <span className="text-[0.729cqw] font-semibold tracking-[0.146cqw] text-[#f4f4f4]">GALERIA EM DESTAQUE</span>
        </div>
        <span className="text-[0.677cqw] font-medium tracking-[0.1016cqw] text-[#9fb0c8]" style={{ fontFamily: fonteCorpo }}>
          VER TUDO →
        </span>
      </div>

      <h2
        className="absolute left-[3.333cqw] top-[9.167cqw] whitespace-nowrap text-[2.917cqw] leading-normal text-[#db1f1f]"
        style={{ fontFamily: fonteTitulo }}
      >
        FRAGMENTOS DE UM MUNDO SOMBRIO
      </h2>

      {/* Área visível do carrossel: corta a terceira imagem na borda, como no Figma */}
      <div
        className="absolute top-[16.146cqw] h-[24cqw] overflow-hidden"
        style={{ left: `${INICIO}cqw`, width: `${AREA_LARGURA}cqw` }}
      >
        <div
          className="flex items-start transition-transform duration-700 ease-out"
          style={{ gap: `${ESPACO}cqw`, transform: `translateX(-${indice * PASSO}cqw)` }}
        >
          {GALERIA.map((item, i) => (
            <figure key={i} className="shrink-0" style={{ width: `${CARD_LARGURA}cqw` }}>
              <img
                src={item.imagem}
                alt={item.alt}
                className="block object-cover"
                style={{ width: `${CARD_LARGURA}cqw`, height: `${CARD_ALTURA}cqw` }}
              />
              <figcaption
                className="mt-[1.35cqw] flex items-center gap-[0.833cqw]"
                style={{ fontFamily: fonteCorpo }}
              >
                <span className="text-[0.677cqw] font-semibold tracking-[0.068cqw] text-[#db1f1f]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="h-px w-[1.667cqw] bg-[#9fb0c8]" />
                <span className="text-[0.677cqw] font-medium tracking-[0.1016cqw] text-[#f4f4f4]">{item.titulo}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      {/* Linha de progresso e navegação */}
      <div className="absolute left-[3.333cqw] top-[39.43cqw] h-px w-[93.33cqw] bg-[#3a4a63]" />
      <div
        className="absolute left-[3.333cqw] top-[39.479cqw] h-[0.104cqw] bg-[#db1f1f] transition-[width] duration-700 ease-out"
        style={{ width: `${progresso}cqw` }}
      />
      <button
        type="button"
        onClick={() => setIndice((i) => Math.max(0, i - 1))}
        disabled={indice === 0}
        className="absolute left-[3.333cqw] top-[42.448cqw] text-[0.677cqw] font-medium tracking-[0.1016cqw] text-[#9fb0c8] transition-opacity disabled:opacity-30"
        style={{ fontFamily: fonteCorpo }}
      >
        ←&nbsp;&nbsp;ANTERIOR
      </button>
      <button
        type="button"
        onClick={() => setIndice((i) => Math.min(MAX_INDICE, i + 1))}
        disabled={indice === MAX_INDICE}
        className="absolute left-[91.2cqw] top-[41.771cqw] text-[0.677cqw] font-medium tracking-[0.1016cqw] text-[#9fb0c8] transition-opacity disabled:opacity-30"
        style={{ fontFamily: fonteCorpo }}
      >
        PRÓXIMO&nbsp;&nbsp;→
      </button>
    </section>
  );
}

export default WfGaleria;
