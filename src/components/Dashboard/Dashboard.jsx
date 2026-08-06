import { useVisitantes } from "../../utils/VisitantesContext";
import "../../css/dashboard.css";

/* Calcula a porcentagem simples evitando divisao por zero */
function calcularPorcentagem(parte, total) {
  if (total === 0) return 0;
  return Math.round((parte / total) * 100);
}

/* Grafico de rosca desenhado com SVG puro */
function Rosca({ porcentagem, cor, rotulo, valor }) {
  const raio = 42;
  const perimetro = 2 * Math.PI * raio;
  const preenchido = (porcentagem / 100) * perimetro;

  return (
    <div className="dashboard-rosca">
      <svg viewBox="0 0 100 100" className="dashboard-rosca-svg">
        <circle cx="50" cy="50" r={raio} className="dashboard-rosca-trilha" />
        <circle
          cx="50"
          cy="50"
          r={raio}
          className="dashboard-rosca-valor"
          stroke={cor}
          strokeDasharray={`${preenchido} ${perimetro}`}
        />
        <text x="50" y="54" className="dashboard-rosca-texto">
          {porcentagem}%
        </text>
      </svg>
      <span className="dashboard-rosca-rotulo">{rotulo}</span>
      <span className="dashboard-rosca-valor-texto">{valor} pessoa(s)</span>
    </div>
  );
}

function Dashboard() {
  const { visitantes } = useVisitantes();
  const total = visitantes.length;

  const homens = visitantes.filter((visitante) => visitante.genero === "Masculino").length;
  const mulheres = visitantes.filter((visitante) => visitante.genero === "Feminino").length;
  const outros = total - homens - mulheres;
  const jaEstudaram = visitantes.filter((visitante) => visitante.jaEstudou === "Sim").length;

  /* Agrupa os inscritos por curso de interesse para o grafico de barras */
  const porCurso = {};
  visitantes.forEach((visitante) => {
    const curso = visitante.cursoInteresse || "Não informado";
    porCurso[curso] = (porCurso[curso] || 0) + 1;
  });
  const listaCursos = Object.entries(porCurso).sort((a, b) => b[1] - a[1]).slice(0, 6);
  const maiorCurso = listaCursos.length > 0 ? listaCursos[0][1] : 0;

  return (
    <div className="dashboard">
      <div className="dashboard-cartoes">
        <div className="dashboard-cartao">
          <span className="dashboard-cartao-rotulo">Quantidade de inscrições</span>
          <strong className="dashboard-cartao-numero">{total}</strong>
        </div>
        <div className="dashboard-cartao dashboard-cartao-amarelo">
          <span className="dashboard-cartao-rotulo">Já estudaram no Instituto</span>
          <strong className="dashboard-cartao-numero">{jaEstudaram}</strong>
        </div>
        <div className="dashboard-cartao">
          <span className="dashboard-cartao-rotulo">Homens</span>
          <strong className="dashboard-cartao-numero">{homens}</strong>
        </div>
        <div className="dashboard-cartao dashboard-cartao-amarelo">
          <span className="dashboard-cartao-rotulo">Mulheres</span>
          <strong className="dashboard-cartao-numero">{mulheres}</strong>
        </div>
      </div>

      <div className="dashboard-grade">
        <div className="dashboard-bloco">
          <h3 className="dashboard-bloco-titulo">Perfil dos inscritos</h3>
          <div className="dashboard-roscas">
            <Rosca
              porcentagem={calcularPorcentagem(homens, total)}
              cor="var(--azul)"
              rotulo="Homens"
              valor={homens}
            />
            <Rosca
              porcentagem={calcularPorcentagem(mulheres, total)}
              cor="var(--amarelo)"
              rotulo="Mulheres"
              valor={mulheres}
            />
            <Rosca
              porcentagem={calcularPorcentagem(outros, total)}
              cor="var(--azul-claro)"
              rotulo="Outros"
              valor={outros}
            />
            <Rosca
              porcentagem={calcularPorcentagem(jaEstudaram, total)}
              cor="var(--amarelo-escuro)"
              rotulo="Já estudaram"
              valor={jaEstudaram}
            />
          </div>
        </div>

        <div className="dashboard-bloco">
          <h3 className="dashboard-bloco-titulo">Cursos mais procurados</h3>
          {listaCursos.length === 0 ? (
            <p className="admin-vazio">Nenhum dado para exibir ainda.</p>
          ) : (
            <ul className="dashboard-barras">
              {listaCursos.map(([curso, quantidade]) => (
                <li key={curso} className="dashboard-barra-item">
                  <span className="dashboard-barra-nome">{curso}</span>
                  <span className="dashboard-barra-trilha">
                    <span
                      className="dashboard-barra-preenchida"
                      style={{ width: `${calcularPorcentagem(quantidade, maiorCurso)}%` }}
                    />
                  </span>
                  <span className="dashboard-barra-numero">{quantidade}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
