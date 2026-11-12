import { useEffect, useRef, useState, type CSSProperties } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import caveira from "../assets/caveira-indicacao-rolagem.svg";
import linhaCaveira from "../assets/Linha-caveira.svg?url";
import mouseRolagem from "../assets/mause-rolagem-baixo.svg";
import primeiroFrame from "../assets/video_hero_frames/frame_005.png";
import subtractMobile from "../assets/mobile-hero/subtract-mobile.svg";
import logoSkull from "../assets/mobile-hero/logo-skull.svg";
import logoXm from "../assets/mobile-hero/logo-xm.svg";
import chamas from "../assets/mobile-hero/chamas.png";
import { marcarHeroPronta, reportarProgresso } from "./heroPronta";

gsap.registerPlugin(ScrollTrigger);

// Frames da animação, em ordem numérica (frame_005.png ... frame_046.png)
const frameUrls = Object.entries(
  import.meta.glob("../assets/video_hero_frames/*.png", {
  // import.meta.glob("../assets/video_hero_frames8/*.webp", {
    eager: true,
    query: "?url",
    import: "default",
  }) as Record<string, string>,
)
  .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
  .map(([, url]) => url);

// Geometria do Subtract.svg (viewBox 1880x1030) normalizada para 0..1,
// usada com clipPathUnits="objectBoundingBox" para acompanhar o tamanho da caixa.
const SUBTRACT_PATH =
  "M0.74415 0C0.75032 0 0.75532 0.00913 0.75532 0.02039V0.04757C0.75532 0.05883 0.76032 0.06796 0.76649 0.06796H0.98883C0.995 0.06796 1 0.07709 1 0.08835V0.97961C1 0.99087 0.995 1 0.98883 1H0.00798C0.00651 1 0.00532 0.99783 0.00532 0.99515C0.00532 0.99247 0.00413 0.99029 0.00266 0.99029C0.00119 0.99029 0 0.98812 0 0.98544V0.07864C0 0.06738 0.005 0.05825 0.01117 0.05825H0.10319C0.10936 0.05825 0.11436 0.04912 0.11436 0.03786V0.02039C0.11436 0.00913 0.11936 0 0.12553 0H0.74415Z";

const ASPECT = 1880 / 1030;

// Resolução dos frames
const FRAME_W = 1920;
const FRAME_H = 1080;

// Distância de rolagem usada na transição (em % da altura da viewport).
// Aumente para uma transição mais lenta, diminua para mais rápida.
const DISTANCIA_SCROLL = "+=300%";

const midia = "absolute inset-0 w-full h-full object-cover object-bottom";

// Mobile (frame iPhone 16, 393x852): o Subtract mobile vira máscara da área do vídeo.
// Medidas em cqw (1% da largura do frame), por isso a caixa usa o mesmo vídeo do desktop.
const mascaraMobile: CSSProperties = {
  left: "0.127cqw",
  top: "99.49cqw",
  width: "99.746cqw",
  height: "114.76cqw",
  WebkitMaskImage: `url("${subtractMobile}")`,
  maskImage: `url("${subtractMobile}")`,
  WebkitMaskSize: "100% 100%",
  maskSize: "100% 100%",
  WebkitMaskRepeat: "no-repeat",
  maskRepeat: "no-repeat",
};

const MOBILE_MAX = "(max-width: 767px)";

const fonteTitulo = "'Butcherman Caps', 'Butcherman', cursive";
const fonteTexto = "'Bodoni Moda SC', serif";

