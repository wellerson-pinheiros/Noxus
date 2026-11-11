import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Rolagem suave com Lenis, sincronizada com o ticker do GSAP para os ScrollTriggers
// (pins e scrubs da Hero e dos Capitulos) continuarem alinhados com a rolagem.
export function iniciarScrollSuave() {
  const lenis = new Lenis({
    lerp: 0.085, // quanto menor, mais suave e mais "pesada" a rolagem
    smoothWheel: true,
  });

  lenis.on("scroll", ScrollTrigger.update);

  const atualizar = (tempo: number) => lenis.raf(tempo * 1000);
  gsap.ticker.add(atualizar);
  gsap.ticker.lagSmoothing(0);

  return () => {
    gsap.ticker.remove(atualizar);
    lenis.destroy();
  };
}
