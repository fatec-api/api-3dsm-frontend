import { useEffect, useState } from "react";
import Header from "../shared/components/Header";
import { atualizarApontamento } from "../services/apontamentoService";
import { FaPencilAlt } from "react-icons/fa";
import ModalEditarApontamento from "../components/ModalEditarApontamento";

interface Log {
  id: number;
  projeto: string;
  atividade: string;
  nivel: string;
  data: string;
  inicio: string;
  fim: string;
  status: "PENDENTE" | "APROVADO" | "REPROVADO";
  justificativa?: string;
}

export default function TelaLogProfissional() {
  const [logs, setLogs] = useState<Log[]>([]);
  const [loading, setLoading] = useState(true);
  const [sucesso, setSucesso] = useState<string | null>(null);
  const [erro, setErro] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [logSelecionado, setLogSelecionado] = useState<Log | null>(null);
  const [isSaving, setIsSaving] = useState(false);

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

    const ordenados = [...mockLogs].sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime());
    setLogs(ordenados);
    setLoading(false);
  }, []);

  const handleEditar = (id: number) => {
    const item = logs.find(l => l.id === id);
    if (item) {
      setLogSelecionado(item);
      setIsModalOpen(true);
    }
  };

  const handleSalvarEdicao = async (dadosAtualizados: any) => {
    setIsSaving(true);
    setErro(null);
    setTimeout(async () => {
        try {
              /*
              //  Descomente este bloco quando o backend Java estiver online
              try {
                const payload = { 
                  ...dadosAtualizados, 
                  status: "PENDENTE",
                  atividade: dadosAtualizados.item 
                };
                
                // Chama a função do service que faz a comunicação via rede
                await atualizarApontamento(dadosAtualizados.id, payload);
                
                // A atualização do estado (setLogs) ocorre apenas após a confirmação do servidor
              } catch (error) {
                setErro("Erro ao salvar alterações no servidor. Tente novamente.");
                setTimeout(() => setErro(null), 4000);
              } finally {
                setIsSaving(false);
              }
              */

            setLogs(prev => prev.map(log => 
                String(log.id) === String(dadosAtualizados.id) 
                ? { 
                    ...log, 
                    ...dadosAtualizados, 
                    atividade: dadosAtualizados.item, 
                    inicio: dadosAtualizados.horaInicio, 
                    fim: dadosAtualizados.horaFim, 
                    status: "PENDENTE" 
                  } 
                : log
            ));

            setSucesso("Apontamento atualizado e enviado para análise!");
            setIsModalOpen(false);
        } catch (e) {
            setErro("Falha ao salvar no servidor.");
        } finally {
            setIsSaving(false);
            setTimeout(() => setSucesso(null), 3500);
        }
    }, 400);
  };

  return (
    <div className="min-h-screen bg-base-100 text-black">
      <Header />
      
      {}
      <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[1000] w-full max-w-md px-4 pointer-events-none">
        {sucesso && (
          <div className="alert alert-success shadow-2xl flex justify-center font-bold border border-success animate-in fade-in slide-in-from-top-4 duration-300 pointer-events-auto">
            <span>{sucesso}</span>
          </div>
        )}
        {erro && (
          <div className="alert alert-error shadow-2xl flex justify-center font-bold animate-in fade-in slide-in-from-top-4 duration-300 pointer-events-auto">
            <span>{erro}</span>
          </div>
        )}
      </div>

      <div className="flex justify-center mt-24 px-6 pb-12">
        <div className="w-full max-w-7xl bg-base-200 rounded-2xl p-8 shadow-md relative">
          
          <h1 className="text-center text-2xl font-semibold mb-8">Meus Últimos Apontamentos</h1>

          <div className="overflow-x-auto">
            <table className="table table-zebra w-full text-black">
              <thead>
                <tr className="text-gray-600">
                  <th>Projeto</th>
                  <th>Atividade</th>
                  <th>Data</th>
                  <th>Início</th>
                  <th>Fim</th>
                  <th>Status</th>
                  <th className="text-center">Ações</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan={7} className="text-center py-10"><span className="loading loading-spinner"></span></td></tr>
                ) : (
                  logs.map((row) => {
                    const isEditavel = row.status === "PENDENTE";
                    const statusClass = row.status === "PENDENTE" ? "badge-warning" : row.status === "APROVADO" ? "badge-success" : "badge-error";
                    
                    return (
                      <tr key={row.id} className="hover transition-all">
                        <td>{row.projeto}</td>
                        <td>{row.atividade}</td>
                        <td>{row.data}</td>
                        <td>{row.inicio}</td>
                        <td>{row.fim}</td>
                        <td><span className={`badge ${statusClass} font-medium`}>{row.status}</span></td>
                        <td className="text-center">
                          <button 
                            className={`btn btn-sm btn-circle ${isEditavel ? "btn-ghost" : "btn-disabled opacity-30"}`} 
                            onClick={() => handleEditar(row.id)} 
                            disabled={!isEditavel}
                            title={isEditavel ? "Editar registro" : "Registros aprovados não podem ser alterados"}
                          >
                            <FaPencilAlt size={14} />
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <ModalEditarApontamento 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSave={handleSalvarEdicao} 
        isLoading={isSaving}
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