import { useEffect, useState } from "react";
import "../../css/contador.css";

const dataDaFeira = new Date("2026-09-19T09:00:00");

function calcularTempoRestante() {
  const diferenca = dataDaFeira.getTime() - Date.now();
  if (diferenca <= 0) {
    return { dias: 0, horas: 0, minutos: 0, segundos: 0 };
  }
  const segundosTotais = Math.floor(diferenca / 1000);
  return {
    dias: Math.floor(segundosTotais / 86400),
    horas: Math.floor((segundosTotais % 86400) / 3600),
    minutos: Math.floor((segundosTotais % 3600) / 60),
    segundos: segundosTotais % 60,
  };
}

function Contador() {
  const [tempo, setTempo] = useState(calcularTempoRestante);

  useEffect(() => {
    const intervalo = setInterval(() => setTempo(calcularTempoRestante()), 1000);
    return () => clearInterval(intervalo);
  }, []);

  return (
    <div className="contador-card">
      <h3>⏰ Data e Hora Feira 2026</h3>
      <p>Horário: 09h às 18h · Dia: 19/09</p>
      <div className="contador-valores">
        <div className="contador-item">
          <span className="contador-numero">{tempo.dias}</span>
          <span className="contador-rotulo">Dias</span>
        </div>
        <div className="contador-item">
          <span className="contador-numero">{tempo.horas}</span>
          <span className="contador-rotulo">Horas</span>
        </div>
        <div className="contador-item">
          <span className="contador-numero">{tempo.minutos}</span>
          <span className="contador-rotulo">Min</span>
        </div>
        <div className="contador-item">
          <span className="contador-numero">{tempo.segundos}</span>
          <span className="contador-rotulo">Seg</span>
        </div>
      </div>
    </div>
  );
}

export default Contador;
