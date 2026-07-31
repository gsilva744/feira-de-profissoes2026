import { useEffect, useState } from "react";
import "../../css/header.css";

const itensMenu = [
  { id: "inicio", nome: "Início" },
  { id: "programacao", nome: "Programação" },
  { id: "local", nome: "Local" },
  { id: "cursos", nome: "Cursos" },
  { id: "contato", nome: "Contato" },
];

function Header({ onAbrirAreaRestrita }) {
  const [reduzido, setReduzido] = useState(false);
  const [menuAberto, setMenuAberto] = useState(false);

  useEffect(() => {
    function aoRolar() {
      setReduzido(window.scrollY > 60);
    }
    window.addEventListener("scroll", aoRolar);
    return () => window.removeEventListener("scroll", aoRolar);
  }, []);

  function irParaSecao(id) {
    setMenuAberto(false);
    const secao = document.getElementById(id);
    if (secao) {
      secao.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <header className={reduzido ? "header header-reduzido" : "header"}>
      <div className="container header-conteudo">
        <div className="header-logo">
          <span className="header-logo-marca">ISF</span>
          <span className="header-logo-texto">
            Instituto Social
            <br />
            Nossa Senhora de Fátima
          </span>
        </div>

        <nav className={menuAberto ? "header-menu header-menu-aberto" : "header-menu"}>
          {itensMenu.map((item) => (
            <button key={item.id} onClick={() => irParaSecao(item.id)}>
              {item.nome}
            </button>
          ))}
        </nav>

        <div className="header-acao">
          <button className="botao-amarelo" onClick={onAbrirAreaRestrita}>
            Área Restrita
          </button>
        </div>

        <button
          className="header-botao-menu"
          aria-label="Abrir menu"
          onClick={() => setMenuAberto((aberto) => !aberto)}
        >
          ☰
        </button>
      </div>
    </header>
  );
}

export default Header;
