// Resolve quando a seção fixada da hero já foi registrada no ScrollTrigger.
// Os capítulos esperam por isso, senão calculam as posições antes do espaçamento do pin
// e entram fixados por cima da hero.
let resolver!: () => void;
export const heroPronta = new Promise<void>((resolve) => {
  resolver = resolve;
});
export const marcarHeroPronta = () => resolver();
