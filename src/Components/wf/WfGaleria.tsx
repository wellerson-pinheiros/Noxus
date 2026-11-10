import cidadeCaida from "../../assets/wf-galeria/wf-02-cidade-caida.jpg";
import placeholder1 from "../../assets/wf-galeria/wf-02-placeholder-1.png";
import placeholder2 from "../../assets/wf-galeria/wf-02-placeholder-2.png";

const fonteTitulo = "'Butcherman Caps', 'Butcherman', cursive";
const fonteCorpo = "'Inter', sans-serif";

type LegendaProps = {
  numero: string;
  titulo: string;
  className: string;
};

// Legenda de cada imagem: número, traço e título
function Legenda({ numero, titulo, className }: LegendaProps) {
  return (
    <div className={`absolute flex items-center gap-[0.833cqw] ${className}`}>
      <span className="text-[0.677cqw] font-semibold tracking-[0.068cqw] text-[#db1f1f]" style={{ fontFamily: fonteCorpo }}>
        {numero}
      </span>
      <div className="h-px w-[1.667cqw] bg-[#9fb0c8]" />
      <span className="text-[0.677cqw] font-medium tracking-[0.1016cqw] text-[#f4f4f4]" style={{ fontFamily: fonteCorpo }}>
        {titulo}
      </span>
    </div>
  );
}

// WF 02 — Galeria em Destaque. Medidas em cqw (1% da largura do frame de 1920px)
function WfGaleria() {
  return (
    <section className="@container relative w-full aspect-[1920/912] overflow-hidden bg-[#121c2e]">
      {/* Gradiente que escurece em direção à base */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0)_0%,#000_114.25%)]" />

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

      {/* Imagem 1 */}
      <img
        src={cidadeCaida}
        alt="A cidade caída"
        className="absolute left-[3.333cqw] top-[16.667cqw] h-[16.25cqw] w-[29.167cqw] object-cover"
      />
      <Legenda numero="01" titulo="A CIDADE CAÍDA" className="left-[3.333cqw] top-[34.27cqw]" />

      {/* Imagem 2 */}
      <img
        src={placeholder1}
        alt="A torre silenciosa"
        className="absolute left-[35.417cqw] top-[16.667cqw] h-[16.25cqw] w-[29.167cqw] object-cover"
      />
      <Legenda numero="02" titulo="A TORRE SILENCIOSA" className="left-[35.417cqw] top-[33.854cqw]" />

      {/* Coluna da direita: imagem 3 (recortada pela coluna, como no Figma) */}
      <div className="absolute left-[66.3cqw] top-[16.146cqw] h-[16.77cqw] w-[26.19cqw] overflow-hidden">
        <img
          src={placeholder2}
          alt="Fragmentos"
          className="absolute left-0 top-[-0.833cqw] h-[18.4375cqw] w-[38.385cqw] max-w-none object-cover"
        />
      </div>
      <Legenda numero="03" titulo="FRAGMENTOS" className="left-[67.03cqw] top-[33.906cqw]" />

      {/* Linha de progresso e navegação */}
      <div className="absolute left-[3.333cqw] top-[39.43cqw] h-px w-[93.33cqw] bg-[#3a4a63]" />
      <div className="absolute left-[3.333cqw] top-[39.479cqw] h-[0.104cqw] w-[31.25cqw] bg-[#db1f1f]" />
      <span
        className="absolute left-[3.333cqw] top-[42.448cqw] text-[0.677cqw] font-medium tracking-[0.1016cqw] text-[#9fb0c8]"
        style={{ fontFamily: fonteCorpo }}
      >
        ←&nbsp;&nbsp;ANTERIOR
      </span>
      <span
        className="absolute left-[91.2cqw] top-[41.771cqw] text-[0.677cqw] font-medium tracking-[0.1016cqw] text-[#9fb0c8]"
        style={{ fontFamily: fonteCorpo }}
      >
        PRÓXIMO&nbsp;&nbsp;→
      </span>
    </section>
  );
}

export default WfGaleria;
