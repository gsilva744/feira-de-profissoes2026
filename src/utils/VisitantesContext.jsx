import { createContext, useContext, useState } from "react";
import { gerarCodigoUnico } from "./gerarCodigo";

/*
 * Guarda os visitantes apenas em memoria (React State).
 * Nao existe banco de dados nem persistencia.
 */
const VisitantesContext = createContext(null);

export function VisitantesProvider({ children }) {
  const [visitantes, setVisitantes] = useState([]);

  function adicionarVisitante(dados) {
    const novoVisitante = {
      id: visitantes.length + 1,
      ...dados,
      codigoQr: gerarCodigoUnico(),
    };
    setVisitantes((lista) => [...lista, novoVisitante]);
    return novoVisitante;
  }

  function atualizarVisitante(id, dados) {
    setVisitantes((lista) =>
      lista.map((visitante) =>
        visitante.id === id ? { ...visitante, ...dados } : visitante,
      ),
    );
  }

  function removerVisitante(id) {
    setVisitantes((lista) => lista.filter((visitante) => visitante.id !== id));
  }

  return (
    <VisitantesContext.Provider
      value={{
        visitantes,
        adicionarVisitante,
        atualizarVisitante,
        removerVisitante,
      }}
    >
      {children}
    </VisitantesContext.Provider>
  );
}

export function useVisitantes() {
  return useContext(VisitantesContext);
}
