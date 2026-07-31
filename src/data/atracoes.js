/* Programacao das atracoes por andar */
export const andares = [
  { id: "patio", nome: "Pátio" },
  { id: "andar1", nome: "1º Andar" },
  { id: "andar2", nome: "2º Andar" },
  { id: "andar3", nome: "3º Andar" },
];

export const atracoesPorAndar = {
  patio: [
    { horario: "09h00", nome: "Abertura oficial da feira" },
    { horario: "10h00", nome: "Food trucks e área de convivência" },
    { horario: "13h00", nome: "Apresentação da banda escolar" },
    { horario: "16h00", nome: "Sorteio de brindes" },
  ],
  andar1: [
    { horario: "09h30", nome: "Oficina de robótica" },
    { horario: "11h00", nome: "Mostra de projetos de informática" },
    { horario: "14h00", nome: "Games e realidade virtual" },
    { horario: "16h30", nome: "Bate-papo com egressos" },
  ],
  andar2: [
    { horario: "09h30", nome: "Simulação de escritório contábil" },
    { horario: "11h00", nome: "Oficina de finanças pessoais" },
    { horario: "14h00", nome: "Palestra: primeiro emprego" },
    { horario: "16h00", nome: "Dinâmica de entrevista" },
  ],
  andar3: [
    { horario: "10h00", nome: "Estúdio de design gráfico" },
    { horario: "11h30", nome: "Oficina de fotografia" },
    { horario: "14h30", nome: "Mostra de artes visuais" },
    { horario: "16h00", nome: "Encerramento com premiação" },
  ],
};
