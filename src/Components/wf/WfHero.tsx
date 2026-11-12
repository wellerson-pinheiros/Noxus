import heroImg from "../../assets/wf-hero/wf-01-hero.jpg";
import WfBotao from "./WfBotao";

const fonteTitulo = "'Butcherman Caps', 'Butcherman', cursive";
const fonteTexto = "'Bodoni Moda SC', serif";
const fonteCorpo = "'Inter', sans-serif";

// WF 01 — Hero. Medidas em cqw (1% da largura do frame de 1920px) para acompanhar o layout do Figma em qualquer tela
function WfHero() {
  return (
    <section id="wf-hero" className="@container relative w-full aspect-video overflow-hidden bg-[#f4f4f4]">
      <img src={heroImg} alt="" className="absolute inset-0 size-full object-cover" />

      {/* Escurecimento radial que sai do centro e escurece as bordas */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_52.7%_52.7%_at_49.1%_42.4%,rgba(0,0,0,0)_0%,#000_100%)]" />

      <p
        className="absolute left-[93.75cqw] top-[52.66cqw] whitespace-nowrap text-[0.625cqw] italic font-medium tracking-[0.125cqw] text-[#121c2e]"
        style={{ fontFamily: fonteTexto }}
      >
        ROLE
      </p>

      <div className="absolute left-[64.17cqw] top-[13.07cqw] flex w-[33.33cqw] flex-col gap-[1.667cqw]">
        <h1 className="text-[4.583cqw] leading-none uppercase text-[#db1f1f]" style={{ fontFamily: fonteTitulo }}>
          UM MUNDO FEITO DE SOMBRAS
        </h1>
        <p className="w-[29.17cqw] text-[1.25cqw] italic font-medium text-[#f4f4f4]" style={{ fontFamily: fonteTexto }}>
          Tema o silêncio. Abrace a escuridão.
        </p>
        <p className="w-[28.125cqw] text-[0.9375cqw] leading-[1.6] text-[#f4f4f4]" style={{ fontFamily: fonteCorpo }}>
          O MANIFESTO DAS TREVAS CHEGA AOS QUADRINHOS. Conheça a história de Noxus nas páginas deste mangá eletrizante.
          Trajado em ferro e trevas, ele cruza os reinos à margem da lei dos deuses e dos homens. Quando o mundo
          sucumbe à tirania, é preciso que alguém vista a armadura e se torne o próprio abismo. Uma narrativa repleta de
          combates viscerais, mistérios ancestrais e um protagonista que redefine o significado de sobrevivência.
        </p>
        <WfBotao label="SAIBA MAIS" />
      </div>
    </section>
  );
}

export default WfHero;
