import { useEffect, useState } from "react";
import Header from "../shared/components/Header";
import Navbar from "../shared/components/Navbar";
import Tabela from "../shared/components/Tabela";
import { useParams } from "react-router-dom";
import { listarApontamentosUsuarios } from "../services/apontamentoService";
import { listarItensPorProfissional } from "../services/ItemService";
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
  const { id } = useParams<{ id: string }>();

 /* useEffect(() => {
    const fetchLogs = async () => {
      if (!id) return;

      try {
        setLoading(true);

        const apontamentos = await listarApontamentosUsuarios(id);
        const itens = await listarItensPorProfissional(id);

        const logsCompletos: Log[] = apontamentos.map((a: any) => {
          const item = itens.find((i: any) => i.id === a.itemId);

          return {
            id: a.id,
            projeto: item?.projetoNome || "Sem projeto",
            atividade: a.itemDescricao,
            nivel: item?.nivelAtividade || "UNDEFINED",
            data: a.dataApontamento,
            inicio: a.horaInicio,
            fim: a.horaFim,
            status: a.status_apontamento,
            justificativa: a.justificativa_rejeicao || "-",
          };
        });

        setLogs(logsCompletos);
      } catch (error) {
        console.error("Erro na requisição:", error);
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
      nivel: "ALTO",
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
      nivel: "MÉDIO",
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
      nivel: "BAIXO",
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
    // redirecionamento para o modal de edição
  };

  const columns = [
    { header: "Projeto", accessor: "projeto" },
    { header: "Atividade", accessor: "atividade" },
    { header: "Nível da atividade", accessor: "nivel" },
    { header: "Data do Apontamento", accessor: "data" },
    { header: "Hora início", accessor: "inicio" },
    { header: "Hora fim", accessor: "fim" },

    {
      header: "Status",
      accessor: "status",
      render: (row: Log) => {
        const color =
          row.status === "PENDENTE"
            ? "badge-warning"
            : row.status === "APROVADO"
            ? "badge-success"
            : "badge-error";

        return <span className={`badge ${color}`}>{row.status}</span>;
      },
    },

    {
      header: "Justificativa",
      accessor: "justificativa",
    },

    {
      header: "Editar",
      render: (row: Log) => {
        const isEditavel = row.status === "PENDENTE";

        return (
          <div
            className="tooltip"
            data-tip={
              isEditavel
                ? "Editar apontamento"
                : "Este apontamento já foi revisado e não pode mais ser editado"
            }
          >
            <button
              className={`btn btn-sm btn-ghost ${
                !isEditavel && "btn-disabled"
              }`}
              onClick={() => handleEditar(row.id)}
              disabled={!isEditavel}
            >
              <FaPencilAlt />
            </button>
          </div>
        );
      },
    },
  ];

  return (
    <div className="min-h-screen bg-base-100">
      <Header />

      <div className="flex justify-center mt-32 px-6">
        <div className="w-full max-w-6xl">

          <h1 className="text-center text-2xl font-medium mb-10">
            Meus Últimos Apontamentos
          </h1>

          <Tabela
            data={logs}
            columns={columns}
            emptyMessage="Nenhum apontamento realizado"
          />

          <div className="flex justify-center mt-6">
            <div className="join">
              <button className="join-item btn">«</button>
              <button className="join-item btn">Página 1</button>
              <button className="join-item btn">»</button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}