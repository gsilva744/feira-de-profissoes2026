import { useState } from "react";
import { Link } from "@tanstack/react-router";
import Modal from "../components/Modal/Modal";
import Formulario from "../components/Formulario/Formulario";
import QRCodeVisitante from "../components/QRCode/QRCodeVisitante";
import { useVisitantes } from "../utils/VisitantesContext";
import "../css/admin.css";

function Admin() {
  const { visitantes, adicionarVisitante, atualizarVisitante, removerVisitante } = useVisitantes();
  const [abaAtiva, setAbaAtiva] = useState("visitantes");
  const [visitanteQrCode, setVisitanteQrCode] = useState(null);
  const [visitanteDetalhe, setVisitanteDetalhe] = useState(null);
  const [visitanteEdicao, setVisitanteEdicao] = useState(null);

  function salvarEdicao(evento) {
    evento.preventDefault();
    atualizarVisitante(visitanteEdicao.id, visitanteEdicao);
    setVisitanteEdicao(null);
  }

  function alterarCampoEdicao(evento) {
    const { name, value } = evento.target;
    setVisitanteEdicao((anterior) => ({ ...anterior, [name]: value }));
  }

  return (
    <div>
      <header className="admin-topo">
        <div className="container admin-topo-conteudo">
          <strong>Instituto Social Nossa Senhora de Fátima</strong>
          <Link to="/" className="botao-amarelo">
            Voltar ao site
          </Link>
        </div>
      </header>

      <div className="container">
        <div className="admin-abas">
          <button
            className={abaAtiva === "visitantes" ? "admin-aba admin-aba-ativa" : "admin-aba"}
            onClick={() => setAbaAtiva("visitantes")}
          >
            Visitantes
          </button>
          <button
            className={abaAtiva === "credenciamento" ? "admin-aba admin-aba-ativa" : "admin-aba"}
            onClick={() => setAbaAtiva("credenciamento")}
          >
            Credenciamento
          </button>
        </div>

        {abaAtiva === "visitantes" && (
          <div className="admin-tabela-area">
            {visitantes.length === 0 ? (
              <p className="admin-vazio">Nenhum visitante cadastrado ainda.</p>
            ) : (
              <table className="admin-tabela">
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>E-mail</th>
                    <th>Telefone</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {visitantes.map((visitante) => (
                    <tr key={visitante.id}>
                      <td>{visitante.nome}</td>
                      <td>{visitante.email}</td>
                      <td>{visitante.telefone}</td>
                      <td>
                        <div className="admin-acoes">
                          <button
                            className="admin-acao"
                            onClick={() => setVisitanteDetalhe(visitante)}
                          >
                            Visualizar
                          </button>
                          <button
                            className="admin-acao"
                            onClick={() => setVisitanteEdicao(visitante)}
                          >
                            Editar
                          </button>
                          <button
                            className="admin-acao"
                            onClick={() => removerVisitante(visitante.id)}
                          >
                            Excluir
                          </button>
                          <button
                            className="admin-acao"
                            onClick={() => setVisitanteQrCode(visitante)}
                          >
                            QR Code
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {abaAtiva === "credenciamento" && (
          <div className="admin-credenciamento">
            <Formulario onCadastrar={adicionarVisitante} />
          </div>
        )}
      </div>

      {visitanteQrCode && (
        <Modal titulo="QR Code" onFechar={() => setVisitanteQrCode(null)}>
          <p style={{ textAlign: "center", fontSize: 13 }}>De {visitanteQrCode.nome}</p>
          <QRCodeVisitante codigo={visitanteQrCode.codigoQr} />
          <button
            className="botao-amarelo formulario-enviar"
            onClick={() => setVisitanteQrCode(null)}
          >
            Fechar
          </button>
        </Modal>
      )}

      {visitanteDetalhe && (
        <Modal titulo="Dados do visitante" onFechar={() => setVisitanteDetalhe(null)}>
          <div className="admin-detalhe">
            <p>
              <strong>Nome:</strong> {visitanteDetalhe.nome}
            </p>
            <p>
              <strong>E-mail:</strong> {visitanteDetalhe.email}
            </p>
            <p>
              <strong>Telefone:</strong> {visitanteDetalhe.telefone}
            </p>
            <p>
              <strong>Escola:</strong> {visitanteDetalhe.escola}
            </p>
            <p>
              <strong>Série:</strong> {visitanteDetalhe.serie}
            </p>
            <p>
              <strong>Curso:</strong> {visitanteDetalhe.cursoInteresse}
            </p>
          </div>
        </Modal>
      )}

      {visitanteEdicao && (
        <Modal titulo="Editar visitante" onFechar={() => setVisitanteEdicao(null)}>
          <form onSubmit={salvarEdicao}>
            <div className="formulario-campo">
              <label htmlFor="editar-nome">Nome</label>
              <input
                id="editar-nome"
                name="nome"
                value={visitanteEdicao.nome}
                onChange={alterarCampoEdicao}
              />
            </div>
            <div className="formulario-campo">
              <label htmlFor="editar-email">E-mail</label>
              <input
                id="editar-email"
                name="email"
                value={visitanteEdicao.email}
                onChange={alterarCampoEdicao}
              />
            </div>
            <div className="formulario-campo">
              <label htmlFor="editar-telefone">Telefone</label>
              <input
                id="editar-telefone"
                name="telefone"
                value={visitanteEdicao.telefone}
                onChange={alterarCampoEdicao}
              />
            </div>
            <button type="submit" className="botao-azul formulario-enviar">
              Salvar
            </button>
          </form>
        </Modal>
      )}
    </div>
  );
}

export default Admin;
