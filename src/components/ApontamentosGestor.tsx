import { useEffect, useMemo, useState } from "react";
import { listarApontamentosPorProjeto } from "../services/apontamentoService";
import { listarProjetos } from "../services/projectService";
import { listarItensPorProfissional } from "../services/ItemService";

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

export default function ApontamentosGestor({
    projetoFiltro = "all",
    onSelectionChange
}: ApontamentosGestorProps) {

    const [apontamentos, setApontamentos] = useState<Apontamento[]>([]);
    const [selectedApontamentos, setSelectedApontamentos] = useState<Set<string>>(new Set());
    const [paginaAtual, setPaginaAtual] = useState(1);
    const itensPorPagina = 15;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [apontamentosResp, projetosResp, itensResp] = await Promise.all([
                    listarApontamentosPorProjeto(projetoFiltro),
                    listarProjetos(),
                    listarItensPorProfissional("a8590c02-2ebd-4674-9711-dd5e8de7fcf7")
                ]);

                const projetosArr = Array.isArray(projetosResp) ? projetosResp : [];
                const itensArr = Array.isArray(itensResp) ? itensResp : [];
                const apontamentosArr = Array.isArray(apontamentosResp) ? apontamentosResp : [];

                const merged = apontamentosArr.map((a: any, index: number) => {
                    const item = itensArr.find((i: any) =>
                        String(i.id) === String(a.itemId)
                    );
                    const projeto = projetosArr.find((p: any) =>
                        String(p.id) === String(item?.projetoId || a.projetoId)
                    );

                    return {
                        id: String(a.id || index),

                        usuario:
                            item?.usuarioNomes?.[0] ||
                            a.usuarioNome ||
                            a.usuarioId ||
                            "Desconhecido",
                        projeto:
                            item?.projetoNome ||
                            projeto?.nomeProjeto ||
                            "Projeto não identificado",
                        item:
                            item?.descricao ||
                            a.itemDescricao ||
                            "Sem descrição",
                        nivel:
                            item?.nivelAtividade ||
                            a.nivel ||
                            "N/A",

                        data:
                            a.dataApontamento?.split("T")[0] ||
                            a.data ||
                            "",

                        inicio: a.horaInicio || "",
                        fim: a.horaFim || "",
                        status: a.status || "PENDENTE"
                    };
                });

                setApontamentos(merged);

            } catch (error) {
                console.error("Erro ao buscar dados:", error);
            }
        };

        fetchData();
    }, [projetoFiltro]);
    useEffect(() => {
        if (onSelectionChange) {
            const selecionados = apontamentos.filter(a =>
                selectedApontamentos.has(a.id)
            );
            onSelectionChange(selecionados);
        }
    }, [selectedApontamentos, apontamentos, onSelectionChange]);

    const handleCheckboxChange = (id: string, checked: boolean) => {
        setSelectedApontamentos(prev => {
            const newSet = new Set(prev);
            if (checked) newSet.add(id);
            else newSet.delete(id);
            return newSet;
        });
    };

    const filtered = useMemo(() => {
        const pendentes = apontamentos.filter(a => a.status === "PENDENTE");

        if (projetoFiltro === "all") return pendentes;

        return pendentes.filter(a =>
            a.projeto === projetoFiltro
        );
    }, [apontamentos, projetoFiltro]);

    const inicio = (paginaAtual - 1) * itensPorPagina;
    const paginados = filtered.slice(inicio, inicio + itensPorPagina);
    const totalPaginas = Math.ceil(filtered.length / itensPorPagina);

    return (
        <div className="overflow-x-auto">
            <table className="table table-zebra table-lg">
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
                        <th>Status</th>
                    </tr>
                </thead>

                <tbody>
                    {paginados.length === 0 ? (
                        <tr>
                            <td colSpan={9}>
                                <div className="alert alert-info">
                                    Nenhum apontamento encontrado
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
                                        onChange={(e) =>
                                            handleCheckboxChange(a.id, e.target.checked)
                                        }
                                    />
                                </td>
                                <td>{a.usuario}</td>
                                <td>{a.projeto}</td>
                                <td>{a.item}</td>
                                <td>{a.nivel}</td>
                                <td>{a.data}</td>
                                <td>{a.inicio}</td>
                                <td>{a.fim}</td>
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
                            onClick={() =>
                                setPaginaAtual(p => Math.max(p - 1, 1))
                            }
                        >
                            «
                        </button>

                        <button className="join-item btn btn-sm">
                            {paginaAtual} / {totalPaginas}
                        </button>

                        <button
                            className="join-item btn btn-sm"
                            onClick={() =>
                                setPaginaAtual(p =>
                                    Math.min(p + 1, totalPaginas)
                                )
                            }
                        >
                            »
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}