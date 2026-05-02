import { useEffect, useState, useMemo } from "react";
import type { Projeto } from "../pages/TelaListaProjetos";

interface FiltrosListagemProjetosProps {
    projetos: Projeto[];
    onFilterChange: (filtros: {
        nome: string; // Adicionado
        progresso: string;
        statusProjeto: string;
        tipoProjeto: string;
        cliente: string;
    }) => void;
}

export default function FiltrosListagemProjetos({ projetos, onFilterChange }: FiltrosListagemProjetosProps) {
    const [cliente, setCliente] = useState("");
    const [tipoProjeto, setTipoProjeto] = useState("");
    const [statusProjeto, setStatusProjeto] = useState("");
    const [progresso, setProgresso] = useState("");
    const [nome, setNome] = useState("");

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
        return [...new Set(projetos.map(p => p.cliente).filter(Boolean))];
    }, [projetos]);

    useEffect(() => {
        onFilterChange({ nome, progresso, statusProjeto, tipoProjeto, cliente });
    }, [nome, progresso, statusProjeto, tipoProjeto, cliente, onFilterChange]);

    return (
        <div className="flex flex-col md:flex-row items-center justify-center p-5 mb-4">
            <div>
                <label className="input border border-gray-300 rounded-md p-2 text-sm w-100">
                    <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <g
                            strokeLinejoin="round"
                            strokeLinecap="round"
                            strokeWidth="2.5"
                            fill="none"
                            stroke="currentColor"
                        >
                            <circle cx="11" cy="11" r="8"></circle>
                            <path d="m21 21-4.3-4.3"></path>
                        </g>
                    </svg>
                    <input
                    type="search"
                    className="grow"
                    placeholder="Pesquisar por nome"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}/>
                </label>
            </div>
            <div className="flex items-center space-x-2 p-2">
                <select
                    id="filtro-progresso"
                    className="border border-gray-300 rounded-md p-2 text-sm focus:outline-none 
                    focus:ring-2 focus:ring-gray-500 w-40"
                    value={progresso}
                    defaultValue={"Progresso"}
                    onChange={(e) => setProgresso(e.target.value)}
                >
                    <option disabled value="">Progresso</option>
                    {progressos.map((p) => (
                        <option key={p} value={p}>{p}</option>
                    ))}
                </select>
            </div>
            <div className="flex items-center space-x-2 p-2">
                <select
                    id="filtro-status"
                    className="border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-500 w-40"
                    value={statusProjeto}
                    defaultValue={"Status"}
                    onChange={(e) => setStatusProjeto(e.target.value)}
                >
                    <option disabled value="">Status</option>
                    <option value="Desenvolvimento">Desenvolvimento</option>
                    <option value="Andamento">Andamento</option>
                    <option value="Concluida">Concluído</option>
                </select>
            </div>
            <div className="flex items-center space-x-2 p-2">
                <select
                    id="filtro-tipo"
                    className="border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-500 w-40"
                    value={tipoProjeto}
                    defaultValue={"Tipo"}
                    onChange={(e) => setTipoProjeto(e.target.value)}
                >
                    <option disabled value="">Tipo</option>
                    <option value="Alocacao">Alocação</option>
                    <option value="Hora_Fechada">Hora Fechada</option>
                </select>
            </div>
            <div className="flex items-center space-x-2 p-2">
                <select
                    id="filtro-cliente"
                    className="border border-gray-300 rounded-md p-2 text-sm focus:outline-none 
                    focus:ring-2 focus:ring-gray-500 w-40"
                    value={cliente}
                    defaultValue={"Cliente"}
                    onChange={(e) => setCliente(e.target.value)}
                >
                    <option disabled value="">Cliente</option>
                    {clientes.map((c) => (
                        <option key={c} value={c}>{c}</option>
                    ))}
                </select>
            </div>
            <button
                onClick={limparFiltros}
                disabled={!temFiltroAtivo}
                className={`ml-4 px-4 py-2 rounded-md text-sm font-medium transition-colors
                    ${temFiltroAtivo
                        ? "bg-gray-300 text-gray-800 hover:bg-gray-200 cursor-pointer"
                        : "bg-gray-100 text-gray-400 cursor-not-allowed"
                    }`}
            >
                Limpar Filtros
            </button>
        </div>
    );
}