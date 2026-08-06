import { BookOpen, GraduationCap, Wrench } from "lucide-react";
import curso1 from "../assets/curso-1.jpg";
import curso2 from "../assets/curso-2.jpg";
import curso3 from "../assets/curso-3.jpg";
import curso4 from "../assets/curso-4.jpg";

/* Categorias de cursos usadas nos botões da seção (icone = componente Lucide) */
export const categorias = [
  { id: "Tecnicos", nome: "Técnicos", Icone: Wrench },
  { id: "Livres", nome: "Livres", Icone: BookOpen },
  { id: "Qualificacoes", nome: "Qualificações", Icone: GraduationCap },
];


/* Lista de cursos simulando um banco de dados local */
export const cursos = [
  {
    id: 1,
    categoria: "Tecnicos",
    nome: "Desenvolvimento de Sistemas",
    descricao: "Aprenda lógica de programação, banco de dados e criação de aplicações web.",
    imagem: curso1,
  },
  {
    id: 2,
    categoria: "Tecnicos",
    nome: "Administração",
    descricao: "Rotinas contábeis, tributos e análise de documentos financeiros.",
    imagem: curso2,
  },
  {
    id: 3,
    categoria: "Tecnicos",
    nome: "Design Gráfico",
    descricao: "Identidade visual, edição de imagens e criação de peças digitais.",
    imagem: curso3,
  },
  {
    id: 4,
    categoria: "Tecnicos",
    nome: "Administração",
    descricao: "Gestão de pessoas, processos e organização de rotinas empresariais.",
    imagem: curso4,
  },
  {
    id: 5,
    categoria: "Livres",
    nome: "Informática Básica",
    descricao: "Windows, internet, e-mail e pacote de escritório do zero.",
    imagem: curso4,
  },
  {
    id: 6,
    categoria: "Livres",
    nome: "Inglês Instrumental",
    descricao: "Vocabulário e leitura técnica para o mercado de trabalho.",
    imagem: curso3,
  },
  {
    id: 7,
    categoria: "Qualificacoes",
    nome: "Excel Avançado",
    descricao: "Fórmulas, tabelas dinâmicas e dashboards para relatórios.",
    imagem: curso2,
  },
  {
    id: 8,
    categoria: "Qualificacoes",
    nome: "Lógica de Programação",
    descricao: "Primeiros passos em algoritmos com exercícios práticos.",
    imagem: curso1,
  },
];
