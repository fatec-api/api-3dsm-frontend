import { useEffect, useMemo, useState } from "react";
import { listarApontamentosPendentesParaGestor } from "../services/apontamentoService";

type Apontamento = {
    id: string;
    usuarioId: string;
    usuario: string;
    projeto: string;
    projetoId: string;
    item: string;
    nivel: string;
    data: string;
    inicio: string;
    fim: string;
    observacao:string;
    status: string;
};

type ApontamentosGestorProps = {
    gestorId: string;
    projetoFiltro?: string;
    onSelectionChange?: (selectedItems: Apontamento[]) => void;
    refreshKey?: number;
};

export default function ApontamentosGestor({
    gestorId,
    projetoFiltro = "all",
    onSelectionChange,
    refreshKey,
}: ApontamentosGestorProps) {
    const [apontamentos, setApontamentos] = useState<Apontamento[]>([]);
    const [selectedApontamentos, setSelectedApontamentos] = useState<Set<string>>(new Set());
    const [paginaAtual, setPaginaAtual] = useState(1);

    const itensPorPagina = 15;

    useEffect(() => {
        if (!gestorId) return;
        setPaginaAtual(1);
        setSelectedApontamentos(new Set());

        const fetchData = async () => {
            try {
                const data = await listarApontamentosPendentesParaGestor(gestorId);
                const mapped: Apontamento[] = data.map((a: any, index: number) => ({
                    id: String(a.id ?? index),
                    usuarioId: String(a.usuarioId ?? ""),
                    usuario: a.usuarioNome || a.usuarioId || "Desconhecido",
                    projetoId: String(a.projetoId ?? ""),
                    projeto: a.projetoNome || "Projeto não identificado",
                    item: a.itemDescricao || "Sem descrição",
                    nivel: a.nivelAtividade || "N/A",
                    data: a.dataApontamento?.split(" ")[0] ?? "",
                    inicio: a.horaInicio ?? "",
                    fim: a.horaFim ?? "",
                    observacao: a.observacao,
                    status: a.status ?? "PENDENTE",
                }));
                setApontamentos(mapped);
            } catch (error) {
                console.error("[ERROR] Falha ao buscar apontamentos:", error);
            }
        };

        fetchData();
    }, [gestorId, refreshKey]);

    useEffect(() => {
        if (onSelectionChange) {
            onSelectionChange(apontamentos.filter(a => selectedApontamentos.has(a.id)));
        }
    }, [selectedApontamentos, apontamentos, onSelectionChange]);

    const filtered = useMemo(() => {
        if (projetoFiltro === "all") return apontamentos;
        return apontamentos.filter(a => a.projetoId === projetoFiltro);
    }, [apontamentos, projetoFiltro]);

    const inicio = (paginaAtual - 1) * itensPorPagina;
    const paginados = filtered.slice(inicio, inicio + itensPorPagina);
    const totalPaginas = Math.ceil(filtered.length / itensPorPagina);

    const handleCheckboxChange = (id: string, checked: boolean) => {
        setSelectedApontamentos(prev => {
            const newSet = new Set(prev);
            if (checked) newSet.add(id);
            else newSet.delete(id);
            return newSet;
        });
    };

    return (
        <div className="overflow-x-auto rounded-2xl">
            <table className="table table-zebra table-md">
                <thead>
                    <tr>
                        <th></th>
                        <th>Usuário</th>
                        <th>Projeto</th>
                        <th>Atividade</th>
                        <th>Nível</th>
                        <th>Data</th>
                        <th>Início</th>
                        <th>Fim</th>
                        <th>Observação</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {paginados.length === 0 ? (
                        <tr>
                            <td colSpan={9}>
                                <div role="alert" className="alert alert-info alert-soft flex items-center justify-around h-15">
                                    <p className="text-lg">Nenhum apontamento encontrado.</p>
                                </div>
                            </td>
                        </tr>
                    ) : (
                        paginados.map(a => (
                            <tr key={a.id}>
                                <td>
                                    <input
                                        type="checkbox"
                                        className="checkbox"
                                        checked={selectedApontamentos.has(a.id)}
                                        onChange={(e) => handleCheckboxChange(a.id, e.target.checked)}
                                    />
                                </td>
                                <td>{a.usuario}</td>
                                <td>{a.projeto}</td>
                                <td>{a.item}</td>
                                <td>{a.nivel}</td>
                                <td>{a.data}</td>
                                <td>{a.inicio}</td>
                                <td>{a.fim}</td>
                                <td>{a.observacao}</td>
                                <td>{a.status}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>

            {totalPaginas > 1 && (
                <div className="flex justify-center mt-4">
                    <div className="join">
                        <button
                            className="join-item btn btn-sm"
                            onClick={() => setPaginaAtual(p => Math.max(p - 1, 1))}
                        >«</button>
                        <button className="join-item btn btn-sm">
                            {paginaAtual} / {totalPaginas}
                        </button>
                        <button
                            className="join-item btn btn-sm"
                            onClick={() => setPaginaAtual(p => Math.min(p + 1, totalPaginas))}
                        >»</button>
                    </div>
                </div>
            )}
        </div>
    );
}