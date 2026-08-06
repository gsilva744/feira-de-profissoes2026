import { useState } from "react";
import { cursos } from "../../data/cursos";
import QRCodeVisitante from "../QRCode/QRCodeVisitante";
import "../../css/formulario.css";

const camposVazios = {
  nome: "",
  telefone: "",
  email: "",
  escola: "",
  serie: "",
  cursoInteresse: "",
  genero: "",
  jaEstudou: "Não",
};


function Formulario({ onCadastrar, mostrarQrCode = true }) {
  const [campos, setCampos] = useState(camposVazios);
  const [visitanteCadastrado, setVisitanteCadastrado] = useState(null);

  function alterarCampo(evento) {
    const { name, value } = evento.target;
    setCampos((anterior) => ({ ...anterior, [name]: value }));
  }

  function enviarFormulario(evento) {
    evento.preventDefault();
    const novoVisitante = onCadastrar(campos);
    setVisitanteCadastrado(novoVisitante);
    setCampos(camposVazios);
  }

  return (
    <form className="formulario-card" onSubmit={enviarFormulario}>
      <h3>Formulário de Inscrição</h3>
      <p>Preencha seus dados para participar</p>

      <div className="formulario-campo">
        <label htmlFor="nome">Nome Completo</label>
        <input id="nome" name="nome" value={campos.nome} onChange={alterarCampo} required />
      </div>

      <div className="formulario-campo">
        <label htmlFor="telefone">Telefone</label>
        <input
          id="telefone"
          name="telefone"
          value={campos.telefone}
          onChange={alterarCampo}
          required
        />
      </div>

      <div className="formulario-campo">
        <label htmlFor="email">E-mail</label>
        <input
          id="email"
          name="email"
          type="email"
          value={campos.email}
          onChange={alterarCampo}
          required
        />
      </div>

      <div className="formulario-campo">
        <label htmlFor="escola">Escola</label>
        <input id="escola" name="escola" value={campos.escola} onChange={alterarCampo} required />
      </div>

      <div className="formulario-campo">
        <label htmlFor="serie">Série</label>
        <input id="serie" name="serie" value={campos.serie} onChange={alterarCampo} required />
      </div>

      <div className="formulario-campo">
        <label htmlFor="cursoInteresse">Curso de Interesse</label>
        <select
          id="cursoInteresse"
          name="cursoInteresse"
          value={campos.cursoInteresse}
          onChange={alterarCampo}
          required
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
        <label htmlFor="genero">Gênero</label>
        <select id="genero" name="genero" value={campos.genero} onChange={alterarCampo} required>
          <option value="">Selecione</option>
          <option value="Masculino">Masculino</option>
          <option value="Feminino">Feminino</option>
          <option value="Outro">Prefiro não informar</option>
        </select>
      </div>

      <div className="formulario-campo">
        <label htmlFor="jaEstudou">Já estudou no Instituto?</label>
        <select id="jaEstudou" name="jaEstudou" value={campos.jaEstudou} onChange={alterarCampo}>
          <option value="Não">Não</option>
          <option value="Sim">Sim</option>
        </select>
      </div>

      <button type="submit" className="botao-azul formulario-enviar">

        Confirmar Inscrição
      </button>

      {visitanteCadastrado && (
        <div className="formulario-mensagem">
          <p>
            Inscrição confirmada, <strong>{visitanteCadastrado.nome}</strong>!
          </p>
          {mostrarQrCode && (
            <QRCodeVisitante codigo={visitanteCadastrado.codigoQr} tamanho={130} />
          )}
        </div>
      )}
    </form>
  );
}

export default Formulario;
