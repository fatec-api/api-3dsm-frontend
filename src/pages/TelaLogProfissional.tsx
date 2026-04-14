import { useEffect, useState } from "react";
import Header from "../shared/components/Header";
import { useParams } from "react-router-dom";
// import { listarApontamentosUsuarios} from "../services/apontamentoService";
// import { listarItensPorProfissional } from "../services/ItemService";
import { FaPencilAlt } from "react-icons/fa";

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

        setLogs(logsCompletos);
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
    const mockLogs: Log[] = [
      {
        id: 1,
        projeto: "GSWProj1",
        atividade: "Implementação API",
        nivel: "Análise",
        data: "2026-04-10",
        inicio: "08:00",
        fim: "12:00",
        status: "PENDENTE",
        justificativa: "-",
      },
      {
        id: 2,
        projeto: "GSWProj1",
        atividade: "Correção de bug",
        nivel: "Desenvolvimento",
        data: "2026-04-09",
        inicio: "13:00",
        fim: "17:00",
        status: "APROVADO",
        justificativa: "-",
      },
      {
        id: 3,
        projeto: "GSWProj2",
        atividade: "Refatoração",
        nivel: "Teste",
        data: "2026-04-08",
        inicio: "09:00",
        fim: "11:00",
        status: "REPROVADO",
        justificativa: "Horas inconsistentes",
      },
    ];

    setLogs(mockLogs);
    setLoading(false);
  }, []);

  const handleEditar = (id: number) => {
    console.log("Editar apontamento:", id);
    // integrar com o modal de edição
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
            <div className="overflow-x-auto">
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
                  {logs.map((row) => {
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

                        <td>{row.justificativa || "-"}</td>

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

          <div className="flex justify-center mt-8">
            <div className="join shadow-sm">
              <button className="join-item btn btn-sm">«</button>
              <button className="join-item btn btn-sm btn-active">Página 1</button>
              <button className="join-item btn btn-sm">»</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
