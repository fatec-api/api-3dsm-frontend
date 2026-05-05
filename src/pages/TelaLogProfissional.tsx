import { useEffect, useState } from "react";
import Header from "../shared/components/Header";
import { useParams } from "react-router-dom";
import { listarApontamentosUsuarios } from "../services/apontamentoService";
import { listarItensPorProfissional } from "../services/ItemService";
import { FaPencilAlt } from "react-icons/fa";
import ModalEditarApontamento from "../components/ModalEditarApontamento";
type Log = {
  id: number;
  projeto: string;
  atividade: string;
  nivel: string;
  data: string;
  inicio: string;
  fim: string;
  status: "PENDENTE" | "APROVADO" | "REPROVADO";
  justificativa?: string;
};
export default function TelaLogProfissional() {
  const [logs, setLogs] = useState<Log[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const [sucesso, setSucesso] = useState<string | null>(null);
  const { id } = useParams<{ id: string }>();
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [justificativaSelecionada, setJustificativaSelecionada] = useState<string | null>(null);
  const itensPorPagina = 15;
  const [logSelecionado, setLogSelecionado] = useState<Log | null>(null);
  const [modalAberto, setModalAberto] = useState(false);
  /*useEffect(() => {
    const fetchLogs = async () => {
      if (!id) return;
      try {
        setLoading(true);
        setErro(null);
        const apontamentos = await listarApontamentosUsuarios(id);
        const itens = await listarItensPorProfissional(id);
        const logsCompletos: Log[] = apontamentos.map((a: any) => {
          const item = itens.find((i: any) => i.id === a.itemId);
          return {
            id: a.id,
            projeto: item?.projetoNome || item?.projeto?.nomeProjeto || "Sem projeto",
            atividade: a.itemDescricao || a.atividade || "Sem atividade",
            nivel: item?.nivelAtividade || String(a.nivel || "UNDEFINED"),
            data: a.dataApontamento || a.data || "",
            inicio: a.horaInicio || a.inicio || "",
            fim: a.horaFim || a.fim || "",
            status: a.status_apontamento || a.status || "PENDENTE",
            justificativa: a.justificativa_rejeicao || a.justificativa || "-",
          };
        });
        const logsOrdenados = logsCompletos.sort(
        (a, b) => new Date(b.data).getTime() - new Date(a.data).getTime()
      );
        setLogs(logsOrdenados);
      } catch (error) {
        console.error("Erro na requisição:", error);
        setErro("Não foi possível carregar seus apontamentos no momento.");
      } finally {
        setLoading(false);
      }
    };
    fetchLogs();
  }, [id]); */
  useEffect(() => {
    const fetchLogs = async () => {
      if (!id) return;
      try {
        setLoading(true);
        setErro(null);
        const apontamentos = await listarApontamentosUsuarios(id);
        const itens = await listarItensPorProfissional(id);
        const logsCompletos: Log[] = apontamentos.map((a: any) => {
          const item = itens.find((i: any) => i.id === a.itemId);
          return {
            id: a.id,
            projeto: item?.projetoNome || item?.projeto?.nomeProjeto || "Sem projeto",
            atividade: a.itemDescricao || a.atividade || "Sem atividade",
            nivel: item?.nivelAtividade || String(a.nivel || "UNDEFINED"),
            data: a.dataApontamento || a.data || "",
            inicio: a.horaInicio || a.inicio || "",
            fim: a.horaFim || a.fim || "",
            status: a.status_apontamento || a.status || "PENDENTE",
            justificativa: a.justificativa_rejeicao || a.justificativa || "-",
          };
        });
        const logsOrdenados = logsCompletos.sort(
          (a, b) => new Date(b.data).getTime() - new Date(a.data).getTime()
        );
        setLogs(logsOrdenados);
      } catch (error) {
        console.error("Erro na requisição:", error);
        setErro("Não foi possível carregar seus apontamentos no momento.");
      } finally {
        setLoading(false);
      }
    };
    fetchLogs();
  }, [id]);
  // const mockLogs: Log[] = [
  //   {
  //     id: 1,
  //     projeto: "GSWProj1",
  //     atividade: "Implementação API",
  //     nivel: "Análise",
  //     data: "2026-04-10",
  //     inicio: "08:00",
  //     fim: "12:00",
  //     status: "PENDENTE",
  //     justificativa: "-",
  //   },
  //   {
  //     id: 2,
  //     projeto: "GSWProj1",
  //     atividade: "Correção de bug",
  //     nivel: "Desenvolvimento",
  //     data: "2026-04-09",
  //     inicio: "13:00",
  //     fim: "17:00",
  //     status: "APROVADO",
  //     justificativa: "-",
  //   },
  //   {
  //     id: 3,
  //     projeto: "GSWProj2",
  //     atividade: "Refatoração",
  //     nivel: "Teste",
  //     data: "2026-04-08",
  //     inicio: "09:00",
  //     fim: "11:00",
  //     status: "REPROVADO",
  //     justificativa: "Horas inconsistentes",
  //   },
  //   {
  //     id: 4,
  //     projeto: "GSWProj1",
  //     atividade: "Documentação técnica",
  //     nivel: "Análise",
  //     data: "2026-04-07",
  //     inicio: "10:00",
  //     fim: "12:00",
  //     status: "PENDENTE",
  //     justificativa: "-",
  //   },
  //   {
  //     id: 5,
  //     projeto: "GSWProj3",
  //     atividade: "Implementação Frontend",
  //     nivel: "Desenvolvimento",
  //     data: "2026-04-06",
  //     inicio: "08:00",
  //     fim: "12:00",
  //     status: "APROVADO",
  //     justificativa: "-",
  //   },
  //   {
  //     id: 6,
  //     projeto: "GSWProj2",
  //     atividade: "Testes unitários",
  //     nivel: "Teste",
  //     data: "2026-04-05",
  //     inicio: "13:00",
  //     fim: "16:00",
  //     status: "REPROVADO",
  //     justificativa: "Cobertura insuficiente",
  //   },
  //   {
  //     id: 7,
  //     projeto: "GSWProj1",
  //     atividade: "Ajuste de layout",
  //     nivel: "Desenvolvimento",
  //     data: "2026-04-04",
  //     inicio: "09:00",
  //     fim: "11:00",
  //     status: "PENDENTE",
  //     justificativa: "-",
  //   },
  //   {
  //     id: 8,
  //     projeto: "GSWProj4",
  //     atividade: "Reunião com cliente",
  //     nivel: "Análise",
  //     data: "2026-04-03",
  //     inicio: "14:00",
  //     fim: "16:00",
  //     status: "APROVADO",
  //     justificativa: "-",
  //   },
  //   {
  //     id: 9,
  //     projeto: "GSWProj2",
  //     atividade: "Correção backend",
  //     nivel: "Desenvolvimento",
  //     data: "2026-04-02",
  //     inicio: "10:00",
  //     fim: "13:00",
  //     status: "REPROVADO",
  //     justificativa: "Erro não reproduzido",
  //   },
  //   {
  //     id: 10,
  //     projeto: "GSWProj3",
  //     atividade: "Deploy aplicação",
  //     nivel: "Teste",
  //     data: "2026-04-01",
  //     inicio: "15:00",
  //     fim: "18:00",
  //     status: "PENDENTE",
  //     justificativa: "-",
  //   },
  //   {
  //     id: 11,
  //     projeto: "GSWProj1",
  //     atividade: "Refatoração código",
  //     nivel: "Desenvolvimento",
  //     data: "2026-03-31",
  //     inicio: "08:00",
  //     fim: "12:00",
  //     status: "APROVADO",
  //     justificativa: "-",
  //   },
  //   {
  //     id: 12,
  //     projeto: "GSWProj4",
  //     atividade: "Análise de requisitos",
  //     nivel: "Análise",
  //     data: "2026-03-30",
  //     inicio: "09:00",
  //     fim: "11:00",
  //     status: "PENDENTE",
  //     justificativa: "-",
  //   },
  //   {
  //     id: 13,
  //     projeto: "GSWProj2",
  //     atividade: "Criação de testes",
  //     nivel: "Teste",
  //     data: "2026-03-29",
  //     inicio: "13:00",
  //     fim: "17:00",
  //     status: "REPROVADO",
  //     justificativa: "Faltou cenário",
  //   },
  //   {
  //     id: 14,
  //     projeto: "GSWProj3",
  //     atividade: "Integração API",
  //     nivel: "Desenvolvimento",
  //     data: "2026-03-28",
  //     inicio: "10:00",
  //     fim: "12:00",
  //     status: "APROVADO",
  //     justificativa: "-",
  //   },
  //   {
  //     id: 15,
  //     projeto: "GSWProj1",
  //     atividade: "Correção UI",
  //     nivel: "Desenvolvimento",
  //     data: "2026-03-27",
  //     inicio: "14:00",
  //     fim: "17:00",
  //     status: "PENDENTE",
  //     justificativa: "-",
  //   },
  //   {
  //     id: 16,
  //     projeto: "GSWProj4",
  //     atividade: "Planejamento sprint",
  //     nivel: "Análise",
  //     data: "2026-03-26",
  //     inicio: "09:00",
  //     fim: "11:00",
  //     status: "APROVADO",
  //     justificativa: "-",
  //   },
  //   {
  //     id: 17,
  //     projeto: "GSWProj2",
  //     atividade: "Debug sistema",
  //     nivel: "Desenvolvimento",
  //     data: "2026-03-25",
  //     inicio: "11:00",
  //     fim: "15:00",
  //     status: "REPROVADO",
  //     justificativa: "Erro persistente",
  //   },
  //   {
  //     id: 18,
  //     projeto: "GSWProj3",
  //     atividade: "Validação final",
  //     nivel: "Teste",
  //     data: "2026-03-24",
  //     inicio: "13:00",
  //     fim: "16:00",
  //     status: "PENDENTE",
  //     justificativa: "-",
  //   },
  // ];
  // const logsOrdenados = mockLogs.sort((a, b) => {
  //   return new Date(b.data).getTime() - new Date(a.data).getTime();
  // });
  //   setLogs(logsOrdenados);
  //   setLoading(false);
  // }, []);
  const handleEditar = (id: number) => {
    const log = logs.find(l => l.id === id);
    if (!log) return;
    setLogSelecionado(log);
    setModalAberto(true);
  };
  // lógica da paginação da tela
  const inicio = (paginaAtual - 1) * itensPorPagina;
  const fim = inicio + itensPorPagina;
  const logsPaginamento = logs.slice(inicio, fim);
  const totalPaginas = Math.ceil(logs.length / itensPorPagina);
  const justificativaLimpa = (text?: string) => {
    if (!text) return null;
    const t = text.trim();
    if (t === "-" || t === "--") return null;
    return t;
  };
  return (
    <div className="min-h-screen bg-base-100">
      <Header />
      <div className="flex justify-center mt-24 px-6 pb-12">
        <div className="w-full max-w-7xl bg-base-200 rounded-2xl p-8 shadow-md">
          <h1 className="text-center text-2xl font-semibold mb-8">
            Meus Últimos Apontamentos
          </h1>
          {loading ? (
            <div className="flex justify-center py-12">
              <span className="loading loading-spinner loading-lg"></span>
            </div>
          ) : (
            <div>
              <table className="table table-zebra">
                <thead>
                  <tr>
                    <th>Projeto</th>
                    <th>Atividade</th>
                    <th>Nível</th>
                    <th>Data</th>
                    <th>Início</th>
                    <th>Fim</th>
                    <th>Status</th>
                    <th>Justificativa</th>
                    <th className="text-center">Editar</th>
                  </tr>
                </thead>
                <tbody>
                  {logsPaginamento.map((row) => {
                    const isEditavel = row.status === "PENDENTE";
                    const badgeColor =
                      row.status === "PENDENTE"
                        ? "badge-warning"
                        : row.status === "APROVADO"
                          ? "badge-success"
                          : "badge-error";
                    return (
                      <tr key={row.id} className="hover">
                        <td>{row.projeto}</td>
                        <td>{row.atividade}</td>
                        <td>{row.nivel}</td>
                        <td>{row.data}</td>
                        <td>{row.inicio}</td>
                        <td>{row.fim}</td>
                        <td>
                          <span className={`badge ${badgeColor}`}>
                            {row.status}
                          </span>
                        </td>
                        <td className="align-middle">
                          {(() => {
                            const texto = justificativaLimpa(row.justificativa);
                            if (!texto) {
                              return <span className="text-gray-400">-</span>;
                            }
                            return (
                              <span
                                className="cursor-pointer underline block"
                                onClick={() => setJustificativaSelecionada(texto)}
                              >
                                {texto.length > 20 ? texto.slice(0, 20) + "..." : texto}
                              </span>
                            );
                          })()}
                        </td>
                        <td className="text-center">
                          <div
                            className="tooltip"
                            data-tip={
                              isEditavel
                                ? "Editar apontamento"
                                : "Este apontamento já foi revisado e não pode mais ser editado"
                            }
                          >
                            <button
                              className={`btn btn-sm btn-circle ${isEditavel
                                ? "btn-ghost hover:bg-base-300"
                                : "btn-disabled"
                                }`}
                              onClick={() => handleEditar(row.id)}
                              disabled={!isEditavel}
                            >
                              <FaPencilAlt size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
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
          {justificativaSelecionada && (
            <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
              <div className="bg-gray-100 p-6 rounded-lg max-w-md w-full shadow-lg">
                <h2 className="text-lg font-semibold mb-4">Justificativa</h2>
                <p className="mb-4 break-words">
                  {justificativaSelecionada}
                </p>
                <div className="flex justify-end">
                  <button
                    className="btn btn-sm"
                    onClick={() => setJustificativaSelecionada(null)}
                  >
                    Fechar
                  </button>
                </div>
              </div>
            </div>
          )}
          {modalAberto && logSelecionado && (
            <ModalEditarApontamento
              isOpen={modalAberto}
              onClose={() => setModalAberto(false)}
              apontamento={logSelecionado}
              onSave={(apontamentoAtualizado: Log) => {
                setLogs((prev) =>
                  prev.map((l) =>
                    l.id === apontamentoAtualizado.id ? apontamentoAtualizado : l
                  )
                );
                setSucesso("Apontamento atualizado com sucesso!");
                setModalAberto(false);
              }}
            />
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