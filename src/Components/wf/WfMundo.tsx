import mundoImg from "../../assets/wf-hero/wf-03-mundo.jpg";
import WfBotao from "./WfBotao";

const fonteTitulo = "'Butcherman Caps', 'Butcherman', cursive";
const fonteTexto = "'Bodoni Moda SC', serif";
const fonteCorpo = "'Inter', sans-serif";

// WF 03 — Mundo (Banner). Desktop em cqw (1% da largura do frame de 1920px); mobile em px maiores para ler bem
function WfMundo() {
  return (
    <section className="@container relative w-full overflow-hidden bg-[#0b1220] md:aspect-video">
      <img src={mundoImg} alt="" className="absolute inset-0 size-full object-cover" />

      {/* Sobreposição radial do escuro, igual à da WF 01 */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_52.7%_52.7%_at_49.1%_42.4%,rgba(0,0,0,0)_0%,#000_100%)]" />

      {/* Transição do claro para o escuro só no final da seção, na mesma cor da próxima */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0)_70%,#000_100%)]" />

      <div className="relative z-10 flex flex-col gap-[20px] px-[24px] pt-[96px] pb-[120px] md:absolute md:left-[6.25cqw] md:top-[16.667cqw] md:w-[37.5cqw] md:gap-[1.667cqw] md:p-0">
        <span
          className="text-[14px] font-semibold tracking-[2px] text-[#db1f1f] md:text-[0.677cqw] md:tracking-[0.135cqw]"
          style={{ fontFamily: fonteCorpo }}
        >
          03 — EXPLORE
        </span>
        <h2
          className="text-[44px] leading-[1.05] text-[#f4f4f4] md:text-[4.583cqw] md:leading-none"
          style={{ fontFamily: fonteTitulo }}
        >
          UM MUNDO VASTO E INEXPLORADO
        </h2>
        <p
          className="text-[17px] leading-[1.6] text-[#9fb0c8] md:w-[27.08cqw] md:text-[0.9375cqw]"
          style={{ fontFamily: fonteCorpo }}
        >
          Reinos destruídos, cidades esquecidas e uma terra moldada pela memória e pelo mistério. Texto de apoio curto.
        </p>
        <WfBotao label="EXPLORE O MUNDO" variante="primario" />
      </div>

      {/* Texto vertical na lateral direita (só desktop) */}
      <div className="absolute left-[93.54cqw] top-[17.708cqw] hidden h-[16.875cqw] w-[1.25cqw] items-center justify-center md:flex">
        <p
          className="-rotate-90 whitespace-nowrap text-[0.833cqw] italic font-medium tracking-[0.167cqw] text-[#f4f4f4]"
          style={{ fontFamily: fonteTexto }}
        >
          SOMBRAS QUE NUNCA DORMEM
        </p>
      </div>
    </section>
  );
}

export default WfMundo;
