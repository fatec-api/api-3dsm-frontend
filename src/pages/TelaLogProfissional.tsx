import { useEffect, useState } from "react";
import Header from "../shared/components/Header";
import Tabela from "../shared/components/Tabela";

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

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        
        const data: Log[] = [
          {
            projeto: "Projeto A",
            item: "Item 1",
            nivel: "Alto",
            data: "30/03/2026",
            inicio: "08:00",
            fim: "12:00",
          },
        ];

        setLogs(data);
      } catch (error) {
        console.error("Erro ao buscar logs", error);
      }
    };

    fetchLogs();
  }, []);

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