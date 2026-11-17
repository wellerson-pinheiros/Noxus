import { useRef, useState } from "react";
import type { UIEvent } from "react";
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
    <section
      id="galeria"
      className="@container relative w-full overflow-hidden bg-[#121c2e] md:aspect-[1920/912]"
    >
      {/* Gradiente que escurece em direção à base */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0)_0%,#000_114.25%)]" />

      {/* ===== Mobile: rolagem horizontal ===== */}
      <MobileGaleria />

      {/* ===== Desktop: layout original em cqw ===== */}
      <div className="hidden md:contents">
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
                <figcaption className="mt-[1.35cqw] flex items-center gap-[0.833cqw]" style={{ fontFamily: fonteCorpo }}>
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
          className="absolute left-[3.333cqw] top-[42.448cqw] cursor-pointer text-[0.677cqw] font-medium tracking-[0.1016cqw] text-[#9fb0c8] transition-opacity disabled:cursor-default disabled:opacity-30"
          style={{ fontFamily: fonteCorpo }}
        >
          ←&nbsp;&nbsp;ANTERIOR
        </button>
        <button
          type="button"
          onClick={() => setIndice((i) => Math.min(MAX_INDICE, i + 1))}
          disabled={indice === MAX_INDICE}
          className="absolute left-[91.2cqw] top-[41.771cqw] cursor-pointer text-[0.677cqw] font-medium tracking-[0.1016cqw] text-[#9fb0c8] transition-opacity disabled:cursor-default disabled:opacity-30"
          style={{ fontFamily: fonteCorpo }}
        >
          PRÓXIMO&nbsp;&nbsp;→
        </button>
      </div>
    </section>
  );
}

// Versão mobile: as imagens rolam para o lado com snap, e a barra/botões acompanham a posição
function MobileGaleria() {
  const trilhoRef = useRef<HTMLDivElement>(null);
  const [indice, setIndice] = useState(0);
  const progresso = ((indice + 1) / GALERIA.length) * 100;

  // Índice atual calculado pela posição de rolagem
  const aoRolar = (e: UIEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const primeiro = el.children[0] as HTMLElement | undefined;
    const segundo = el.children[1] as HTMLElement | undefined;
    if (!primeiro || !segundo) return;
    const passo = segundo.offsetLeft - primeiro.offsetLeft;
    const novo = Math.round(el.scrollLeft / passo);
    setIndice(Math.min(GALERIA.length - 1, Math.max(0, novo)));
  };

  const irPara = (novo: number) => {
    const el = trilhoRef.current;
    const alvo = el?.children[novo] as HTMLElement | undefined;
    if (!el || !alvo) return;
    el.scrollTo({ left: alvo.offsetLeft - el.offsetLeft, behavior: "smooth" });
  };

  return (
    <div className="relative z-10 px-[16px] pt-[48px] pb-[48px] md:hidden">
      {/* Cabeçalho */}
      <div className="flex items-center justify-between" style={{ fontFamily: fonteCorpo }}>
        <div className="flex items-center gap-[10px]">
          <span className="text-[12px] font-semibold tracking-[1.5px] text-[#db1f1f]">02</span>
          <span className="text-[12px] font-semibold tracking-[2px] text-[#f4f4f4]">GALERIA EM DESTAQUE</span>
        </div>
        <span className="text-[11px] font-medium tracking-[1.4px] text-[#9fb0c8]">VER TUDO →</span>
      </div>

      <h2
        className="mt-[24px] text-[28px] leading-[1.15] text-[#db1f1f]"
        style={{ fontFamily: fonteTitulo }}
      >
        FRAGMENTOS DE UM MUNDO SOMBRIO
      </h2>

      {/* Trilho de rolagem horizontal */}
      <div
        ref={trilhoRef}
        onScroll={aoRolar}
        className="-mx-[16px] mt-[32px] flex snap-x snap-mandatory gap-[16px] overflow-x-auto scroll-smooth px-[16px] pb-[8px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {GALERIA.map((item, i) => (
          <figure key={i} className="w-[72vw] max-w-[320px] shrink-0 snap-start">
            <img
              src={item.imagem}
              alt={item.alt}
              className="block w-full object-cover"
              style={{ aspectRatio: `${CARD_LARGURA} / ${CARD_ALTURA}` }}
              draggable={false}
            />
            <figcaption className="mt-[14px] flex items-center gap-[10px]" style={{ fontFamily: fonteCorpo }}>
              <span className="text-[11px] font-semibold tracking-[0.5px] text-[#db1f1f]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="h-px w-[16px] bg-[#9fb0c8]" />
              <span className="text-[11px] font-medium tracking-[1px] text-[#f4f4f4]">{item.titulo}</span>
            </figcaption>
          </figure>
        ))}
      </div>

      {/* Progresso */}
      <div className="relative mt-[24px] h-px w-full bg-[#3a4a63]">
        <div
          className="absolute left-0 top-0 h-[2px] -translate-y-[0.5px] bg-[#db1f1f] transition-[width] duration-500 ease-out"
          style={{ width: `${progresso}%` }}
        />
      </div>

      {/* Navegação */}
      <div className="mt-[20px] flex items-center justify-between" style={{ fontFamily: fonteCorpo }}>
        <button
          type="button"
          onClick={() => irPara(Math.max(0, indice - 1))}
          disabled={indice === 0}
          className="cursor-pointer text-[11px] font-medium tracking-[1.4px] text-[#9fb0c8] transition-opacity disabled:cursor-default disabled:opacity-30"
        >
          ←&nbsp;&nbsp;ANTERIOR
        </button>
        <button
          type="button"
          onClick={() => irPara(Math.min(GALERIA.length - 1, indice + 1))}
          disabled={indice === GALERIA.length - 1}
          className="cursor-pointer text-[11px] font-medium tracking-[1.4px] text-[#9fb0c8] transition-opacity disabled:cursor-default disabled:opacity-30"
        >
          PRÓXIMO&nbsp;&nbsp;→
        </button>
      </div>
    </div>
  );
}

export default WfGaleria;
