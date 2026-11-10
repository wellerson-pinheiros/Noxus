import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { heroPronta } from "./heroPronta";

gsap.registerPlugin(ScrollTrigger);

// Frames do efeito de fumaça (efeito video/frame-0001.webp ... frame-0301.webp), em ordem numérica
const frameUrls = Object.entries(
  import.meta.glob("../assets/efeito video/frame-*.webp", {
    eager: true,
    query: "?url",
    import: "default",
  }) as Record<string, string>,
)
  .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
  .map(([, url]) => url);

type Capitulo = {
  romano: string;
  nome: string;
  titulo: string;
  paragrafos: string[];
  citacao: string;
};

const CAPITULOS: Capitulo[] = [
  {
    romano: "I",
    nome: "A QUEDA",
    titulo: "A QUEDA",
    paragrafos: [
      "Antes de virar lenda, ele era um homem comum que ousou investigar uma organização intocável. A traição veio de dentro: aliados vendidos, provas apagadas e uma noite em que a cidade o deu como morto. Ninguém foi ao funeral. Ninguém procurou o corpo.",
      "Mas, nas profundezas de um lugar onde a luz jamais chegou, algo o encontrou primeiro.",
    ],
    citacao: "“A luz protege os inocentes. As sombras caçam os culpados.”",
  },
  {
    romano: "II",
    nome: "A SOMBRA",
    titulo: "A SOMBRA",
    paragrafos: [
      "Ele não morreu. Ele foi desfeito. A energia das sombras consumiu o que restava do homem e deixou no lugar algo paciente, frio e faminto. O rosto deixou de existir. O nome virou pó. Sobraram os olhos azuis, brilhando no vazio, e uma certeza: quem o traiu ainda respirava.",
      "Nas noites seguintes, ele aprendeu a ser a escuridão que a cidade sempre teve medo de olhar.",
    ],
    citacao: "“Ele não saiu da sombra. A sombra saiu com ele.”",
  },
  {
    romano: "III",
    nome: "O DESPERTAR",
    titulo: "O DESPERTAR",
    paragrafos: [
      "A primeira noite foi um teste. Um homem da organização atravessou um beco sem saber que já estava sendo observado. Noxus não avisou, não negociou, não hesitou. A luz do poste se apagou e aquele homem nunca mais voltou para casa.",
      "A cidade não entendeu o que aconteceu. Os criminosos entenderam muito bem.",
    ],
    citacao: "“Uma sombra não pede perdão. Uma sombra cobra.”",
  },
  {
    romano: "IV",
    nome: "O JULGAMENTO",
    titulo: "O JULGAMENTO",
    paragrafos: [
      "Noxus não é um herói e nunca quis ser. Ele não prende, não poupa e não perdoa quem escolheu o mal. Um a um, os chefes da organização foram encontrados no escuro, sem testemunhas e sem saída. É a justiça que o sistema nunca teve coragem de aplicar, e ela cobra um preço: a cada culpado que cai, resta menos do homem que ele foi.",
      "Quando o último cair, o que sobrará dele?",
    ],
    citacao: "“Se há culpa, há sombra. Se há sombra, há Noxus.”",
  },
];

const N = CAPITULOS.length;
const PAGINA_INICIAL = 21; // o capítulo I é a página 21 de 24 no design
const TOTAL_PAGINAS = 24;

// Distância de rolagem da seção fixada: 150% da altura da tela por capítulo
// (quanto maior, mais devagar a troca de personagem)
const DISTANCIA_SCROLL = `+=${N * 200}%`;

// Resolução dos frames de fumaça
const FRAME_W = 1280;
const FRAME_H = 720;

const fonteTitulo = "'Butcherman Caps', 'Butcherman', cursive";
const fonteTexto = "'Bodoni Moda SC', serif";

// Capítulo ativo e frame da animação para um progresso global t em [0, N]
function estadoEm(t: number) {
  const ativo = Math.min(Math.floor(t), N - 1);
  const frame = Math.round((Math.min(t, N) / N) * (frameUrls.length - 1));
  return { ativo, frame };
}

