import { createContext, useContext, useEffect, useState } from "react";
import { gerarCodigoUnico } from "./gerarCodigo";

/*
 * Guarda visitantes e presenças por setor.
 * Os dados ficam no estado do React e são espelhados no localStorage
 * para não serem perdidos ao recarregar a página durante o evento.
 */
const VisitantesContext = createContext(null);

const CHAVE_VISITANTES = "feira2026-visitantes";
const CHAVE_PRESENCAS = "feira2026-presencas";

function lerLocal(chave) {
  try {
    const bruto = window.localStorage.getItem(chave);
    return bruto ? JSON.parse(bruto) : null;
  } catch {
    return null;
  }
}

export function VisitantesProvider({ children }) {
  const [visitantes, setVisitantes] = useState([]);
  const [presencas, setPresencas] = useState([]);
  const [hidratado, setHidratado] = useState(false);

  /* Leitura do localStorage só no navegador, depois da hidratação */
  useEffect(() => {
    setVisitantes(lerLocal(CHAVE_VISITANTES) || []);
    setPresencas(lerLocal(CHAVE_PRESENCAS) || []);
    setHidratado(true);
  }, []);

  useEffect(() => {
    if (!hidratado) return;
    window.localStorage.setItem(CHAVE_VISITANTES, JSON.stringify(visitantes));
  }, [visitantes, hidratado]);

  useEffect(() => {
    if (!hidratado) return;
    window.localStorage.setItem(CHAVE_PRESENCAS, JSON.stringify(presencas));
  }, [presencas, hidratado]);

  function adicionarVisitante(dados) {
    const novoVisitante = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      ...dados,
      codigoQr: gerarCodigoUnico(),
      criadoEm: new Date().toISOString(),
    };
    setVisitantes((lista) => [...lista, novoVisitante]);
    return novoVisitante;
  }

  function atualizarVisitante(id, dados) {
    setVisitantes((lista) =>
      lista.map((visitante) => (visitante.id === id ? { ...visitante, ...dados } : visitante)),
    );
  }

  function removerVisitante(id) {
    setVisitantes((lista) => lista.filter((visitante) => visitante.id !== id));
    setPresencas((lista) => lista.filter((presenca) => presenca.visitanteId !== id));
  }

  function buscarPorCodigo(codigo) {
    return visitantes.find((visitante) => visitante.codigoQr === codigo) || null;
  }

  /*
   * Registra a presença de um visitante em um setor de atração.
   * Evita contar a mesma pessoa duas vezes no mesmo setor.
   */
  function registrarPresenca(codigo, setor) {
    const visitante = buscarPorCodigo(codigo);
    if (!visitante) {
      return { status: "desconhecido", visitante: null };
    }

    const jaRegistrado = presencas.some(
      (presenca) => presenca.visitanteId === visitante.id && presenca.setor === setor,
    );
    if (jaRegistrado) {
      return { status: "repetido", visitante };
    }

    const presenca = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      visitanteId: visitante.id,
      codigoQr: codigo,
      setor,
      registradoEm: new Date().toISOString(),
    };
    setPresencas((lista) => [presenca, ...lista]);
    return { status: "registrado", visitante, presenca };
  }

  return (
    <VisitantesContext.Provider
      value={{
        visitantes,
        presencas,
        adicionarVisitante,
        atualizarVisitante,
        removerVisitante,
        buscarPorCodigo,
        registrarPresenca,
      }}
    >
      {children}
    </VisitantesContext.Provider>
  );
}

export function useVisitantes() {
  return useContext(VisitantesContext);
}
