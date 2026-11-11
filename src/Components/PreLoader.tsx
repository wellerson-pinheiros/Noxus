import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { assinarProgresso, heroPronta } from "./heroPronta";
import skull from "../assets/preloader/preloader-skull.svg";
import xm from "../assets/preloader/preloader-xm.svg";
import chamas from "../assets/preloader/preloader-chamas.png";

const fonteTitulo = "'Butcherman Caps', 'Butcherman', cursive";
const fonteCorpo = "'Inter', sans-serif";

// Marcas do trilho a cada 10%
const MARCAS = Array.from({ length: 11 }, (_, i) => i);

// Pré-loader do Figma (frame "Pre loader"). Medidas em cqw (1% da largura do frame de 1920px).
// A logo começa no centro e vai para o lugar dela quando tudo carregar.
// Só sai depois que a hero, as fontes, a página e as imagens do layout estiverem prontos.
function PreLoader() {
  const [pct, setPct] = useState(0);
  const [visivel, setVisivel] = useState(true);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ativo = true;
    let saida: gsap.core.Timeline | undefined;
    let iniciou = false;

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
      // Logo vai para o lugar do Figma, depois o pré-loader sai da esquerda para a direita, devagar
      saida = gsap
        .timeline({ onComplete: () => setVisivel(false) })
        .to(logoRef.current, { xPercent: 0, yPercent: 0, scale: 1, duration: 1.4, ease: "power3.inOut" }, 0.2)
        .to(wrapperRef.current, { xPercent: 100, duration: 2.2, ease: "power2.inOut" }, "+=0.6");
    };

    const atualizar = () => {
      if (!ativo) return;
      const layout = ((estado.fontes ? 1 : 0) + (estado.pagina ? 1 : 0) + imagensCarregadas()) / 3;
      const pronto = estado.heroPronto && layoutCompleto();
      const valor = pronto ? 1 : 0.6 * estado.hero + 0.4 * layout;
      setPct(Math.min(100, Math.round(valor * 100)));

      if (pronto && !iniciou) {
        iniciou = true;
        setPct(100);
        iniciarSaida();
      }
    };

    // Posição de partida: logo no centro da tela, um pouco maior
    gsap.set(logoRef.current, { xPercent: 74.5, yPercent: 103, scale: 1.25 });

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
      window.removeEventListener("load", paginaCarregada);
      saida?.kill();
    };
  }, []);

  if (!visivel) return null;

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

      <div className="@container relative aspect-video" style={{ width: "min(100vw, 177.78vh)" }}>
        {/* Logo: grupo com as mesmas posições do Figma, em relação ao canto da logo (178px, 220px) */}
        <div ref={logoRef} className="absolute left-[9.27cqw] top-[11.46cqw] h-[10.89cqw] w-[32.71cqw]">
          <img src={skull} alt="" className="absolute left-[11.51cqw] top-0 h-[10.89cqw] w-[9.84cqw]" />
          <img src={xm} alt="" className="absolute left-[12.29cqw] top-[5.57cqw] h-[2.76cqw] w-[8.23cqw]" />

          {/* Chamas: duas metades espelhadas e rotacionadas, como no Figma */}
          <div
            className="absolute flex items-center justify-center"
            style={{ left: "16.77cqw", top: "1.15cqw", width: "15.94cqw", height: "8.79cqw" }}
          >
            <div className="relative h-[8.67cqw] w-[15.88cqw] flex-none" style={{ transform: "scaleY(-1) rotate(-179.56deg)" }}>
              <img src={chamas} alt="" className="absolute inset-0 size-full object-cover" />
            </div>
          </div>
          <div
            className="absolute flex items-center justify-center"
            style={{ left: "0cqw", top: "0.93cqw", width: "16.03cqw", height: "8.94cqw" }}
          >
            <div className="relative h-[8.67cqw] w-[15.88cqw] flex-none" style={{ transform: "scaleY(-1) rotate(179deg)" }}>
              <img src={chamas} alt="" className="absolute inset-0 size-full object-cover" />
            </div>
          </div>
        </div>

        {/* Rótulo do carregamento */}
        <p
          className="absolute left-[12.66cqw] top-[46.5cqw] text-[0.625cqw] font-semibold tracking-[0.3cqw] text-[#ffb3b3]"
          style={{ fontFamily: fonteCorpo, animation: "pre-pulso 1.6s ease-in-out infinite" }}
        >
          CARREGANDO AS SOMBRAS
        </p>

        {/* Trilho com listras animadas */}
        <div className="absolute left-[12.66cqw] top-[50.68cqw] h-[1.458cqw] w-[65.05cqw] overflow-hidden rounded-full bg-[#d9d9d9] shadow-[inset_0_2px_6px_rgba(0,0,0,0.35)]" />

        {/* Preenchimento: listras pretas em movimento e brilho na ponta */}
        <div
          className="absolute left-[13.85cqw] top-[50.78cqw] h-[1.354cqw] overflow-visible bg-black"
          style={{
            width: `${pct * 0.6266}cqw`,
            backgroundImage: "repeating-linear-gradient(-45deg, #000 0 10px, #2a0a0a 10px 20px)",
            backgroundSize: "28px 28px",
            animation: "pre-listras 0.8s linear infinite",
            boxShadow: "0 0 1.2cqw rgba(255, 60, 60, 0.45)",
            transition: "width 0.4s ease-out",
          }}
        >
          <span
            className="absolute right-0 top-1/2 h-[2.6cqw] w-[0.35cqw] -translate-y-1/2 bg-white"
            style={{ boxShadow: "0 0 1.4cqw 0.4cqw rgba(255, 255, 255, 0.85)" }}
          />
        </div>

        {/* Marcas a cada 10% */}
        {MARCAS.map((i) => (
          <span
            key={i}
            className="absolute top-[52.6cqw] h-[0.52cqw] w-px bg-[#d9d9d9]/70"
            style={{ left: `calc(12.66cqw + ${i * 6.505}cqw)` }}
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
