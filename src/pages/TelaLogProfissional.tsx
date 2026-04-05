import { useEffect, useState } from "react";
import Header from "../shared/components/Header";
import Tabela from "../shared/components/Tabela";
import { useParams } from "react-router-dom";
import { listarApontamentosUsuarios } from "../services/apontamentoService";
import { listarItensPorProfissional } from "../services/ItemService"

type Log = {
  projeto: string;
  item: string;
  nivel: string;
  data: string;
  inicio: string;
  fim: string;
};

export default function TelaLogProfissional() {
  const [logs, setLogs] = useState<Log[]>([]);
  const [loading, setLoading] = useState(true)
  const { id } = useParams<{ id: string }>()

  useEffect(() => {
    const fetchLogs = async () => {
      if (!id) return;

      try {
        setLoading(true);

        const apontamentos = await listarApontamentosUsuarios(id);
        const itens = await listarItensPorProfissional(id);

        const logsCompletos: Log[] = apontamentos.map((a: any) => {
          const item = itens.find((i: any) => i.id === a.itemId);

          return {
            projeto: item?.projetoNome || "Sem projeto",
            item: a.itemDescricao,
            nivel: item?.nivelAtividade || "UNDEFINED",
            data: a.dataApontamento,
            inicio: a.horaInicio,
            fim: a.horaFim,
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
  }, [id])

  const columns = [
    { header: "Projeto", accessor: "projeto" },
    { header: "Item", accessor: "item" },
    { header: "Nível da atividade", accessor: "nivel" },
    { header: "Data do Apontamento", accessor: "data" },
    { header: "Hora início", accessor: "inicio" },
    { header: "Hora fim", accessor: "fim" },
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

        </div>
      </div>
    </div>
  );
}