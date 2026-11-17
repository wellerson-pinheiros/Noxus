import fundo from "../../assets/footer/image-9.webp";
import marcador from "../../assets/footer/marcador.svg";
import logoWellvision from "../../assets/footer/logo-wellvision.png";
import instagram from "../../assets/footer/Instagram.svg";
import linkedin from "../../assets/footer/LinkedIn.svg";
import github from "../../assets/footer/GitHub.svg";
import tiktok from "../../assets/footer/TikTok.svg";

const fonteCorpo = "'Inter', sans-serif";
const fonteLogo = "'Alfa Slab One', serif";

// Medidas em cqw (1% da largura do frame de 1920px): no desktop tudo acompanha a tela.
// No mobile o footer é empilhado e usa px maiores para o texto ficar legível.
const CATEGORIAS = ["Web-Desing", "ARTE & ILUSTRAÇÃO", "Desenvolvimento de Softawes e responsabilidade"];
const LEGAIS = ["Termos de uso", "Política de privacidade", "Créditos"];

const LINKS = {
  instagram: "https://www.instagram.com/wellvisiontech/",
  linkedin: "https://www.linkedin.com/in/wellerson-pinheiros/",
  github: "https://github.com/wellerson-pinheiros",
};

// Cada ícone tem um retângulo de 96px dentro de uma arte de 120px, então a arte é deslocada
// para o retângulo cair exatamente na caixa de 96px. O TikTok tem o retângulo 4px mais abaixo.
const REDES = [
  { nome: "TikTok", icone: tiktok, deslocamentoY: -12, href: undefined },
  { nome: "LinkedIn", icone: linkedin, deslocamentoY: -8, href: LINKS.linkedin },
  { nome: "GitHub", icone: github, deslocamentoY: -8, href: LINKS.github },
  { nome: "Instagram", icone: instagram, deslocamentoY: -8, href: LINKS.instagram },
];

type RedeProps = (typeof REDES)[number];

