import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { assinarProgresso, heroPronta } from "./heroPronta";
import skull from "../assets/preloader/preloader-skull.svg";
import xm from "../assets/preloader/preloader-xm.svg";
import chamas from "../assets/preloader/preloader-chamas.png";

const fonteTitulo = "'Butcherman Caps', 'Butcherman', cursive";
const fonteCorpo = "'Inter', sans-serif";

// Estados do pré-loader no Figma (frames 50%, 80%, 85% e 100%), em px do frame de 1920px.
// Entre um estado e outro a logo e a barra são interpoladas conforme o carregamento avança.
type Ponto = { p: number; [chave: string]: number };

// Caixa da logo: x, y e largura (a altura segue a proporção da logo)
const LOGO: Ponto[] = [
  { p: 50, x: 642, y: 497, w: 739 },
  { p: 80, x: 178, y: 220, w: 628 },
  { p: 85, x: 161, y: 72, w: 373 },
  { p: 100, x: 50, y: 48, w: 153 },
];

// Trilho e preenchimento da barra
const BARRA: Ponto[] = [
  { p: 50, esquerda: 222, preenchido: 627 },
  { p: 80, esquerda: 243, preenchido: 899 },
  { p: 85, esquerda: 212, preenchido: 1080 },
  { p: 100, esquerda: 169, preenchido: 1249 },
];

const TRILHO_LARGURA = 1249;
const LOGO_REF_W = 628; // largura de referência das peças da logo
const LOGO_REF_H = 209;

// Peças da logo dentro da caixa (x, y, largura, altura na referência de 628x209)
const PECAS = {
  caveira: [221, 0, 189, 209],
  xm: [236, 107, 158, 53],
  chamasDireita: [322, 22, 306, 169],
  chamasEsquerda: [0, 18, 308, 172],
} as const;

const TRANSFORM_DIREITA = "scaleY(-1) rotate(-179.56deg)";
const TRANSFORM_ESQUERDA = "scaleY(-1) rotate(179deg)";

// Valor de cada chave entre os pontos vizinhos, conforme o progresso p
function interpola(pontos: Ponto[], p: number): Ponto {
  if (p <= pontos[0].p) return pontos[0];
  const ultimo = pontos[pontos.length - 1];
  if (p >= ultimo.p) return ultimo;
  const i = pontos.findIndex((q) => q.p >= p);
  const a = pontos[i - 1];
  const b = pontos[i];
  const t = (p - a.p) / (b.p - a.p);
  const saida: Ponto = { p };
  Object.keys(a).forEach((chave) => {
    if (chave !== "p") saida[chave] = a[chave] + (b[chave] - a[chave]) * t;
  });
  return saida;
}

