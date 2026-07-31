import { useState } from "react";
import { parceiros } from "../../data/parceiros";
import "../../css/parceiros.css";

const porPagina = 4;

function Parceiros() {
  const [pagina, setPagina] = useState(0);
  const totalPaginas = Math.ceil(parceiros.length / porPagina);
  const inicio = pagina * porPagina;
  const parceirosVisiveis = parceiros.slice(inicio, inicio + porPagina);

  function anterior() {
    setPagina((atual) => (atual === 0 ? totalPaginas - 1 : atual - 1));
  }

  function proximo() {
    setPagina((atual) => (atual === totalPaginas - 1 ? 0 : atual + 1));
  }

  return (
    <section className="secao secao-cinza">
      <div className="container">
        <h2 className="titulo-secao">Parceiros</h2>

        <div className="parceiros-grade">
          {parceirosVisiveis.map((parceiro) => (
            <div className="parceiros-item" key={parceiro.id}>
              <span className="parceiros-sigla">{parceiro.sigla}</span>
              <span className="parceiros-nome">{parceiro.nome}</span>
            </div>
          ))}
        </div>

        <div className="carrossel-controles">
          <button className="botao-azul" onClick={anterior}>
            Anterior
          </button>
          <button className="botao-azul" onClick={proximo}>
            Próximo
          </button>
        </div>
      </div>
    </section>
  );
}

export default Parceiros;
