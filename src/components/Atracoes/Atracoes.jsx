import { useState } from "react";
import { andares, atracoesPorAndar } from "../../data/atracoes";
import "./atracoes.css";

function Atracoes() {
  const [andarSelecionado, setAndarSelecionado] = useState("patio");
  const atracoes = atracoesPorAndar[andarSelecionado];
  const andarAtual = andares.find((andar) => andar.id === andarSelecionado);

  return (
    <section className="secao secao-cinza" id="programacao">
      <div className="container">
        <h2 className="titulo-secao">Local de Atrações</h2>

        <div className="atracoes-cards">
          <div className="atracoes-card">
            <h3>Andares</h3>
            <div className="atracoes-botoes">
              {andares.map((andar) => {
                const ativo = andar.id === andarSelecionado;
                const total = atracoesPorAndar[andar.id].length;

                return (
                  <button
                    key={andar.id}
                    className={ativo ? "atracoes-botao atracoes-botao-ativo" : "atracoes-botao"}
                    onClick={() => setAndarSelecionado(andar.id)}
                  >
                    <span className="atracoes-botao-nome">{andar.nome}</span>
                    <span className="atracoes-contagem">
                      {total} {total === 1 ? "evento" : "eventos"}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="atracoes-card">
            <h3>Atrações</h3>
            <p className="atracoes-subtitulo">
              {andarAtual.nome} · {atracoes.length} eventos
            </p>
            <ul className="atracoes-lista" key={andarSelecionado}>
              {atracoes.map((atracao) => (
                <li className="atracoes-item" key={atracao.horario + atracao.nome}>
                  <span className="atracoes-horario">{atracao.horario}</span>
                  <span className="atracoes-nome">{atracao.nome}</span>
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