// Pré-loader do Figma. Medidas em cqw (1% da largura do frame de 1920px).
// A logo começa grande no centro e vai diminuindo e subindo até o canto superior esquerdo.
// Só sai depois que a hero, as fontes, a página e as imagens do layout estiverem prontos.
function PreLoader() {
  const [pct, setPct] = useState(0);
  const [visual, setVisual] = useState(0);
  const [visivel, setVisivel] = useState(true);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const suavizado = useRef({ v: 0 });

  useEffect(() => {
    let ativo = true;
    let saida: gsap.core.Tween | undefined;
    let iniciou = false;
    let tweenPct: gsap.core.Tween | undefined;
    let queda: gsap.core.Tween | undefined;

    // A logo cai de cima, quica e fica parada no centro (celular e desktop)
    const celular = window.matchMedia("(max-width: 767px)").matches;
    if (logoRef.current) {
      queda = gsap.fromTo(
        logoRef.current,
        { y: -window.innerHeight },
        { y: 0, duration: 1.4, ease: "bounce.out" },
      );
    }

    // Estado de cada parte do carregamento
    const estado = {
      hero: 0,
      heroPronto: false,
      fontes: false,
      pagina: false,
      imagens: [] as HTMLImageElement[],
    };

    const imagensCarregadas = () => {
      const total = estado.imagens.length;
      return total === 0 ? 1 : estado.imagens.filter((img) => img.complete).length / total;
    };

    const layoutCompleto = () =>
      estado.fontes && estado.pagina && imagensCarregadas() === 1;

    const iniciarSaida = () => {
      // Logo já está no lugar; o pré-loader sai devagar: da esquerda para a direita no desktop,
      // de baixo para cima no celular (a logo, que é filha do pré-loader, sobe junto)
      saida = gsap.to(wrapperRef.current, {
        ...(celular ? { yPercent: -100 } : { xPercent: 100 }),
        duration: 2.2,
        ease: "power2.inOut",
        delay: 0.6,
        onComplete: () => setVisivel(false),
      });
    };

    const atualizar = () => {
      if (!ativo) return;
      const layout = ((estado.fontes ? 1 : 0) + (estado.pagina ? 1 : 0) + imagensCarregadas()) / 3;
      const pronto = estado.heroPronto && layoutCompleto();
      const valor = pronto ? 1 : 0.6 * estado.hero + 0.4 * layout;
      const alvo = Math.min(100, valor * 100);

      // Número e peças animam suavemente até o progresso novo
      tweenPct?.kill();
      tweenPct = gsap.to(suavizado.current, {
        v: alvo,
        duration: 0.5,
        ease: "power1.out",
        onUpdate: () => {
          setVisual(suavizado.current.v);
          setPct(Math.round(suavizado.current.v));
        },
      });

      if (pronto && !iniciou) {
        iniciou = true;
        iniciarSaida();
      }
    };

    const pararProgresso = assinarProgresso((valor) => {
      estado.hero = valor;
      atualizar();
    });

    heroPronta.then(() => {
      estado.heroPronto = true;
      atualizar();
    });

    document.fonts.ready.then(() => {
      estado.fontes = true;
      atualizar();
    });

    const paginaCarregada = () => {
      estado.pagina = true;
      atualizar();
    };
    if (document.readyState === "complete") paginaCarregada();
    else window.addEventListener("load", paginaCarregada, { once: true });

    // Imagens que já estão na página e as que ainda carregam
    estado.imagens = Array.from(document.images);
    estado.imagens.forEach((img) => {
      if (img.complete) return;
      img.addEventListener("load", atualizar, { once: true });
      img.addEventListener("error", atualizar, { once: true });
    });
    atualizar();

    return () => {
      ativo = false;
      pararProgresso();
      tweenPct?.kill();
      queda?.kill();
      window.removeEventListener("load", paginaCarregada);
      saida?.kill();
    };
  }, []);

  if (!visivel) return null;

  // A logo cai e fica parada no centro, sem se deslocar com o progresso
  const logo = LOGO[0];
  const barra = interpola(BARRA, visual);
  const alturaLogo = (logo.w * LOGO_REF_H) / LOGO_REF_W;
  const peca = (nome: keyof typeof PECAS) => {
    const [x, y, w, h] = PECAS[nome];
    return {
      left: `${(x / LOGO_REF_W) * 100}%`,
      top: `${(y / LOGO_REF_H) * 100}%`,
      width: `${(w / LOGO_REF_W) * 100}%`,
      height: `${(h / LOGO_REF_H) * 100}%`,
    } as const;
  };
  const preenchido = barra.preenchido;
  const esquerdaTrilho = barra.esquerda;

  return (
    <div
      ref={wrapperRef}
      role="status"
      aria-label={`Carregando ${pct}%`}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#780505]"
    >
      <style>{`
        @keyframes pre-listras { to { background-position: 48px 0; } }
        @keyframes pre-pulso { 0%, 100% { opacity: 0.55; } 50% { opacity: 1; } }
      `}</style>

      <div className="@container relative aspect-video" style={{ width: "min(100vw, 177.78dvh)" }}>
        {/* Logo: caixa que diminui e sobe conforme o carregamento */}
        <div
          ref={logoRef}
          className="absolute"
          style={{
            left: `${logo.x / 19.2}cqw`,
            top: `${logo.y / 19.2}cqw`,
            width: `${logo.w / 19.2}cqw`,
            height: `${alturaLogo / 19.2}cqw`,
          }}
        >
          <img src={skull} alt="" className="absolute" style={peca("caveira")} />
          <img src={xm} alt="" className="absolute" style={peca("xm")} />
          <img
            src={chamas}
            alt=""
            className="absolute object-cover"
            style={{ ...peca("chamasDireita"), transform: TRANSFORM_DIREITA }}
          />
          <img
            src={chamas}
            alt=""
            className="absolute object-cover"
            style={{ ...peca("chamasEsquerda"), transform: TRANSFORM_ESQUERDA }}
          />
        </div>

        {/* Rótulo do carregamento, acompanhando o trilho */}
        <p
          className="absolute text-[0.625cqw] font-semibold tracking-[0.3cqw] text-[#ffb3b3]"
          style={{
            left: `${esquerdaTrilho / 19.2}cqw`,
            top: "46.5cqw",
            fontFamily: fonteCorpo,
            animation: "pre-pulso 1.6s ease-in-out infinite",
          }}
        >
          CARREGANDO AS SOMBRAS
        </p>

        {/* Trilho */}
        <div
          className="absolute h-[1.458cqw] overflow-hidden rounded-full bg-[#d9d9d9] shadow-[inset_0_2px_6px_rgba(0,0,0,0.35)]"
          style={{
            left: `${esquerdaTrilho / 19.2}cqw`,
            top: "50.68cqw",
            width: `${TRILHO_LARGURA / 19.2}cqw`,
          }}
        />

        {/* Preenchimento: listras pretas em movimento e brilho na ponta */}
        <div
          className="absolute h-[1.354cqw] overflow-visible bg-black"
          style={{
            left: `${esquerdaTrilho / 19.2}cqw`,
            top: "50.78cqw",
            width: `${preenchido / 19.2}cqw`,
            backgroundImage: "repeating-linear-gradient(-45deg, #000 0 10px, #2a0a0a 10px 20px)",
            backgroundSize: "28px 28px",
            animation: "pre-listras 0.8s linear infinite",
            boxShadow: "0 0 1.2cqw rgba(255, 60, 60, 0.45)",
          }}
        >
          <span
            className="absolute right-0 top-1/2 h-[2.6cqw] w-[0.35cqw] -translate-y-1/2 bg-white"
            style={{ boxShadow: "0 0 1.4cqw 0.4cqw rgba(255, 255, 255, 0.85)" }}
          />
        </div>

        {/* Marcas a cada 10% */}
        {Array.from({ length: 11 }, (_, i) => (
          <span
            key={i}
            className="absolute top-[52.6cqw] h-[0.52cqw] w-px bg-[#d9d9d9]/70"
            style={{ left: `${esquerdaTrilho / 19.2 + i * (TRILHO_LARGURA / 19.2 / 10)}cqw` }}
          />
        ))}

        {/* Porcentagem */}
        <div className="absolute left-[87.27cqw] top-[48.96cqw] flex h-[3.165cqw] w-[6.1cqw] items-center justify-center">
          <p
            className="whitespace-nowrap text-[2.396cqw] leading-none text-white"
            style={{ fontFamily: fonteTitulo, textShadow: "0 0 1cqw rgba(255, 60, 60, 0.6)" }}
          >
            {pct}%
          </p>
        </div>
      </div>
    </div>
  );
}

export default PreLoader;
