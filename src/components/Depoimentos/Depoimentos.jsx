import { useState } from "react";
import { depoimentos } from "../../data/depoimentos";
import "../../css/depoimentos.css";

function Depoimentos() {
  const [indice, setIndice] = useState(0);
  const depoimento = depoimentos[indice];

  function anterior() {
    setIndice((atual) => (atual === 0 ? depoimentos.length - 1 : atual - 1));
  }

  function proximo() {
    setIndice((atual) => (atual === depoimentos.length - 1 ? 0 : atual + 1));
  }

  return (
    <section className="secao">
      <div className="container">
        <h2 className="titulo-secao">Depoimentos</h2>

        <div className="depoimentos-card" key={depoimento.id}>
          <img className="depoimentos-foto" src={depoimento.foto} alt={depoimento.nome} loading="lazy" />
          <div>
            <p className="depoimentos-texto">{depoimento.texto}</p>
            <p className="depoimentos-nome">{depoimento.nome}</p>
            <p className="depoimentos-cargo">{depoimento.cargo}</p>
          </div>
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

export default Depoimentos;