function Capitulos() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const barraRef = useRef<HTMLDivElement>(null);
  const escurecerRef = useRef<HTMLDivElement>(null);
  const textoRef = useRef<HTMLElement>(null);
  const stRef = useRef<ScrollTrigger | null>(null);

  const [ativo, setAtivo] = useState(0);

  // Anima o texto do capítulo quando ele muda
  useEffect(() => {
    if (!textoRef.current) return;
    gsap.fromTo(
      textoRef.current,
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
    );
  }, [ativo]);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    const barra = barraRef.current;
    const escurecer = escurecerRef.current;
    if (!wrapper || !section || !canvas || !barra || !escurecer || frameUrls.length === 0) return;

    const ctx2d = canvas.getContext("2d");
    if (!ctx2d) return;

    let cancelado = false;
    let gsapCtx: gsap.Context | undefined;
    let frameAtual = -1;

    let frames: HTMLImageElement[] = [];
    let pronto = false;

    const desenhar = (indice: number) => {
      if (indice === frameAtual || !frames[indice]) return;
      frameAtual = indice;
      ctx2d.drawImage(frames[indice], 0, 0, FRAME_W, FRAME_H);
    };

    const aplicar = (t: number) => {
      const e = estadoEm(t);

      if (pronto) desenhar(e.frame);

      gsap.set(barra, { scaleX: t / N });
      setAtivo(e.ativo);
    };

    // Os frames são muitos (~170 MB): só carregam quando a seção se aproxima da tela
    const carregarFrames = () => {
      if (frames.length) return;
      frames = frameUrls.map((url) => {
        const img = new Image();
        img.decoding = "async";
        img.src = url;
        return img;
      });
      Promise.all(frames.map((img) => img.decode().catch(() => null))).then(() => {
        if (cancelado) return;
        pronto = true;
        desenhar(0);
      });
    };

    const iniciar = () => {
      gsapCtx = gsap.context(() => {
        // Sobreposição escura que clareia conforme a seção entra na tela
        gsap.fromTo(
          escurecer,
          { opacity: 1 },
          {
            opacity: 0,
            ease: "none",
            scrollTrigger: {
              trigger: wrapper,
              start: "top 100%",
              end: "top top",
              scrub: true,
            },
          },
        );

        // Seção fixada enquanto os capítulos são percorridos
        stRef.current = ScrollTrigger.create({
          trigger: wrapper,
          start: "top top",
          end: DISTANCIA_SCROLL,
          pin: section,
          pinSpacing: true,
          anticipatePin: 1,
        });

        // Progresso global (0 a N) controlado pelo scroll, nos dois sentidos
        const estado = { t: 0 };
        gsap.to(estado, {
          t: N,
          ease: "none",
          onUpdate: () => aplicar(estado.t),
          scrollTrigger: {
            trigger: wrapper,
            start: "top top",
            end: DISTANCIA_SCROLL,
            scrub: 1, // suaviza a troca de frames: o frame segue o scroll com um pequeno atraso
          },
        });
      }, wrapper);

    };

    // Só registra os ScrollTriggers depois que a hero fixada já existe, para as posições estarem certas
    heroPronta.then(() => {
      if (!cancelado) iniciar();
    });

    const gatilhoCarregar = ScrollTrigger.create({
      trigger: wrapper,
      start: "top bottom+=1200",
      once: true,
      onEnter: carregarFrames,
    });

    return () => {
      cancelado = true;
      stRef.current = null;
      gatilhoCarregar.kill();
      gsapCtx?.revert();
      frames.forEach((img) => {
        img.src = "";
      });
    };
  }, []);

  // Leva a rolagem para o início do capítulo escolhido
  const irPara = (i: number) => {
    const st = stRef.current;
    if (!st || i < 0 || i >= N) return;
    const alvo = st.start + (st.end - st.start) * (i / N);
    window.scrollTo({ top: alvo, behavior: "smooth" });
  };

  const capitulo = CAPITULOS[ativo];

  return (
    <>
      <div ref={wrapperRef} className="relative w-full">
      <section
        ref={sectionRef}
        className="relative w-full h-screen overflow-hidden bg-[#182533] text-white"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(29,58,99,1) 0%, rgba(20,38,66,1) 50%, rgba(11,18,32,1) 100%)",
        }}
      >
        {/* Sequência de frames (efeito video) tocada pelo scroll ao longo de todos os capítulos */}
        <canvas
          ref={canvasRef}
          width={FRAME_W}
          height={FRAME_H}
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />

        {/* Sobreposição escura de entrada: começa preta e clareia ao rolar */}
        <div
          ref={escurecerRef}
          className="absolute inset-0 z-20 pointer-events-none bg-black"
          style={{ opacity: 1 }}
        />

        {/* Transição escura só nas bordas de cima e de baixo, para a seção não ficar demarcada */}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,#000_0%,rgba(0,0,0,0)_20%,rgba(0,0,0,0)_75%,#000_100%)]" />

        {/* Escurecimento para legibilidade do texto */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/70 via-black/10 to-black/40 md:bg-gradient-to-r md:from-black/30 md:via-transparent md:to-black/30" />

        <div className="relative z-10 flex h-full flex-col justify-between px-6 py-6 md:block md:px-16 md:py-0">
          {/* Seletor de capítulos */}
          <nav
            aria-label="Capítulos"
            className="flex gap-3 md:absolute md:left-16 md:top-[20vh] md:flex-col md:gap-[2vh]"
          >
            <p
              className="hidden md:block mb-[4.5vh] text-[#c3cfdf] text-[22px] tracking-[3px] italic whitespace-nowrap"
              style={{ fontFamily: fonteTexto }}
            >
              CAPÍTULOS
            </p>
            {CAPITULOS.map((c, i) => {
              const ativoAgora = ativo === i;
              return (
                <button
                  key={c.romano}
                  type="button"
                  onClick={() => irPara(i)}
                  aria-current={ativoAgora ? "step" : undefined}
                  className="group flex items-center gap-4 text-left"
                >
                  <span
                    className={`flex items-center justify-center size-14 md:size-[clamp(3.5rem,8.9vh,6rem)] border border-solid italic text-2xl md:text-[30px] transition-colors duration-500 ${
                      ativoAgora
                        ? "bg-[#2a1418] border-[#ff5a5a] text-white"
                        : "bg-[#121c2e] border-[#3a4a63] text-[#9fb0c8]"
                    }`}
                    style={{ fontFamily: fonteTexto }}
                  >
                    {c.romano}
                  </span>
                  <span
                    className={`hidden md:block text-[12px] tracking-[1.5px] transition-colors duration-500 ${
                      ativoAgora ? "text-[#ff7a7a]" : "text-[#7f90a8]"
                    }`}
                  >
                    {c.nome}
                  </span>
                </button>
              );
            })}
          </nav>

          {/* Texto do capítulo */}
          <article
            ref={textoRef}
            className="md:absolute md:left-[67.7%] md:top-[21vh] md:w-[29.2%] max-w-xl md:max-w-none"
          >
            <p
              className="text-[#ff7a7a] text-[12px] md:text-[20px] tracking-[3px] italic"
              style={{ fontFamily: fonteTexto }}
            >
              CAPÍTULO {capitulo.romano} · A HISTÓRIA
            </p>
            <h2
              className="mt-2 text-[clamp(2.5rem,4.5vw,4rem)] leading-none uppercase"
              style={{ fontFamily: fonteTitulo }}
            >
              {capitulo.titulo}
            </h2>
            <div className="mt-6 md:mt-8 space-y-4 text-[#dbe3ee] text-[14px] md:text-[17px] leading-[1.65]">
              {capitulo.paragrafos.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <div className="mt-6 md:mt-10 h-px bg-[#3a4a63]" />
            <blockquote
              className="mt-5 md:mt-6 text-[clamp(1.1rem,1.8vw,26px)] leading-snug italic text-white"
              style={{ fontFamily: fonteTexto }}
            >
              {capitulo.citacao}
            </blockquote>
          </article>

          {/* Barra de progresso e navegação */}
          <div className="md:absolute md:left-16 md:right-16 md:top-[82%]">
            <div className="h-[2px] w-full bg-[#26354d]">
              <div ref={barraRef} className="h-full w-full origin-left bg-[#ff5a5a]" style={{ transform: "scaleX(0)" }} />
            </div>
            <div className="mt-4 md:mt-5 flex items-center justify-between text-[12px] md:text-[14px] tracking-[2px] text-[#c3cfdf]">
              <button
                type="button"
                onClick={() => irPara(ativo - 1)}
                disabled={ativo === 0}
                className="disabled:opacity-30 transition-opacity"
              >
                ← ANTERIOR
              </button>
              <span className="hidden md:block">
                {PAGINA_INICIAL + ativo} / {TOTAL_PAGINAS}
              </span>
              <button
                type="button"
                onClick={() => irPara(ativo + 1)}
                disabled={ativo === N - 1}
                className="disabled:opacity-30 transition-opacity"
              >
                PRÓXIMO →
              </button>
            </div>
          </div>
        </div>
      </section>
      </div>
    </>
  );
}

export default Capitulos;
