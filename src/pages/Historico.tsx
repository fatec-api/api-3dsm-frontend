import { useEffect, useState, useMemo } from "react";
import Header from "../shared/components/Header";
import { FaDownload, FaArrowDown, FaArrowUp } from "react-icons/fa";
import Botao from "../shared/components/Botao";
import Input from "../shared/components/Input";
import { listarHistorico, type Log } from "../services/historicoService";

export default function Historico() {
  const [logs, setLogs] = useState<Log[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [busca, setBusca] = useState("");
  const [ordemDescendente, setOrdemDescendente] = useState(true); 
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const itensPorPagina = 15;

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        setLoading(true);
        setErro(null);
        const dados = await listarHistorico();
        setLogs(dados);
      } catch (error) {
        console.error("Erro ao carregar histórico:", error);
        setErro("Não foi possível carregar o histórico no momento.");
      } finally {
        setLoading(false);
      }
    };
    fetchLogs();
  }, []);

  // Lógica de filtro (Memoizada)
  const logsFiltrados = useMemo(() => {
    return logs.filter((log) =>
      log.usuario.toLowerCase().includes(busca.toLowerCase()) ||
      log.acao.toLowerCase().includes(busca.toLowerCase()) ||
      log.data.includes(busca)
    );
  }, [logs, busca]);

  // Lógica de ordenação para a TELA
  const logsOrdenadosParaTela = useMemo(() => {
    return [...logsFiltrados].sort((a, b) => {
      const dataA = new Date(a.data).getTime();
      const dataB = new Date(b.data).getTime();
      return ordemDescendente ? dataB - dataA : dataA - dataB;
    });
  }, [logsFiltrados, ordemDescendente]);

  const handleExportarCSV = () => {
    // Exportação sempre do mais novo para o mais antigo para o arquivo
    const dadosParaExportar = [...logsFiltrados].sort((a, b) => 
      new Date(b.data).getTime() - new Date(a.data).getTime()
    );

    const rows = [
      ["Usuário", "Data", "Hora", "Ação", "Justificativa"],
      ...dadosParaExportar.map((log) => [
        log.usuario,
        `'${log.data}`, // Aspa simples resolve o bug dos sustenidos (####) no Excel
        log.hora,
        log.acao,
        log.justificativa || "-",
      ]),
    ];

    const csvContent = rows
      .map((row) =>
        row
          .map((field) => {
            const cleanField = String(field).replace(/"/g, '""');
            return `"${cleanField}"`;
          })
          .join(";")
      )
      .join("\n");

    const BOM = "\uFEFF";
    const blob = new Blob([BOM + csvContent], { type: "text/csv;charset=utf-8;" });
    
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `historico_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  const inicio = (paginaAtual - 1) * itensPorPagina;
  const logsPaginados = logsOrdenadosParaTela.slice(inicio, inicio + itensPorPagina);
  const totalPaginas = Math.ceil(logsFiltrados.length / itensPorPagina);

  return (
    <div className="min-h-screen bg-base-100">
      <Header />
      <div className="flex justify-center mt-24 px-6 pb-12">
        <div className="w-full max-w-7xl bg-base-200 rounded-2xl p-4 md:p-6 lg:p-8 shadow-md">
          
          <div className="mb-8 bg-base-100 rounded-lg p-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <label className="text-xl md:text-2xl font-bold flex-shrink-0">Histórico</label>
              
              <Input
                type="text"
                placeholder="Buscar por usuário, ação ou data..."
                value={busca}
                onChange={(e) => {
                  setBusca(e.target.value);
                  setPaginaAtual(1);
                }}
                widthPx={
                  windowWidth < 768 
                    ? 320 
                    : windowWidth < 1150 
                      ? 550 
                      : 700
                }
              />

              {/* Container do Botão: Direita em telas < 1024px (lg), Esquerda/Start em telas grandes */}
              <div className="w-full lg:w-48 flex justify-end lg:justify-start"> 
                <Botao onClick={handleExportarCSV}>
                  <span className="flex items-center justify-center gap-2 whitespace-nowrap">
                    <FaDownload />
                    Exportar CSV
                  </span>
                </Botao>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center py-12">
              <span className="loading loading-spinner loading-lg"></span>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="table table-zebra w-full">
                <thead>
                  <tr>
                    <th>Usuário</th>
                    <th 
                      className="cursor-pointer hover:bg-base-300 transition-colors"
                      onClick={() => setOrdemDescendente(!ordemDescendente)}
                    >
                      <div className="flex items-center gap-2">
                        Data {ordemDescendente ? <FaArrowDown size={12} /> : <FaArrowUp size={12} />}
                      </div>
                    </th>
                    <th>Hora</th>
                    <th>Ação</th>
                    <th>Justificativa</th>
                  </tr>
                </thead>
                <tbody>
                  {logsPaginados.map((row, index) => (
                    <tr key={index}>
                      <td>{row.usuario}</td>
                      <td>{row.data}</td>
                      <td>{row.hora}</td>
                      <td>{row.acao}</td>
                      <td className="max-w-xs truncate">{row.justificativa || "-"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {logsFiltrados.length === 0 && (
                <div className="text-center py-10 text-gray-500">Nenhum registro encontrado.</div>
              )}
            </div>
          )}

          {erro && (
            <div className="alert alert-error mt-4">
              <span>{erro}</span>
            </div>
          )}

          {/* Paginação */}
          {totalPaginas > 1 && (
            <div className="flex justify-center mt-8">
              <div className="join shadow-sm">
                <button 
                  className="join-item btn btn-sm" 
                  disabled={paginaAtual === 1}
                  onClick={() => setPaginaAtual(p => p - 1)}
                >«</button>
                <button className="join-item btn btn-sm no-animation font-normal">
                  Página {paginaAtual} de {totalPaginas}
                </button>
                <button 
                  className="join-item btn btn-sm" 
                  disabled={paginaAtual === totalPaginas}
                  onClick={() => setPaginaAtual(p => p + 1)}
                >»</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}