// Mobile: caixa de 48px com arte de 60px (metade do desktop); desktop: medidas originais em cqw
function Rede({ nome, icone, deslocamentoY, href }: RedeProps) {
  const arte = (
    <img
      src={icone}
      alt=""
      aria-hidden="true"
      className="absolute left-[-6px] h-[60px] w-[60px] max-w-none md:left-[-0.625cqw] md:h-[6.25cqw] md:w-[6.25cqw]"
      style={{ top: `${deslocamentoY / 2}px` }}
    />
  );

  const caixa = "relative block size-[48px] md:size-[5cqw]";

  if (!href) {
    return (
      <span aria-label={`${nome} (em breve)`} className={caixa}>
        {arte}
      </span>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={nome}
      className={`${caixa} transition-opacity hover:opacity-70`}
    >
      {arte}
    </a>
  );
}

// WF 06 — Footer. Desktop: stage proporcional ao frame de 1920x1080
function WfFooter() {
  return (
    <footer className="@container relative w-full overflow-hidden bg-[#0b1220] text-[#f4f4f4] md:aspect-video">
      <img
        src={fundo}
        alt=""
        className="absolute inset-0 size-full object-cover opacity-[0.86] md:inset-auto md:left-[-0.677cqw] md:top-0 md:h-[56.35cqw] md:w-[100.885cqw] md:max-w-none"
      />

      {/* Frame 30 do Figma: sobreposição radial, transparente no centro e escura nas bordas */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_50%_50%,rgba(0,0,0,0)_0%,#000_100%)]" />

      {/* ===== Mobile: conteúdo empilhado ===== */}
      <div className="relative z-10 flex flex-col gap-[28px] px-[24px] pt-[48px] pb-[40px] md:hidden">
        <a
          href={LINKS.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-[12px]"
        >
          <span className="h-[44px] w-[72px] shrink-0 overflow-hidden rounded-[6px] border border-black">
            <img src={logoWellvision} alt="" className="size-full object-cover" />
          </span>
          <span className="text-[22px] text-[#f4f4f4]" style={{ fontFamily: fonteLogo }}>
            WellvisionTech
          </span>
        </a>

        <div className="flex flex-col gap-[14px]" style={{ fontFamily: fonteCorpo }}>
          {CATEGORIAS.map((texto) => (
            <div key={texto} className="flex items-center gap-[12px]">
              <img src={marcador} alt="" aria-hidden="true" className="size-[8px]" />
              <p className="text-[16px] font-medium tracking-[0.3px] text-[#f4f4f4]">{texto}</p>
            </div>
          ))}
        </div>

        <div className="h-px w-full bg-[#3a4a63]" />

        <div className="flex items-center gap-[20px]">
          {REDES.map((rede) => (
            <Rede key={rede.nome} {...rede} />
          ))}
        </div>

        <div className="flex flex-col gap-[12px]" style={{ fontFamily: fonteCorpo }}>
          {LEGAIS.map((texto) => (
            <p key={texto} className="text-[16px] text-[#f4f4f4]">
              {texto}
            </p>
          ))}
        </div>

        <p className="text-[14px] text-white" style={{ fontFamily: fonteCorpo }}>
          © 2026 NOXUS. Todos os direitos reservados.
        </p>
      </div>

      {/* ===== Desktop: layout original em cqw ===== */}
      <div className="hidden md:contents">
        {/* Logo WellvisionTech */}
        <a
          href={LINKS.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute left-[41.25cqw] top-[37.66cqw] h-[2.92cqw] w-[5.42cqw] overflow-hidden rounded-[0.417cqw] border border-black opacity-[0.93]"
        >
          <img src={logoWellvision} alt="" className="absolute inset-0 size-full object-cover" />
        </a>
        <a
          href={LINKS.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute left-[47.92cqw] top-[38.44cqw] whitespace-nowrap text-[1.0417cqw] text-[#f4f4f4]"
          style={{ fontFamily: fonteLogo }}
        >
          WellvisionTech
        </a>

        {/* Categorias */}
        <div className="absolute left-[23.18cqw] top-[17.97cqw] flex items-center gap-[4.17cqw]">
          {CATEGORIAS.map((texto) => (
            <div key={texto} className="flex items-center gap-[0.625cqw]">
              <img src={marcador} alt="" aria-hidden="true" className="size-[0.4167cqw]" />
              <p
                className="whitespace-nowrap text-[1.0417cqw] font-medium tracking-[0.052cqw] text-[#f4f4f4]"
                style={{ fontFamily: fonteCorpo }}
              >
                {texto}
              </p>
            </div>
          ))}
        </div>

        {/* Divisor */}
        <div className="absolute left-0 top-[21.15cqw] h-px w-full bg-[#3a4a63]" />

        {/* Redes sociais, alinhadas e do mesmo tamanho */}
        <div className="absolute left-[35cqw] top-[26.51cqw] flex items-center gap-[2.5cqw]">
          {REDES.map((rede) => (
            <Rede key={rede.nome} {...rede} />
          ))}
        </div>

        {/* Links legais */}
        <div className="absolute left-[35cqw] top-[43.54cqw] flex items-center gap-[1.667cqw]">
          {LEGAIS.map((texto, i) => (
            <span key={texto} className="flex items-center gap-[1.667cqw]">
              <p className="whitespace-nowrap text-[1.0417cqw] text-[#f4f4f4]" style={{ fontFamily: fonteCorpo }}>
                {texto}
              </p>
              {i < LEGAIS.length - 1 && (
                <span className="text-[1.0417cqw] text-[#7f90a8]" style={{ fontFamily: fonteCorpo }}>
                  |
                </span>
              )}
            </span>
          ))}
        </div>

        {/* Copyright */}
        <p
          className="absolute left-[38.59cqw] top-[47.14cqw] whitespace-nowrap text-[1.0417cqw] text-white"
          style={{ fontFamily: fonteCorpo }}
        >
          © 2026 NOXUS. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}

export default WfFooter;
