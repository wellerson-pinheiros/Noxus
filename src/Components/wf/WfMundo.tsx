import mundoImg from "../../assets/wf-hero/wf-03-mundo.jpg";
import WfBotao from "./WfBotao";

const fonteTitulo = "'Butcherman Caps', 'Butcherman', cursive";
const fonteTexto = "'Bodoni Moda SC', serif";
const fonteCorpo = "'Inter', sans-serif";

// WF 03 — Mundo (Banner). Medidas em cqw (1% da largura do frame de 1920px)
function WfMundo() {
  return (
    <section className="@container relative w-full aspect-video overflow-hidden bg-[#0b1220]">
      <img src={mundoImg} alt="" className="absolute inset-0 size-full object-cover" />

      {/* Sobreposição radial do escuro, igual à da WF 01 */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_52.7%_52.7%_at_49.1%_42.4%,rgba(0,0,0,0)_0%,#000_100%)]" />

      {/* Transição do claro para o escuro só no final da seção, na mesma cor da próxima */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0)_70%,#000_100%)]" />

      <div className="absolute left-[6.25cqw] top-[16.667cqw] flex w-[37.5cqw] flex-col gap-[1.667cqw]">
        <span className="text-[0.677cqw] font-semibold tracking-[0.135cqw] text-[#db1f1f]" style={{ fontFamily: fonteCorpo }}>
          03 — EXPLORE
        </span>
        <h2 className="text-[4.583cqw] leading-none text-[#f4f4f4]" style={{ fontFamily: fonteTitulo }}>
          UM MUNDO VASTO E INEXPLORADO
        </h2>
        <p className="w-[27.08cqw] text-[0.9375cqw] leading-[1.6] text-[#9fb0c8]" style={{ fontFamily: fonteCorpo }}>
          Reinos destruídos, cidades esquecidas e uma terra moldada pela memória e pelo mistério. Texto de apoio curto.
        </p>
        <WfBotao label="EXPLORE O MUNDO" variante="primario" />
      </div>

      {/* Texto vertical na lateral direita */}
      <div className="absolute left-[93.54cqw] top-[17.708cqw] flex h-[16.875cqw] w-[1.25cqw] items-center justify-center">
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
