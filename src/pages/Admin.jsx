import { useState } from "react";
import { Link } from "@tanstack/react-router";
import Modal from "../components/Modal/Modal";
import Formulario from "../components/Formulario/Formulario";
import QRCodeVisitante from "../components/QRCode/QRCodeVisitante";
import LeitorQr from "../components/LeitorQr/LeitorQr";
import Crachas from "../components/Crachas/Crachas";
import Dashboard from "../components/Dashboard/Dashboard";

import { useVisitantes } from "../utils/VisitantesContext";
import { cursos } from "../data/cursos";
import "../css/formulario.css";
import "../css/admin.css";


function Admin() {
  const { visitantes, adicionarVisitante, atualizarVisitante, removerVisitante } = useVisitantes();
  const [abaAtiva, setAbaAtiva] = useState("dashboard");
  const [busca, setBusca] = useState("");
  const [visitanteQrCode, setVisitanteQrCode] = useState(null);
  const [visitanteDetalhe, setVisitanteDetalhe] = useState(null);
  const [visitanteEdicao, setVisitanteEdicao] = useState(null);
  const [visitanteExclusao, setVisitanteExclusao] = useState(null);

  const textoBusca = busca.trim().toLowerCase();
  const visitantesFiltrados = visitantes.filter((visitante) =>
    [visitante.nome, visitante.email, visitante.telefone]
      .join(" ")
      .toLowerCase()
      .includes(textoBusca),
  );

  const totalEscolas = new Set(visitantes.map((visitante) => visitante.escola)).size;
  const totalCursos = new Set(visitantes.map((visitante) => visitante.cursoInteresse)).size;

  function salvarEdicao(evento) {
    evento.preventDefault();
    atualizarVisitante(visitanteEdicao.id, visitanteEdicao);
    setVisitanteEdicao(null);
  }

  function alterarCampoEdicao(evento) {
    const { name, value } = evento.target;
    setVisitanteEdicao((anterior) => ({ ...anterior, [name]: value }));
  }

  function confirmarExclusao() {
    removerVisitante(visitanteExclusao.id);
    setVisitanteExclusao(null);
  }

  return (
    <div className="admin-pagina">
      <header className="admin-topo">
        <div className="container admin-topo-conteudo">
          <div>
            <strong>Instituto Social Nossa Senhora de Fátima</strong>
            <span className="admin-topo-legenda">Painel administrativo · Feira 2026</span>
          </div>
          <Link to="/" className="botao-amarelo">
            Voltar ao site
          </Link>
        </div>
      </header>

      <div className="container">
        <div className="admin-resumo">
          <div className="admin-resumo-card">
            <span className="admin-resumo-numero">{visitantes.length}</span>
            <span className="admin-resumo-rotulo">Visitantes inscritos</span>
          </div>
          <div className="admin-resumo-card">
            <span className="admin-resumo-numero">{totalEscolas}</span>
            <span className="admin-resumo-rotulo">Escolas participantes</span>
          </div>
          <div className="admin-resumo-card">
            <span className="admin-resumo-numero">{totalCursos}</span>
            <span className="admin-resumo-rotulo">Cursos procurados</span>
          </div>
        </div>

        <div className="admin-abas">
          <button
            className={abaAtiva === "dashboard" ? "admin-aba admin-aba-ativa" : "admin-aba"}
            onClick={() => setAbaAtiva("dashboard")}
          >
            Dashboard
          </button>
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
          <button
            className={abaAtiva === "leitor" ? "admin-aba admin-aba-ativa" : "admin-aba"}
            onClick={() => setAbaAtiva("leitor")}
          >
            Leitor QR
          </button>
          <button
            className={abaAtiva === "impressao" ? "admin-aba admin-aba-ativa" : "admin-aba"}
            onClick={() => setAbaAtiva("impressao")}
          >
            Impressão
          </button>

        </div>

        {abaAtiva === "dashboard" && (
          <div className="admin-painel">
            <div className="admin-painel-topo">
              <h2>Visão geral das inscrições</h2>
            </div>
            <Dashboard />
          </div>
        )}

        {abaAtiva === "visitantes" && (

          <div className="admin-painel">
            <div className="admin-painel-topo">
              <h2>Lista de visitantes</h2>
              <input
                className="admin-busca"
                placeholder="Buscar por nome, e-mail ou telefone"
                value={busca}
                onChange={(evento) => setBusca(evento.target.value)}
              />
            </div>

            <div className="admin-tabela-area">
              {visitantesFiltrados.length === 0 ? (
                <p className="admin-vazio">
                  {visitantes.length === 0
                    ? "Nenhum visitante cadastrado ainda. Use a aba Credenciamento."
                    : "Nenhum visitante encontrado para essa busca."}
                </p>
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
                    {visitantesFiltrados.map((visitante) => (
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
                              className="admin-acao admin-acao-excluir"
                              onClick={() => setVisitanteExclusao(visitante)}
                            >
                              Excluir
                            </button>
                            <button
                              className="admin-acao admin-acao-qr"
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
          </div>
        )}

        {abaAtiva === "credenciamento" && (
          <div className="admin-painel">
            <div className="admin-painel-topo">
              <h2>Credenciamento no local</h2>
            </div>
            <div className="admin-credenciamento">
              <Formulario onCadastrar={adicionarVisitante} />
            </div>
          </div>
        )}

        {abaAtiva === "leitor" && (
          <div className="admin-painel">
            <div className="admin-painel-topo">
              <h2>Leitor de QR Code</h2>
            </div>
            <LeitorQr />
          </div>
        )}

        {abaAtiva === "impressao" && (
          <div className="admin-painel">
            <div className="admin-painel-topo">
              <h2>Impressão de crachás</h2>
            </div>
            <Crachas />
          </div>
        )}

      </div>

      {visitanteQrCode && (
        <Modal titulo="QR Code" onFechar={() => setVisitanteQrCode(null)}>
          <p className="admin-modal-legenda">De {visitanteQrCode.nome}</p>
          <QRCodeVisitante codigo={visitanteQrCode.codigoQr} />
          <p className="admin-modal-codigo">{visitanteQrCode.codigoQr}</p>
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
            <p>
              <strong>Gênero:</strong> {visitanteDetalhe.genero || "Não informado"}
            </p>
            <p>
              <strong>Já estudou:</strong> {visitanteDetalhe.jaEstudou || "Não"}
            </p>
            <p>
              <strong>Código:</strong> {visitanteDetalhe.codigoQr}
            </p>

          </div>
        </Modal>
      )}

      {visitanteEdicao && (
        <Modal titulo="Editar visitante" onFechar={() => setVisitanteEdicao(null)}>
          <form onSubmit={salvarEdicao} className="admin-formulario">
            <div className="formulario-campo">
              <label htmlFor="editar-nome">Nome</label>
              <input
                id="editar-nome"
                name="nome"
                value={visitanteEdicao.nome}
                onChange={alterarCampoEdicao}
                required
              />
            </div>
            <div className="formulario-campo">
              <label htmlFor="editar-email">E-mail</label>
              <input
                id="editar-email"
                name="email"
                type="email"
                value={visitanteEdicao.email}
                onChange={alterarCampoEdicao}
                required
              />
            </div>
            <div className="formulario-campo">
              <label htmlFor="editar-telefone">Telefone</label>
              <input
                id="editar-telefone"
                name="telefone"
                value={visitanteEdicao.telefone}
                onChange={alterarCampoEdicao}
                required
              />
            </div>
            <div className="formulario-campo">
              <label htmlFor="editar-escola">Escola</label>
              <input
                id="editar-escola"
                name="escola"
                value={visitanteEdicao.escola}
                onChange={alterarCampoEdicao}
              />
            </div>
            <div className="formulario-campo">
              <label htmlFor="editar-serie">Série</label>
              <input
                id="editar-serie"
                name="serie"
                value={visitanteEdicao.serie}
                onChange={alterarCampoEdicao}
              />
            </div>
            <div className="formulario-campo">
              <label htmlFor="editar-curso">Curso de Interesse</label>
              <select
                id="editar-curso"
                name="cursoInteresse"
                value={visitanteEdicao.cursoInteresse}
                onChange={alterarCampoEdicao}
              >
                <option value="">Selecione um curso</option>
                {cursos.map((curso) => (
                  <option key={curso.id} value={curso.nome}>
                    {curso.nome}
                  </option>
                ))}
              </select>
            </div>
            <div className="formulario-campo">
              <label htmlFor="editar-genero">Gênero</label>
              <select
                id="editar-genero"
                name="genero"
                value={visitanteEdicao.genero || ""}
                onChange={alterarCampoEdicao}
              >
                <option value="">Selecione</option>
                <option value="Masculino">Masculino</option>
                <option value="Feminino">Feminino</option>
                <option value="Outro">Prefiro não informar</option>
              </select>
            </div>
            <div className="formulario-campo">
              <label htmlFor="editar-jaestudou">Já estudou no Instituto?</label>
              <select
                id="editar-jaestudou"
                name="jaEstudou"
                value={visitanteEdicao.jaEstudou || "Não"}
                onChange={alterarCampoEdicao}
              >
                <option value="Não">Não</option>
                <option value="Sim">Sim</option>
              </select>
            </div>
            <button type="submit" className="botao-azul formulario-enviar">

              Salvar alterações
            </button>
          </form>
        </Modal>
      )}

      {visitanteExclusao && (
        <Modal titulo="Excluir visitante" onFechar={() => setVisitanteExclusao(null)}>
          <p className="admin-modal-legenda">
            Deseja realmente excluir <strong>{visitanteExclusao.nome}</strong>?
          </p>
          <div className="admin-modal-botoes">
            <button className="botao-azul" onClick={() => setVisitanteExclusao(null)}>
              Cancelar
            </button>
            <button className="admin-botao-excluir" onClick={confirmarExclusao}>
              Excluir
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default Admin;
