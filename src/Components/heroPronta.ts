// Resolve quando a seção fixada da hero já foi registrada no ScrollTrigger.
// Os capítulos esperam por isso, senão calculam as posições antes do espaçamento do pin
// e entram fixados por cima da hero.
let resolver!: () => void;
export const heroPronta = new Promise<void>((resolve) => {
  resolver = resolve;
});
export const marcarHeroPronta = () => resolver();

// Progresso do carregamento dos frames da hero (0 a 1), usado pelo pré-loader
let progresso = 0;
const ouvintes = new Set<(valor: number) => void>();
export const reportarProgresso = (valor: number) => {
  progresso = valor;
  ouvintes.forEach((ouvinte) => ouvinte(valor));
};
export const assinarProgresso = (ouvinte: (valor: number) => void) => {
  ouvintes.add(ouvinte);
  ouvinte(progresso);
  return () => {
    ouvintes.delete(ouvinte);
  };
};
