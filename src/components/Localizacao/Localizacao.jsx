import "../../css/localizacao.css";

function Localizacao() {
  return (
    <section className="secao" id="local">
      <div className="container">
        <div className="localizacao-card">
          <iframe
            className="localizacao-mapa"
            title="Mapa do instituto"
            src="https://www.openstreetmap.org/export/embed.html?bbox=-46.72%2C-23.68%2C-46.68%2C-23.65&amp;layer=mapnik"
          />
          <div className="localizacao-info">
            <h3>Localização do Instituto</h3>
            <h4>Endereço</h4>
            <p>Av. Coronel Octaviano de Freitas Costa, 463 - Socorro, São Paulo - SP, 04773-000</p>
            <h4>Ponto de Referência</h4>
            <p>Próximo à estação Socorro da CPTM.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Localizacao;
