
import { useCallback, useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../shared/components/Header";
import { listarProjetosPorGestor } from "../services/projectService";
import { FaChevronRight, FaPencilAlt } from "react-icons/fa";
import FiltrosListagemProjetos from "../components/FiltrosListagemProjetos";
import { KeycloakContext } from "../contexts/KeycloakProvider";
import { listarApontamentos } from "../services/apontamentoService";
import { listarItens } from "../services/ItemService";
import ModalEditarProjeto from "../components/ModalEditarProjeto";
import type { Profissional } from "../components/ModalAlocarFuncionarioItem";
import { allocationService } from "../api/AllocationService";

export interface Projeto {
    id: number;
    nomeProjeto: string;
    gestorId: string;
    tipoProjeto: string;
    status: string;
    nomeCliente: string;
    horasPrevistasTotal: number;
    horasRealizadasTotal: number;
    horasPendentesTotal?: number;
    status_orcamento?: string;
    valorOrcamento?: number;
    custoRealTotal?: number;
}

export default function ListaProjetos() {
    const { getUsuario, temPermissao } = useContext(KeycloakContext);
    const usuario = getUsuario();
    const id = usuario?.id;

    const [projetos, setProjetos] = useState<Projeto[]>([]);
    const [projetoEditando, setProjetoEditando] = useState<Projeto | null>(null);
    const [todosProfissionais, setTodosProfissionais] = useState<Profissional[]>([]);
    const [loading, setLoading] = useState(true);
    const [erro, setErro] = useState(false);
    const [filtros, setFiltros] = useState({
        nome: "",
        progresso: "",
        status: "",
        tipoProjeto: "",
        nomeCliente: "",
    });

    const navigate = useNavigate();

    const calcularHorasRealizadasProjeto = async (projetoId: number) => {
        try {
            const [itens, apontamentos] = await Promise.all([
                listarItens(projetoId),
                listarApontamentos(),
            ]);

            const itemIds = itens.map((item: any) => item.id);

            const horas = apontamentos
                .filter(
                    (ap: any) =>
                        itemIds.includes(ap.itemId) && ap.status === "APROVADO"
                )
                .reduce((total: number, ap: any) => total + ap.horasLiquidas, 0);

            return horas;
        } catch (error) {
            console.error("Erro ao calcular horas:", error);
            return 0;
        }
    };

    const getProgresso = (projeto: Projeto): string => {
        if (!projeto.horasPrevistasTotal) return "Sem previsão";

        const percentualConsumo =
            (projeto.horasRealizadasTotal / projeto.horasPrevistasTotal) * 100;

        if (percentualConsumo <= 75) return "Normal";
        if (percentualConsumo <= 100) return "Crítico";
        return "Atrasado";
    };

    const projetosFiltrados = projetos.filter((projeto) => {
        const progressoProjeto = getProgresso(projeto);

        if (
            filtros.nome &&
            !projeto.nomeProjeto.toLowerCase().includes(filtros.nome.toLowerCase())
        ) {
            return false;
        }
        if (filtros.progresso && progressoProjeto !== filtros.progresso)
            return false;
        if (filtros.status && projeto.status !== filtros.status) return false;
        if (filtros.tipoProjeto && projeto.tipoProjeto !== filtros.tipoProjeto)
            return false;
        if (filtros.nomeCliente && projeto.nomeCliente !== filtros.nomeCliente)
            return false;

        return true;
    });

    const handleFilterChange = useCallback((novosFiltros: any) => {
        setFiltros({
            nome: novosFiltros.nome,
            progresso: novosFiltros.progresso,
            status: novosFiltros.statusProjeto,
            tipoProjeto: novosFiltros.tipoProjeto,
            nomeCliente: novosFiltros.cliente,
        });
    }, []);

    const loadData = useCallback(async () => {
        try {
            setLoading(true);
            setErro(false);

            const response = await listarProjetosPorGestor(id!);
            const data = response?.data ?? response;

            if (!Array.isArray(data)) {
                setProjetos([]);
                return;
            }

            const projetosComHoras = await Promise.all(
                data.map(async (proj: Projeto) => {
                    const horasRealizadas = await calcularHorasRealizadasProjeto(
                        proj.id
                    );
                    return { ...proj, horasRealizadasTotal: horasRealizadas };
                })
            );

            setProjetos(projetosComHoras);
        } catch (error) {
            console.error("Erro ao carregar projetos reais da API:", error);
            setErro(true);
            setProjetos([]);
        } finally {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        if (!id) return;
        loadData();
    }, [id, loadData]);

    useEffect(() => {
        allocationService
            .getProfessionalsByProject()
            .then(setTodosProfissionais)
            .catch((err) =>
                console.error("Erro ao carregar profissionais:", err)
            );
    }, []);

    const getCor = (projeto: Projeto) => {
        if (!projeto.horasPrevistasTotal) return "bg-base-300";

        const percentualConsumo =
            (projeto.horasRealizadasTotal / projeto.horasPrevistasTotal) * 100;

        if (percentualConsumo <= 75) return "bg-green-500";
        if (percentualConsumo <= 100) return "bg-yellow-400";
        return "bg-red-500";
    };

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center">
                <p className="text-lg">Carregando projetos...</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-screen">
            <Header />

            <FiltrosListagemProjetos
                projetos={projetos}
                onFilterChange={handleFilterChange}
            />

            {erro && (
                <div className="flex justify-center mb-4 px-10">
                    <div
                        role="alert"
                        className="alert alert-error max-w-xl text-sm p-3"
                    >
                        <span>
                            Não foi possível conectar ao servidor. Verifique sua
                            conexão.
                        </span>
                    </div>
                </div>
            )}

            <div className="flex gap-6 w-full justify-center flex-wrap">
                {projetosFiltrados.length === 0 ? (
                    <div role="alert" className="alert alert-info alert-soft h-15">
                        <p className="text-lg">Nenhum projeto encontrado.</p>
                    </div>
                ) : (
                    projetosFiltrados.map((projeto) => {
                        const cor = getCor(projeto);

                        return (
                            <div
                                key={projeto.id}
                                className="cursor-pointer"
                                onClick={() =>
                                    navigate(`/descricao-projeto/${projeto.id}`)
                                }
                            >
                                <div className="w-80 h-44 bg-base-100 rounded-2xl shadow-md border border-base-content/10 flex overflow-hidden transition-all duration-200 hover:shadow-md hover:-translate-y-[2px]">
                                    <div className={`w-3 flex-shrink-0 ${cor}`} />
                                    <div className="p-4 flex flex-col justify-between w-full">
                                        <div className="flex justify-between items-start">
                                            <h2 className="text-lg font-semibold">
                                                {projeto.nomeProjeto}
                                            </h2>
                                            <div className="flex flex-row items-center gap-8">
                                                {temPermissao("GESTOR") && (
                                                    <div
                                                        className="p-2 -m-2 cursor-pointer text-base-content/40 hover:text-base-content transition"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setProjetoEditando(
                                                                projeto
                                                            );
                                                        }}
                                                    >
                                                        <FaPencilAlt size={14} />
                                                    </div>
                                                )}
                                                <FaChevronRight className="text-base-content/40 transition" />
                                            </div>
                                        </div>

                                        <div className="text-sm space-y-1">
                                            <p>
                                                <b>Tipo:</b> {projeto.tipoProjeto}
                                            </p>
                                            <p>
                                                <b>Cliente:</b> {projeto.nomeCliente}
                                            </p>
                                            <p>
                                                <b>Status:</b> {projeto.status}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>

            <ModalEditarProjeto
                isOpen={!!projetoEditando}
                onClose={() => setProjetoEditando(null)}
                projetoId={projetoEditando?.id ?? 0}
                dadosAtuais={projetoEditando ?? undefined}
                todosProfissionais={todosProfissionais}
                onSucesso={loadData}
            />
        </div>
    );
}