import logoFeira from "../../assets/logoFeira.png.asset.json";
import "../../css/hero.css";

function Hero() {
  function irParaSecao(id) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <section className="hero" id="inicio">
      <div className="container hero-conteudo">
        <div className="hero-texto">
          <span className="hero-selo">19 de setembro de 2026 · 09h às 18h</span>
          <h1>
            Descubra sua profissão do futuro na <span>6ª Feira das Profissões</span>
          </h1>
          <p>
            Um dia inteiro para conhecer os cursos do Instituto, conversar com professores e alunos e
            dar o primeiro passo para a sua carreira.
          </p>
          <div className="hero-botoes">
            <button className="botao-amarelo" onClick={() => irParaSecao("inscricao")}>
              Quero participar
            </button>
            <button className="hero-botao-claro" onClick={() => irParaSecao("sobre")}>
              Saiba mais
            </button>
          </div>
        </div>

        <img
          className="hero-logo"
          src={logoFeira.url}
          alt="Selo da 6ª Feira das Profissões: o primeiro passo para seu futuro profissional"
        />
      </div>
    </section>
  );
}

export default Hero;
