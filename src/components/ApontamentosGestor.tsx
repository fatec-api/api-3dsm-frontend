import { useEffect, useMemo, useState } from "react";
import { listarApontamentosPorProjeto } from "../services/apontamentoService";
import { listarProjetos } from "../services/projectService";

type Apontamento = {
    id: string;
    usuario: string;
    projeto: string;
    item: string;
    nivel: string;
    data: string;
    inicio: string;
    fim: string;
    status: string;
};

type ApontamentosGestorProps = {
    projetoFiltro?: string;
    onSelectionChange?: (selectedItems: Apontamento[]) => void;
};

export default function ApontamentosGestor({ projetoFiltro = "all", onSelectionChange }: ApontamentosGestorProps) {
    const [apontamentos, setApontamentos] = useState<Apontamento[]>([]);
    const [projetos, setProjetos] = useState<any[]>([]);
    const [selectedApontamentos, setSelectedApontamentos] = useState<Set<string>>(new Set());
    const [paginaAtual, setPaginaAtual] = useState(1);
    const itensPorPagina = 15;

    useEffect(() => {
        const fetchLogs = async () => {
            try {
                const dados = await listarApontamentosPorProjeto();
                let listaProjetos: any[] = [];

                try {
                    listaProjetos = await listarProjetos();
                    setProjetos(listaProjetos);
                } catch (error) {
                    console.error("Erro ao buscar projetos:", error);
                    setProjetos([]);
                }

                const apontamentosComProjeto = dados.map((a: any, index: number) => {
                    const projeto = listaProjetos.find(
                        (p: any) => p.projeto === a.projeto || p.nome === a.projeto || p.nomeProjeto === a.projeto
                    );

                    return {
                        id: String(a.id || `apontamento-${index}`),
                        usuario: a.usuario,
                        projeto: a.projeto || projeto?.nome || projeto?.nomeProjeto || "Sem projeto",
                        item: a.item || a.itemDescricao || "",
                        nivel: a.nivel || a.nivelAtividade || "UNDEFINED",
                        data: a.data || a.dataApontamento || "",
                        inicio: a.inicio || a.horaInicio || "",
                        fim: a.fim || a.horaFim || "",
                        status: a.status
                    };
                });

                setApontamentos(apontamentosComProjeto);
            } catch (error) {
                console.error("Erro ao buscar apontamentos:", error);
            }
        };

        fetchLogs();
    }, []);
    useEffect(() => {
        if (onSelectionChange) {
            const selecionados = apontamentos.filter(a => selectedApontamentos.has(a.id));
            onSelectionChange(selecionados);
        }
    }, [selectedApontamentos, apontamentos, onSelectionChange]);

    const handleCheckboxChange = (apontamentoId: string, checked: boolean) => {
        setSelectedApontamentos(prev => {
            const newSet = new Set(prev);
            if (checked) newSet.add(apontamentoId);
            else newSet.delete(apontamentoId);
            return newSet;
        });
    };

    const filteredApontamentos = useMemo(() => {
        // Primeiro filtra por status Pendente
        const pendentes = apontamentos.filter((a) => a.status === "Pendente");
        
        if (!projetoFiltro || projetoFiltro === "all") return pendentes;

        const projetoSelecionado = projetos.find((p: any) =>
            p.id === projetoFiltro || p.nomeProjeto === projetoFiltro || p.nome === projetoFiltro || p.projeto === projetoFiltro
        );

        if (projetoSelecionado) {
            const nomeProjeto = projetoSelecionado.nomeProjeto ?? projetoSelecionado.nome ?? projetoSelecionado.projeto;
            return pendentes.filter((a) => a.projeto === nomeProjeto);
        }
        return pendentes.filter((a) => a.projeto === projetoFiltro);
    }, [apontamentos, projetoFiltro, projetos]);

    const inicio = (paginaAtual - 1) * itensPorPagina;
    const logsPaginados = filteredApontamentos.slice(inicio, inicio + itensPorPagina);
    const totalPaginas = Math.ceil(filteredApontamentos.length / itensPorPagina);

    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table table-zebra row- table-lg p-15">
                    <thead>
                        <tr className="text-lg">
                            <th></th>
                            <th>Usuário</th>
                            <th>Projeto</th>
                            <th>Atividade</th>
                            <th>Nível da Atividade</th>
                            <th>Data do Apontamento</th>
                            <th>Hora Ínicio</th>
                            <th>Hora Fim</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {logsPaginados.length === 0 ? (
                            <tr>
                                <td colSpan={9}>
                                    <div role="alert" className="alert alert-info alert-soft h-15 flex items-center justify-center">
                                        <p className="text-lg">Nenhum apontamento encontrado.</p>
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            logsPaginados.map((apontamento) => (
                                <tr key={apontamento.id} className="text-sm">
                                    <th className="p-1 text-center">
                                        <input
                                            type="checkbox"
                                            className="checkbox"
                                            checked={selectedApontamentos.has(apontamento.id)}
                                            onChange={(e) => handleCheckboxChange(apontamento.id, e.target.checked)}
                                        />
                                    </th>
                                    <td>{apontamento.usuario}</td>
                                    <td>{apontamento.projeto}</td>
                                    <td>{apontamento.item}</td>
                                    <td>{apontamento.nivel}</td>
                                    <td>{apontamento.data}</td>
                                    <td>{apontamento.inicio}</td>
                                    <td>{apontamento.fim}</td>
                                    <td>{apontamento.status}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
                {/* Paginação */}
                {totalPaginas > 1 && (
                    <div className="flex justify-center mb-5">
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
    );
}