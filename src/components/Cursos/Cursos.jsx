import { useState } from "react";
import { categorias, cursos } from "../../data/cursos";
import "../../css/cursos.css";

function Cursos() {
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("Tecnicos");
  const cursosFiltrados = cursos.filter((curso) => curso.categoria === categoriaSelecionada);

  return (
    <section className="secao" id="cursos">
      <div className="container">
        <h2 className="titulo-secao">Descubra nossos cursos!</h2>
        <p className="cursos-descricao">
          Conheça nossos cursos de qualificação, livres e técnicos e descubra novas possibilidades
          para o seu futuro profissional.
        </p>

        <div className="cursos-categorias">
          {categorias.map((categoria) => (
            <div className="cursos-categoria" key={categoria.id}>
              <span className="cursos-icone">{categoria.icone}</span>
              <button
                className={
                  categoria.id === categoriaSelecionada
                    ? "cursos-botao cursos-botao-ativo"
                    : "cursos-botao"
                }
                onClick={() => setCategoriaSelecionada(categoria.id)}
              >
                {categoria.nome}
              </button>
            </div>
          ))}
        </div>

        <div className="cursos-grade">
          {cursosFiltrados.map((curso) => (
            <article className="cursos-item" key={curso.id}>
              <img src={curso.imagem} alt={curso.nome} loading="lazy" />
              <div className="cursos-item-texto">
                <h3>{curso.nome}</h3>
                <p>{curso.descricao}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="cursos-acao">
          <button
            className="botao-azul"
            onClick={() =>
              document.getElementById("inscricao").scrollIntoView({ behavior: "smooth" })
            }
          >
            Quero saber mais!
          </button>
        </div>
      </div>
    </section>
  );
}

export default Cursos;
