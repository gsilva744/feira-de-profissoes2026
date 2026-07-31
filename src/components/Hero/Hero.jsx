import "../../css/hero.css";

function Hero() {
  function irParaSecao(id) {
    const secao = document.getElementById(id);
    if (secao) {
      secao.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <section className="hero" id="inicio">
      <div className="container">
        <h1>
          Descubra sua profissão do futuro com a <span>6ª Edição da Feira de Profissões 2026!!!</span>
        </h1>
        <p>
          Uma experiência para você conhecer cursos, conversar com professores e alunos e escolher o
          caminho da sua carreira.
        </p>
        <div className="hero-botoes">
          <button className="botao-amarelo" onClick={() => irParaSecao("inscricao")}>
            Quero Participar
          </button>
          <button className="hero-botao-claro" onClick={() => irParaSecao("sobre")}>
            Saiba Mais
          </button>
        </div>
      </div>
    </section>
  );
}

export default Hero;
