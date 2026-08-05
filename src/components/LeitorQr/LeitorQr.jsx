import { useEffect, useRef, useState } from "react";
import { lerQrCode } from "../../lib/qrcode";
import { useVisitantes } from "../../utils/VisitantesContext";
import QRCodeVisitante from "../QRCode/QRCodeVisitante";
import "../../css/leitor.css";

/*
 * Leitor de QR Code proprio (sem servicos externos).
 * Aceita leitura pela camera e por upload de imagem.
 */
function LeitorQr() {
  const { visitantes } = useVisitantes();
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const fluxoRef = useRef(null);
  const [cameraLigada, setCameraLigada] = useState(false);
  const [mensagem, setMensagem] = useState("");
  const [historico, setHistorico] = useState([]);
  const [ultimaLeitura, setUltimaLeitura] = useState(null);

  function registrarLeitura(resultado) {
    const visitante = visitantes.find((item) => item.codigoQr === resultado.texto) || null;
    const leitura = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      texto: resultado.texto,
      versao: resultado.versao,
      nivel: resultado.nivel,
      horario: new Date().toLocaleTimeString("pt-BR"),
      visitante,
    };
    setUltimaLeitura(leitura);
    setHistorico((lista) => [leitura, ...lista].slice(0, 20));
    setMensagem(visitante ? `Visitante reconhecido: ${visitante.nome}` : "Código lido com sucesso");
  }

  function pararCamera() {
    if (fluxoRef.current) {
      fluxoRef.current.getTracks().forEach((trilha) => trilha.stop());
      fluxoRef.current = null;
    }
    setCameraLigada(false);
  }

  async function ligarCamera() {
    setMensagem("");
    try {
      const fluxo = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });
      fluxoRef.current = fluxo;
      if (videoRef.current) {
        videoRef.current.srcObject = fluxo;
        await videoRef.current.play();
      }
      setCameraLigada(true);
    } catch {
      setMensagem("Não foi possível acessar a câmera deste dispositivo.");
    }
  }

  /* Analisa um quadro do video a cada 300ms enquanto a camera estiver ligada */
  useEffect(() => {
    if (!cameraLigada) return undefined;

    const intervalo = setInterval(() => {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      if (!video || !canvas || !video.videoWidth) return;

      const lado = Math.min(video.videoWidth, video.videoHeight);
      canvas.width = 360;
      canvas.height = 360;
      const contexto = canvas.getContext("2d");
      contexto.drawImage(
        video,
        (video.videoWidth - lado) / 2,
        (video.videoHeight - lado) / 2,
        lado,
        lado,
        0,
        0,
        canvas.width,
        canvas.height,
      );
      const imagem = contexto.getImageData(0, 0, canvas.width, canvas.height);
      const resultado = lerQrCode(imagem);
      if (resultado) registrarLeitura(resultado);
    }, 300);

    return () => clearInterval(intervalo);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cameraLigada, visitantes]);

  useEffect(() => pararCamera, []);

  function lerArquivo(evento) {
    const arquivo = evento.target.files?.[0];
    if (!arquivo) return;
    setMensagem("");

    const imagemHtml = new Image();
    imagemHtml.onload = () => {
      const canvas = canvasRef.current;
      const escala = Math.min(1, 700 / Math.max(imagemHtml.width, imagemHtml.height));
      canvas.width = Math.round(imagemHtml.width * escala);
      canvas.height = Math.round(imagemHtml.height * escala);
      const contexto = canvas.getContext("2d");
      contexto.drawImage(imagemHtml, 0, 0, canvas.width, canvas.height);
      const imagem = contexto.getImageData(0, 0, canvas.width, canvas.height);
      const resultado = lerQrCode(imagem);
      if (resultado) registrarLeitura(resultado);
      else setMensagem("Nenhum QR Code encontrado nesta imagem.");
      URL.revokeObjectURL(imagemHtml.src);
    };
    imagemHtml.src = URL.createObjectURL(arquivo);
    evento.target.value = "";
  }

  function imprimirLeitura() {
    window.print();
  }

  return (
    <div className="leitor">
      <div className="leitor-colunas">
        <div className="leitor-camera">
          <div className="leitor-video-area">
            <video ref={videoRef} className="leitor-video" muted playsInline />
            {!cameraLigada && <p className="leitor-video-aviso">Câmera desligada</p>}
            <span className="leitor-mira" />
          </div>

          <div className="leitor-botoes">
            {cameraLigada ? (
              <button className="botao-azul" onClick={pararCamera}>
                Parar câmera
              </button>
            ) : (
              <button className="botao-azul" onClick={ligarCamera}>
                Ligar câmera
              </button>
            )}
            <label className="leitor-upload">
              Enviar imagem
              <input type="file" accept="image/*" onChange={lerArquivo} />
            </label>
          </div>

          {mensagem && <p className="leitor-mensagem">{mensagem}</p>}
          <canvas ref={canvasRef} className="leitor-canvas" />
        </div>

        <div className="leitor-resultado">
          <h3>Última leitura</h3>
          {ultimaLeitura ? (
            <div className="leitor-cartao" id="leitor-impressao">
              <QRCodeVisitante codigo={ultimaLeitura.texto} tamanho={140} />
              <p className="leitor-codigo">{ultimaLeitura.texto}</p>
              <p className="leitor-info">
                Versão {ultimaLeitura.versao} · correção {ultimaLeitura.nivel} ·{" "}
                {ultimaLeitura.horario}
              </p>
              {ultimaLeitura.visitante ? (
                <div className="leitor-visitante">
                  <strong>{ultimaLeitura.visitante.nome}</strong>
                  <span>{ultimaLeitura.visitante.email}</span>
                  <span>{ultimaLeitura.visitante.cursoInteresse}</span>
                  <span className="leitor-selo leitor-selo-ok">Credencial válida</span>
                </div>
              ) : (
                <span className="leitor-selo leitor-selo-alerta">
                  Código não encontrado na lista
                </span>
              )}
              <button className="botao-amarelo leitor-imprimir" onClick={imprimirLeitura}>
                Imprimir ícone gerado
              </button>
            </div>
          ) : (
            <p className="leitor-vazio">
              Aponte um QR Code para a câmera ou envie uma imagem para começar.
            </p>
          )}

          <h3 className="leitor-historico-titulo">Histórico de leituras</h3>
          {historico.length === 0 ? (
            <p className="leitor-vazio">Nenhuma leitura registrada.</p>
          ) : (
            <ul className="leitor-historico">
              {historico.map((leitura) => (
                <li key={leitura.id}>
                  <span className="leitor-historico-hora">{leitura.horario}</span>
                  <span className="leitor-historico-texto">
                    {leitura.visitante ? leitura.visitante.nome : leitura.texto}
                  </span>
                  <span
                    className={
                      leitura.visitante
                        ? "leitor-ponto leitor-ponto-ok"
                        : "leitor-ponto leitor-ponto-alerta"
                    }
                  />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default LeitorQr;
