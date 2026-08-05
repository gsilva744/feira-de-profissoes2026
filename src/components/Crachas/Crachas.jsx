import { useState } from "react";
import QRCodeVisitante from "../QRCode/QRCodeVisitante";
import { useVisitantes } from "../../utils/VisitantesContext";
import "../../css/crachas.css";

/* Aba de impressao: gera crachas com o QR Code de cada visitante */
function Crachas() {
  const { visitantes } = useVisitantes();
  const [selecionados, setSelecionados] = useState([]);

  const listaParaImprimir =
    selecionados.length === 0
      ? visitantes
      : visitantes.filter((visitante) => selecionados.includes(visitante.id));

  function alternarSelecao(id) {
    setSelecionados((lista) =>
      lista.includes(id) ? lista.filter((item) => item !== id) : [...lista, id],
    );
  }

  return (
    <div className="crachas">
      <div className="crachas-barra">
        <p className="crachas-legenda">
          {selecionados.length === 0
            ? "Todos os visitantes serão impressos."
            : `${selecionados.length} visitante(s) selecionado(s).`}
        </p>
        <div className="crachas-barra-botoes">
          <button className="admin-acao" onClick={() => setSelecionados([])}>
            Limpar seleção
          </button>
          <button
            className="botao-azul"
            onClick={() => window.print()}
            disabled={listaParaImprimir.length === 0}
          >
            Imprimir crachás
          </button>
        </div>
      </div>

      {visitantes.length === 0 ? (
        <p className="admin-vazio">Cadastre visitantes para gerar crachás.</p>
      ) : (
        <>
          <div className="crachas-selecao">
            {visitantes.map((visitante) => (
              <label key={visitante.id} className="crachas-checkbox">
                <input
                  type="checkbox"
                  checked={selecionados.includes(visitante.id)}
                  onChange={() => alternarSelecao(visitante.id)}
                />
                {visitante.nome}
              </label>
            ))}
          </div>

          <div className="crachas-grade" id="area-impressao">
            {listaParaImprimir.map((visitante) => (
              <div key={visitante.id} className="cracha">
                <div className="cracha-topo">
                  <strong>Feira de Profissões 2026</strong>
                  <span>Instituto Social Nossa Senhora de Fátima</span>
                </div>
                <QRCodeVisitante codigo={visitante.codigoQr} tamanho={120} />
                <p className="cracha-nome">{visitante.nome}</p>
                <p className="cracha-linha">{visitante.escola || "Escola não informada"}</p>
                <p className="cracha-linha">{visitante.cursoInteresse || "Curso não informado"}</p>
                <p className="cracha-codigo">{visitante.codigoQr}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Crachas;
