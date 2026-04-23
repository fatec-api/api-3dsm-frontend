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
        if (!projetoFiltro || projetoFiltro === "all") return apontamentos;

        const projetoSelecionado = projetos.find((p: any) => 
            p.id === projetoFiltro || p.nomeProjeto === projetoFiltro || p.nome === projetoFiltro || p.projeto === projetoFiltro
        );

        if (projetoSelecionado) {
            const nomeProjeto = projetoSelecionado.nomeProjeto ?? projetoSelecionado.nome ?? projetoSelecionado.projeto;
            return apontamentos.filter((a) => a.projeto === nomeProjeto);
        }
        return apontamentos.filter((a) => a.projeto === projetoFiltro);
    }, [apontamentos, projetoFiltro, projetos]);

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
                        {filteredApontamentos.length === 0 ? (
                            <tr>
                                <td colSpan={9}>
                                    <div role="alert" className="alert alert-info alert-soft h-15">
                                        <p className="text-lg">Nenhum apontamento encontrado.</p>
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            filteredApontamentos.map((apontamento) => (
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
            </div>
        </div>
    );
}