import { useState } from "react";
import { andares, atracoesPorAndar } from "../../data/atracoes";
import "../../css/atracoes.css";

function Atracoes() {
  const [andarSelecionado, setAndarSelecionado] = useState("patio");
  const atracoes = atracoesPorAndar[andarSelecionado];

  return (
    <section className="secao secao-cinza" id="programacao">
      <div className="container">
        <h2 className="titulo-secao">Local de Atrações</h2>

        <div className="atracoes-cards">
          <div className="atracoes-card">
            <h3>Andares</h3>
            <div className="atracoes-botoes">
              {andares.map((andar) => (
                <button
                  key={andar.id}
                  className={
                    andar.id === andarSelecionado
                      ? "atracoes-botao atracoes-botao-ativo"
                      : "atracoes-botao"
                  }
                  onClick={() => setAndarSelecionado(andar.id)}
                >
                  {andar.nome}
                </button>
              ))}
            </div>
          </div>

          <div className="atracoes-card">
            <h3>Atrações</h3>
            <ul className="atracoes-lista">
              {atracoes.map((atracao) => (
                <li className="atracoes-item" key={atracao.horario + atracao.nome}>
                  <span className="atracoes-horario">{atracao.horario}</span>
                  <span>{atracao.nome}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Atracoes;
