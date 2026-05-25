import { useEffect, useState, useMemo } from "react";
import type { Projeto } from "../pages/TelaListaProjetos";

interface FiltrosListagemProjetosProps {
    projetos: Projeto[];
    onFilterChange: (filtros: {
        nome: string;
        progresso: string;
        statusProjeto: string;
        tipoProjeto: string;
        cliente: string;
        visualizacaoFinanceira: boolean; // 1. Adicionado no contrato da função
    }) => void;
}

export default function FiltrosListagemProjetos({ projetos, onFilterChange }: FiltrosListagemProjetosProps) {
    const [cliente, setCliente] = useState("");
    const [tipoProjeto, setTipoProjeto] = useState("");
    const [statusProjeto, setStatusProjeto] = useState("");
    const [progresso, setProgresso] = useState("");
    const [nome, setNome] = useState("");
    const [visualizacaoFinanceira, setVisualizacaoFinanceira] = useState(false);

    const temFiltroAtivo = nome !== "" || cliente !== "" || tipoProjeto !== "" || statusProjeto !== "" || progresso !== "";

    const limparFiltros = () => {
        setNome("");
        setCliente("");
        setTipoProjeto("");
        setStatusProjeto("");
        setProgresso("");
    };

    const getProgresso = (projeto: Projeto): string => {
        if (!projeto.horasPrevistasTotal) return "Sem previsão";

        const percentualConsumo =
            (projeto.horasRealizadasTotal / projeto.horasPrevistasTotal) * 100;

        if (percentualConsumo <= 75) return "Normal";
        if (percentualConsumo <= 100) return "Crítico";
        return "Atrasado";
    };

    const progressos = useMemo(() => {
        const projetosComProgresso = projetos.map(p => ({
            ...p,
            progresso: getProgresso(p)
        }));
        return [...new Set(projetosComProgresso.map(p => p.progresso))];
    }, [projetos]);

    const clientes = useMemo(() => {
        // Corrigido para p.nomeCliente para bater com a interface do seu arquivo principal
        return [...new Set(projetos.map(p => p.nomeCliente).filter(Boolean))];
    }, [projetos]);

    // 2. Adicionado 'visualizacaoFinanceira' na lista de dependências e no envio do objeto
    useEffect(() => {
        onFilterChange({ nome, progresso, statusProjeto, tipoProjeto, cliente, visualizacaoFinanceira });
    }, [nome, progresso, statusProjeto, tipoProjeto, cliente, visualizacaoFinanceira, onFilterChange]);

    return (
        <div className="flex flex-col md:flex-row items-center justify-center p-5 mb-4 gap-4">

            {/* SEARCH MENOR */}
            <div>
                <label className="input border border-base-content/20 rounded-md p-2 text-sm w-64 flex items-center gap-2">
                    <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
                            <circle cx="11" cy="11" r="8"></circle>
                            <path d="m21 21-4.3-4.3"></path>
                        </g>
                    </svg>

                    <input
                        type="search"
                        className="grow"
                        placeholder="Pesquisar por nome"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                    />
                </label>
            </div>

            {/* FILTROS */}
            <select className="select select-bordered w-40"
                value={progresso}
                onChange={(e) => setProgresso(e.target.value)}
            >
                <option value="">Progresso</option>
                {progressos.map((p) => (
                    <option key={p} value={p}>{p}</option>
                ))}
            </select>

            <select className="select select-bordered w-40"
                value={statusProjeto}
                onChange={(e) => setStatusProjeto(e.target.value)}
            >
                <option value="">Status</option>
                <option value="Desenvolvimento">Desenvolvimento</option>
                <option value="Andamento">Andamento</option>
                <option value="Concluida">Concluído</option>
            </select>

            <select className="select select-bordered w-40"
                value={tipoProjeto}
                onChange={(e) => setTipoProjeto(e.target.value)}
            >
                <option value="">Tipo</option>
                <option value="Alocacao">Alocação</option>
                <option value="Hora_Fechada">Hora Fechada</option>
            </select>

            <select className="select select-bordered w-40"
                value={cliente}
                onChange={(e) => setCliente(e.target.value)}
            >
                <option value="">Cliente</option>
                {clientes.map((c) => (
                    <option key={c} value={c}>{c}</option>
                ))}
            </select>

            {/* AÇÕES + TOGGLE */}
            <div className="flex items-center gap-4 ml-2">

                <button
                    type="button"
                    onClick={limparFiltros}
                    disabled={!temFiltroAtivo}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors
                    ${temFiltroAtivo
                            ? "bg-base-300 text-base-content hover:bg-base-200 cursor-pointer"
                            : "bg-base-200 text-base-content/40 cursor-not-allowed"
                        }`}
                >
                    Limpar Filtros
                </button>

                {/* 3. TOGGLE CORRIGIDO (Alinhamento visual de cores e movimento da bolinha) */}
                <div className="flex items-center gap-3">
                    <span className={`text-sm font-medium transition-colors ${!visualizacaoFinanceira ? "text-base-content font-bold" : "text-base-content/50"}`}>
                        Projeto
                    </span>

                    <button
                        type="button"
                        onClick={() => setVisualizacaoFinanceira(!visualizacaoFinanceira)}
                        className={`relative w-14 h-7 rounded-full transition-all duration-300
                        ${visualizacaoFinanceira ? "bg-primary" : "bg-base-300"}`}
                    >
                        <div
                            className={`absolute top-1 left-1 w-5 h-5 rounded-full bg-white shadow-md
                            transition-transform duration-300
                            ${visualizacaoFinanceira ? "translate-x-7" : "translate-x-0"}`}
                        />
                    </button>

                    <span className={`text-sm font-medium transition-colors ${visualizacaoFinanceira ? "text-base-content font-bold" : "text-base-content/50"}`}>
                        Financeiro
                    </span>
                </div>

            </div>
        </div>
    );
}