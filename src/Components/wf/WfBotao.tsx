const fonteTexto = "'Inter', sans-serif";

type WfBotaoProps = {
  label: string;
  variante?: "contorno" | "primario";
};

// Botão do componente WF/Botão do Figma. Medidas em cqw (1% da largura do frame de 1920px)
function WfBotao({ label, variante = "contorno" }: WfBotaoProps) {
  const estilo =
    variante === "primario"
      ? "bg-[#db1f1f] text-white"
      : "border border-solid border-[#f4f4f4] text-[#f4f4f4]";

  return (
    <div
      className={`${estilo} flex items-center gap-[0.625cqw] self-start px-[1.667cqw] py-[0.833cqw] whitespace-nowrap`}
    >
      <span className="text-[0.729cqw] font-semibold tracking-[0.109cqw]" style={{ fontFamily: fonteTexto }}>
        {label}
      </span>
      <span className="text-[0.833cqw] font-medium" style={{ fontFamily: fonteTexto }}>
        →
      </span>
    </div>
  );
}

export default WfBotao;
