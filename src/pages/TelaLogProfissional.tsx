import { useEffect, useState } from "react";
import Header from "../shared/components/Header";
import { useParams } from "react-router-dom";
// import { listarApontamentosUsuarios} from "../services/apontamentoService";
// import { listarItensPorProfissional } from "../services/ItemService";
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
  
  // 1. SOLUÇÃO: Prefixamos com '_' para o TS ignorar o aviso de "não lido"
  const [erro, _setErro] = useState<string | null>(null);
  const [sucesso, setSucesso] = useState<string | null>(null);
  const { id: _id } = useParams<{ id: string }>();
  
  const [paginaAtual, setPaginaAtual] = useState(1);
  const itensPorPagina = 15;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [logSelecionado, setLogSelecionado] = useState<Log | null>(null);

  /*useEffect(() => {
    const fetchLogs = async () => {
      if (!_id) return;
      try {
        setLoading(true);
        // _setErro(null); ...
      } catch (error) {
        // _setErro("Erro...");
      }
    };
    fetchLogs();
  }, [_id]); */

  useEffect(() => {
    const mockLogs: Log[] = [
      { id: 1, projeto: "GSWProj1", atividade: "Implementação API", nivel: "Análise", data: "2026-04-10", inicio: "08:00", fim: "12:00", status: "PENDENTE", justificativa: "-" },
      { id: 2, projeto: "GSWProj1", atividade: "Correção de bug", nivel: "Desenvolvimento", data: "2026-04-09", inicio: "13:00", fim: "17:00", status: "APROVADO", justificativa: "-" },
      { id: 3, projeto: "GSWProj2", atividade: "Refatoração", nivel: "Teste", data: "2026-04-08", inicio: "09:00", fim: "11:00", status: "REPROVADO", justificativa: "Horas inconsistentes" },
      { id: 4, projeto: "GSWProj1", atividade: "Documentação técnica", nivel: "Análise", data: "2026-04-07", inicio: "10:00", fim: "12:00", status: "PENDENTE", justificativa: "-" },
      { id: 5, projeto: "GSWProj3", atividade: "Implementação Frontend", nivel: "Desenvolvimento", data: "2026-04-06", inicio: "08:00", fim: "12:00", status: "APROVADO", justificativa: "-" },
      { id: 6, projeto: "GSWProj2", atividade: "Testes unitários", nivel: "Teste", data: "2026-04-05", inicio: "13:00", fim: "16:00", status: "REPROVADO", justificativa: "Cobertura insuficiente" },
      { id: 7, projeto: "GSWProj1", atividade: "Ajuste de layout", nivel: "Desenvolvimento", data: "2026-04-04", inicio: "09:00", fim: "11:00", status: "PENDENTE", justificativa: "-" },
      { id: 8, projeto: "GSWProj4", atividade: "Reunião com cliente", nivel: "Análise", data: "2026-04-03", inicio: "14:00", fim: "16:00", status: "APROVADO", justificativa: "-" },
      { id: 9, projeto: "GSWProj2", atividade: "Correção backend", nivel: "Desenvolvimento", data: "2026-04-02", inicio: "10:00", fim: "13:00", status: "REPROVADO", justificativa: "Erro não reproduzido" },
      { id: 10, projeto: "GSWProj3", atividade: "Deploy aplicação", nivel: "Teste", data: "2026-04-01", inicio: "15:00", fim: "18:00", status: "PENDENTE", justificativa: "-" },
      { id: 11, projeto: "GSWProj1", atividade: "Refatoração código", nivel: "Desenvolvimento", data: "2026-03-31", inicio: "08:00", fim: "12:00", status: "APROVADO", justificativa: "-" },
      { id: 12, projeto: "GSWProj4", atividade: "Análise de requisitos", nivel: "Análise", data: "2026-03-30", inicio: "09:00", fim: "11:00", status: "PENDENTE", justificativa: "-" },
      { id: 13, projeto: "GSWProj2", atividade: "Criação de testes", nivel: "Teste", data: "2026-03-29", inicio: "13:00", fim: "17:00", status: "REPROVADO", justificativa: "Faltou cenário" },
      { id: 14, projeto: "GSWProj3", atividade: "Integração API", nivel: "Desenvolvimento", data: "2026-03-28", inicio: "10:00", fim: "12:00", status: "APROVADO", justificativa: "-" },
      { id: 15, projeto: "GSWProj1", atividade: "Correção UI", nivel: "Desenvolvimento", data: "2026-03-27", inicio: "14:00", fim: "17:00", status: "PENDENTE", justificativa: "-" },
      { id: 16, projeto: "GSWProj4", atividade: "Planejamento sprint", nivel: "Análise", data: "2026-03-26", inicio: "09:00", fim: "11:00", status: "APROVADO", justificativa: "-" },
      { id: 17, projeto: "GSWProj2", atividade: "Debug sistema", nivel: "Desenvolvimento", data: "2026-03-25", inicio: "11:00", fim: "15:00", status: "REPROVADO", justificativa: "Erro persistente" },
      { id: 18, projeto: "GSWProj3", atividade: "Validação final", nivel: "Teste", data: "2026-03-24", inicio: "13:00", fim: "16:00", status: "PENDENTE", justificativa: "-" },
    ];

    const logsOrdenados = mockLogs.sort((a, b) => {
      return new Date(b.data).getTime() - new Date(a.data).getTime();
    });

    setLogs(logsOrdenados);
    setLoading(false);
  }, []);

  const handleEditar = (id: number) => {
    const item = logs.find(l => l.id === id);
    if (item) {
      setLogSelecionado(item);
      setIsModalOpen(true);
    }
  };

  const handleSalvarEdicao = (dadosAtualizados: any) => {
    setLogs(prev => prev.map(log => 
      log.id === Number(dadosAtualizados.id) ? { ...log, ...dadosAtualizados, atividade: dadosAtualizados.item, inicio: dadosAtualizados.horaInicio, fim: dadosAtualizados.horaFim } : log
    ));
    setIsModalOpen(false);
    
    
    setSucesso("Alterações salvas com sucesso!");
    setTimeout(() => setSucesso(null), 3000);
  };

  const inicio = (paginaAtual - 1) * itensPorPagina;
  const fim = inicio + itensPorPagina;
  const logsPaginamento = logs.slice(inicio, fim);
  const totalPaginas = Math.ceil(logs.length / itensPorPagina);

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
                  {logsPaginamento.map((row) => {
                    const isEditavel = row.status === "PENDENTE";
                    const badgeColor = row.status === "PENDENTE" ? "badge-warning" : row.status === "APROVADO" ? "badge-success" : "badge-error";
                    return (
                      <tr key={row.id} className="hover">
                        <td>{row.projeto}</td>
                        <td>{row.atividade}</td>
                        <td>{row.nivel}</td>
                        <td>{row.data}</td>
                        <td>{row.inicio}</td>
                        <td>{row.fim}</td>
                        <td><span className={`badge ${badgeColor}`}>{row.status}</span></td>
                        <td>{row.justificativa || "-"}</td>
                        <td className="text-center">
                          <button
                            className={`btn btn-sm btn-circle ${isEditavel ? "btn-ghost" : "btn-disabled"}`}
                            onClick={() => handleEditar(row.id)}
                            disabled={!isEditavel}
                          >
                            <FaPencilAlt size={14} />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {erro && <div className="alert alert-error mt-4">{erro}</div>}
          {sucesso && <div className="alert alert-success mt-4">{sucesso}</div>}

          <div className="flex justify-center mt-8">
            <div className="join">
              <button className="join-item btn btn-sm" onClick={() => setPaginaAtual(p => Math.max(p - 1, 1))}>«</button>
              <button className="join-item btn btn-sm btn-active">Página {paginaAtual}</button>
              <button className="join-item btn btn-sm" onClick={() => setPaginaAtual(p => Math.min(p + 1, totalPaginas))}>»</button>
            </div>
          </div>
        </div>
      </div>

      <ModalEditarApontamento 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSalvarEdicao}
        apontamento={logSelecionado ? {
            id: String(logSelecionado.id),
            projeto: logSelecionado.projeto,
            item: logSelecionado.atividade,
            data: logSelecionado.data,
            horaInicio: logSelecionado.inicio,
            horaFim: logSelecionado.fim,
            observacao: logSelecionado.justificativa || ""
        } : null}
      />
    </div>
  );
}