import { useEffect, useState } from "react";
import Header from "../shared/components/Header";
import Tabela from "../shared/components/Tabela";
import { useParams } from "react-router-dom";

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
        const response = await fetch(`http://localhost:8080/apontamentos/usuario/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        });

        if (!response.ok) {
          throw new Error(`Erro ao buscar dados: ${response.status}`);
        }

        const data: Log[] = await response.json();
        setLogs(data);
      } catch (error) {
        console.error("Erro na requisição:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, [id])

  const columns = [
    { header: "Projeto", accessor: "projetoNome" },
    { header: "Item", accessor: "itemDescricao" },
    { header: "Nível da atividade", accessor: "nivelAtividade" },
    { header: "Data do Apontamento", accessor: "dataApontamento" },
    { header: "Hora início", accessor: "horaInicio" },
    { header: "Hora fim", accessor: "horaFim" },
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