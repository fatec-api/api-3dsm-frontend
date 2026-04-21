import { useEffect, useState } from "react";
import Header from "../shared/components/Header";
import { FaDownload, FaArrowDown } from "react-icons/fa";
import Botao from "../shared/components/Botao";
import Input from "../shared/components/Input";
import { listarHistorico, type Log } from "../services/historicoService";

export default function TelaHistorico() {
  const [logs, setLogs] = useState<Log[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const [sucesso, setSucesso] = useState<string | null>(null);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [busca, setBusca] = useState("");
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
        const logsOrdenados = dados.sort((a, b) => {
          return new Date(b.data).getTime() - new Date(a.data).getTime();
        });

        setLogs(logsOrdenados);
      } catch (error) {
        console.error("Erro ao carregar histórico:", error);
        setErro("Não foi possível carregar o histórico no momento.");
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, []);

  const handleExportarCSV = () => {
    // Função mockada de exportar CSV
    const csvContent = [
      ["Usuário", "Data", "Hora", "Ação", "Justificativa"],
      ...logsFilterados.map((log) => [
        log.usuario,
        log.data,
        log.hora,
        log.acao,
        log.justificativa || "-",
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `historico_${new Date().toISOString().split("T")[0]}.csv`;
    link.click();
    window.URL.revokeObjectURL(url);
  };

  // lógica de filtro de busca
  const logsFilterados = logs.filter((log) =>
    log.usuario.toLowerCase().includes(busca.toLowerCase()) ||
    log.acao.toLowerCase().includes(busca.toLowerCase()) ||
    log.data.includes(busca)
  );

  // lógica de ordenação (padrão: data descendente)
  const logsOrdenados = [...logsFilterados].sort((a, b) => {
    return new Date(b.data).getTime() - new Date(a.data).getTime();
  });

  // lógica da paginação da tela
  const inicio = (paginaAtual - 1) * itensPorPagina;
  const fim = inicio + itensPorPagina;

  const logsPaginamento = logsOrdenados.slice(inicio, fim);

  const totalPaginas = Math.ceil(logsOrdenados.length / itensPorPagina);

  // TODO: Colocar pesquisa de vdd na api
  return (
    <div className="min-h-screen bg-base-100">
      <Header />
      <div className="flex justify-center mt-24 px-6 pb-12">
        <div className="w-full max-w-7xl bg-base-200 rounded-2xl p-4 md:p-6 lg:p-8 shadow-md">

          <div className="mb-8 bg-base-100 rounded-lg p-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <label className="text-xl md:text-2xl font-bold flex-shrink-0">Histórico</label>
              <div className="flex items-center gap-4 w-full lg:flex-1">
                <Input
                  type="text"
                  placeholder="Buscar por usuário, ação ou data..."
                  value={busca}
                  onChange={(e) => {
                    setBusca(e.target.value);
                    setPaginaAtual(1);
                  }}
                  widthPx={windowWidth < 768 ? 320 : 700}
                />
              </div>
              <div className="w-full lg:w-auto">
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
              <table className="table table-zebra">
                <thead>
                  <tr>
                    <th>Usuário</th>
                    <th>
                      <div className="flex items-center gap-2">
                        Data
                        <FaArrowDown size={12} />
                      </div>
                    </th>
                    <th>Hora</th>
                    <th>Ação</th>
                    <th>Justificativa</th>
                  </tr>
                </thead>

                <tbody>
                  {logsPaginamento.map((row, index) => (
                    <tr key={index}>
                      <td>{row.usuario}</td>
                      <td>{row.data}</td>
                      <td>{row.hora}</td>
                      <td>{row.acao}</td>
                      <td>{row.justificativa || "-"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {logs.length === 0 && (
                <div className="text-center py-6 text-gray-500">
                  Nenhum apontamento encontrado
                </div>
              )}
            </div>
          )}

          {erro && (
            <div className="alert alert-error mt-6">
              <span>{erro}</span>
            </div>
          )}

          {sucesso && (
            <div className="alert alert-success mt-6">
              <span>{sucesso}</span>
            </div>
          )}

          <div className="flex justify-center mt-8">
            <div className="join shadow-sm">
              <button
                className="join-item btn btn-sm"
                onClick={() => setPaginaAtual(p => Math.max(p - 1, 1))}
              >
                «
              </button>

              <button className="join-item btn btn-sm btn-active">
                Página {paginaAtual}
              </button>

              <button
                className="join-item btn btn-sm"
                onClick={() => setPaginaAtual(p => Math.min(p + 1, totalPaginas))}
              >
                »
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
