import fundo from "../../assets/footer/image-9.webp";
import marcador from "../../assets/footer/marcador.svg";
import logoWellvision from "../../assets/footer/logo-wellvision.png";
import instagram from "../../assets/footer/Instagram.svg";
import linkedin from "../../assets/footer/LinkedIn.svg";
import github from "../../assets/footer/GitHub.svg";
import tiktok from "../../assets/footer/TikTok.svg";

const fonteCorpo = "'Inter', sans-serif";
const fonteLogo = "'Alfa Slab One', serif";

// Medidas em cqw (1% da largura do frame de 1920px): tudo, inclusive as letras, acompanha a tela
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

function Rede({ nome, icone, deslocamentoY, href }: RedeProps) {
  const arte = (
    <img
      src={icone}
      alt=""
      aria-hidden="true"
      className="absolute left-[-0.625cqw] h-[6.25cqw] w-[6.25cqw] max-w-none"
      style={{ top: `${deslocamentoY / 19.2}cqw` }}
    />
  );

  if (!href) {
    return (
      <span aria-label={`${nome} (em breve)`} className="relative block size-[5cqw]">
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
      className="relative block size-[5cqw] transition-opacity hover:opacity-70"
    >
      {arte}
    </a>
  );
}

// WF 06 — Footer. Stage proporcional ao frame de 1920x1080
function WfFooter() {
  return (
    <footer className="@container relative w-full aspect-video overflow-hidden bg-[#0b1220] text-[#f4f4f4]">
      <img
        src={fundo}
        alt=""
        className="absolute left-[-0.677cqw] top-0 h-[56.35cqw] w-[100.885cqw] max-w-none object-cover opacity-[0.86]"
      />

      {/* Frame 30 do Figma: sobreposição radial, transparente no centro e escura nas bordas */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_50%_50%,rgba(0,0,0,0)_0%,#000_100%)]" />

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
    </footer>
  );
}

export default WfFooter;