function Home() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const linhaRef = useRef<HTMLDivElement>(null);
  const caveiraRef = useRef<HTMLImageElement>(null);

  // Frames carregados e desenhados no canvas
  const [pronto, setPronto] = useState(false);
  // Só muda quando cruza o limiar, para evitar re-render a cada frame
  const [rolou, setRolou] = useState(false);
  // Layout de celular (iPhone 16) abaixo de 768px
  const [mobile, setMobile] = useState(() => window.matchMedia(MOBILE_MAX).matches);

  useEffect(() => {
    const mq = window.matchMedia(MOBILE_MAX);
    const trocar = (e: MediaQueryListEvent) => setMobile(e.matches);
    mq.addEventListener("change", trocar);
    return () => mq.removeEventListener("change", trocar);
  }, []);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    const linha = linhaRef.current;
    const caveiraEl = caveiraRef.current;
    if (!wrapper || !section || !canvas || !linha || !caveiraEl || frameUrls.length === 0) {
      marcarHeroPronta();
      return;
    }

    const ctx2d = canvas.getContext("2d");
    if (!ctx2d) return;

    const reduzirMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let cancelado = false;
    let gsapCtx: gsap.Context | undefined;
    let frameAtual = -1;

    const desenhar = (indice: number, imgs: HTMLImageElement[]) => {
      if (indice === frameAtual) return; // evita redesenhar o mesmo frame
      frameAtual = indice;
      ctx2d.drawImage(imgs[indice], 0, 0, FRAME_W, FRAME_H);
    };

    const atualizarIndicadores = (progresso: number) => {
      linha.style.height = `${progresso * 100}%`;
      linha.style.opacity = progresso > 0.02 ? "1" : "0";
      caveiraEl.style.top = `${progresso * 100}%`;
      setRolou(progresso > 0.02);
    };

    // Cria os frames e espera todos decodificarem, para não haver travamento durante a rolagem
    const imgs = frameUrls.map((url) => {
      const img = new Image();
      img.decoding = "async";
      img.src = url;
      return img;
    });

    // Conta cada frame decodificado para alimentar o pré-loader
    let carregadas = 0;
    Promise.all(
      imgs.map((img) =>
        img.decode().catch(() => null).then(() => {
          carregadas++;
          reportarProgresso(carregadas / imgs.length);
        }),
      ),
    ).then(() => {
      if (cancelado) return;

      setPronto(true);
      desenhar(0, imgs);

      gsapCtx = gsap.context(() => {
        // Progresso do scroll: caveira, linha e indicador do mouse
        ScrollTrigger.create({
          trigger: wrapper,
          start: "top top",
          end: DISTANCIA_SCROLL,
          pin: reduzirMovimento ? false : section,
          pinSpacing: true,
          anticipatePin: 1,
          onUpdate: (self) => atualizarIndicadores(self.progress),
        });

        if (!reduzirMovimento) {
          // Índice do frame controlado pelo scroll, nos dois sentidos
          const estado = { frame: 0 };
          gsap.to(estado, {
            frame: imgs.length - 1,
            ease: "none",
            onUpdate: () => desenhar(Math.round(estado.frame), imgs),
            scrollTrigger: {
              trigger: wrapper,
              start: "top top",
              end: DISTANCIA_SCROLL,
              scrub: 0.5,
            },
          });
        }
      }, wrapper);

      ScrollTrigger.refresh();
      marcarHeroPronta();
    });

    return () => {
      cancelado = true;
      gsapCtx?.revert(); // remove tweens e ScrollTriggers criados aqui
      imgs.forEach((img) => {
        img.src = "";
      });
    };
  }, []);

  return (
    <div ref={wrapperRef} className="relative w-screen">
      <section ref={sectionRef} className={`relative w-screen h-dvh overflow-hidden ${mobile ? "bg-[#121c2e]" : "bg-[#141c26]"}`}>
        {/* Definição do recorte (Subtract) */}
        <svg width="0" height="0" className="absolute" aria-hidden="true">
          <defs>
            <clipPath id="subtract-clip" clipPathUnits="objectBoundingBox">
              <path d={SUBTRACT_PATH} />
            </clipPath>
          </defs>
        </svg>

        {/* No mobile, esta área é o frame iPhone 16 inteiro; no desktop não cria caixa, então nada muda */}
        <div className={mobile ? "@container absolute left-0 top-0 w-screen aspect-[393/852]" : "contents"}>
        {/* Caixa com a proporção do Subtract: cobre a tela sem distorcer a geometria */}
        <div
          className={
            mobile
              ? "absolute bg-[#C2C2C2]"
              : "absolute left-1/2 top-[calc(58%+20px)] -translate-x-1/2 -translate-y-1/2 bg-[#F4F4F4]"
          }
          style={
            mobile
              ? mascaraMobile
              : {
                  width: `max(98vw, calc(100dvh * ${ASPECT}))`,
                  aspectRatio: `${ASPECT}`,
                  clipPath: "url(#subtract-clip)",
                }
          }
        >

          {/* Imagem inicial (fallback enquanto os frames carregam) */}
          <img
            src={primeiroFrame}
            alt="Personagem NOXUS"
            className={`${midia} transition-opacity duration-700 will-change-[opacity] ${
              pronto ? "opacity-0 invisible" : "opacity-100"
            }`}
          />

          {/* Frames da animação, desenhados conforme a rolagem */}
          <canvas
            ref={canvasRef}
            width={FRAME_W}
            height={FRAME_H}
            role="img"
            aria-label="Animação do personagem NOXUS"
            className={`${midia} will-change-[opacity] ${pronto ? "opacity-100" : "opacity-0"}`}
          />
        </div>

        {/* Textos ao lado do personagem */}
        <div className={mobile ? "hidden" : "absolute inset-0 z-20 flex flex-col md:flex-row items-center justify-between gap-6 px-6 md:px-16 pointer-events-none"}>
          <h1
            className={`${
              rolou ? "text-white" : "text-black"
            } transition-colors duration-700 text-center md:text-left font-bold uppercase leading-none tracking-wide w-full md:w-1/3`}
            style={{ fontFamily: fonteTitulo }}
          >
            <span className="block text-[clamp(3rem,8vw,8rem)]">Noxus</span>
            <span className={`block text-[clamp(1rem,2.2vw,2.25rem)] mt-2 transition-colors duration-700 ${rolou ? "text-white" : "text-black"}`}>
              Fear The Silence- Embrace The Darkness
            </span>
          </h1>

          <p
            className={`${
              rolou ? "text-white" : "text-black"
            } transition-colors duration-700 text-center md:text-left italic uppercase tracking-[0.2em] leading-relaxed text-[clamp(0.85rem,1.3vw,1.25rem)] w-full md:w-1/3 md:max-w-md`}
            style={{ fontFamily: fonteTexto }}
          >
            Envolto por uma fumaça negra viva e guiado por uma energia desconhecida, NOXIS caminha entre a luz e a escuridão.
          </p>
        </div>

        {mobile && (
          <>
            {/* Logo XM no canto superior esquerdo (Figma iPhone 16) */}
            <div className="absolute left-[8.65cqw] top-[9.92cqw] h-[10.18cqw] w-[32.82cqw]">
              <img src={logoSkull} alt="" className="absolute left-[11.7cqw] top-0 h-[11.2cqw] w-[9.92cqw]" />
              <img src={logoXm} alt="" className="absolute left-[12.47cqw] top-[5.6cqw] h-[3.05cqw] w-[8.4cqw]" />
              <div className="absolute" style={{ left: "16.54cqw", top: "1.27cqw", width: "16.28cqw", height: "8.91cqw" }}>
                <img src={chamas} alt="" className="absolute inset-0 size-full object-cover" style={{ transform: "scaleY(-1) rotate(180deg)", opacity: 0.88 }} />
              </div>
              <div className="absolute" style={{ left: "0cqw", top: "1.27cqw", width: "16.28cqw", height: "8.91cqw" }}>
                <img src={chamas} alt="" className="absolute inset-0 size-full object-cover" style={{ transform: "scaleY(-1) rotate(180deg)", opacity: 0.88 }} />
              </div>
            </div>

            {/* Textos do mobile, centralizados como no Figma */}
            <h1
              className="absolute left-[50.13cqw] top-[34.61cqw] w-[90cqw] -translate-x-1/2 text-center text-[18.83cqw] leading-normal text-[#f4f4f4]"
              style={{ fontFamily: fonteTitulo }}
            >
              Noxus
            </h1>
            <p
              className="absolute left-[52.04cqw] top-[62.85cqw] w-[95.93cqw] -translate-x-1/2 text-center text-[4.07cqw] leading-[1.015] tracking-[-0.2036cqw] text-[#f4f4f4]"
              style={{ fontFamily: fonteTitulo }}
            >
              Fear the silence. Embrace the darkness
            </p>
            <p
              className="absolute left-[52.04cqw] top-[75.95cqw] w-[89.82cqw] -translate-x-1/2 -translate-y-1/2 text-center text-[3.05cqw] italic font-medium leading-[1.22] tracking-[0.58cqw] text-[#f4f4f4]"
              style={{ fontFamily: fonteTexto }}
            >
              Envolto por uma fumaça negra viva e guiado por uma energia desconhecida, NOXIS caminha entre a luz e a escuridão.
            </p>
          </>
        )}
        </div>

        {/* Caveira descendo pela linha conforme a rolagem (canto superior direito) */}
        <div className="absolute right-10 top-16 md:right-16 md:top-20 h-[70vh] w-6 z-30 pointer-events-none max-md:hidden">
          <div
            ref={linhaRef}
            className="absolute left-1/2 top-0 w-0.5 -translate-x-1/2"
            style={{
              height: "0%",
              opacity: 0,
              backgroundImage: `url("${linhaCaveira}")`,
              backgroundSize: "100% 100%",
              backgroundRepeat: "no-repeat",
            }}
          />
          <img
            ref={caveiraRef}
            src={caveira}
            alt=""
            aria-hidden="true"
            className="absolute left-1/2 w-6 h-auto -translate-x-1/2"
            style={{ top: "0%" }}
          />
        </div>

        {/* Indicador de rolagem: mouse no canto inferior direito, some ao rolar */}
        <img
          src={mouseRolagem}
          alt="Role para baixo"
          className={`absolute bottom-10 right-10 md:right-16 w-12 h-12 z-30 pointer-events-none animate-bounce transition-opacity duration-500 ${
            rolou ? "opacity-0" : "opacity-100"
          }`}
        />
      </section>
    </div>
  );
}

export default Home;
