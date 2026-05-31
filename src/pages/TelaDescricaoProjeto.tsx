import { useEffect, useState, useContext } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Card from "../shared/components/Card";
import Header from "../shared/components/Header";
import {
    listarItens,
    type NivelAtividade,
    vincularProfissionalItem,
} from "../services/ItemService";
import PaginaAlocacao from "./TelaDevAllocationTest";
import ModalAlocarFuncionarioItem, {
    type Profissional,
} from "../components/ModalAlocarFuncionarioItem";
import {
    listarEquipeProjeto,
    listarProjetoId,
} from "../services/projectService";
import {
    listarApontamentos,
    type MetricasAtividade,
} from "../services/apontamentoService";
import IndicadorProgresso from "../components/IndicadorProgresso";
import Botao from "../shared/components/Botao";
import { KeycloakContext } from "../contexts/KeycloakProvider";
import { FaMoneyBillWave, FaHandHoldingUsd } from "react-icons/fa";

const NIVEIS_BASE = ["ANALISE", "DESENVOLVIMENTO", "TESTE"];
const NOMES_ATIVIDADES: Record<string, string> = {
    ANALISE: "Análise",
    DESENVOLVIMENTO: "Desenvolvimento",
    TESTE: "Teste",
};

function formatarMoeda(valor: number): string {
    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    });
}

function getStatusSaldo(percentualSaldo: number) {
    if (percentualSaldo > 20) {
        return {
            cor: "#22c55e",
            borda: "border-green-500",
            texto: "text-green-600",
        };
    }

    if (percentualSaldo >= 1) {
        return {
            cor: "#eab308",
            borda: "border-yellow-400",
            texto: "text-yellow-500",
        };
    }

    return {
        cor: "#ef4444",
        borda: "border-red-500",
        texto: "text-red-500",
    };
}

function CircularProgressFinanceiro({
    percentualSaldo,
}: {
    percentualSaldo: number;
}) {
    const raio = 28;
    const circunferencia = 2 * Math.PI * raio;
    const percentualVisual = Math.min(Math.max(percentualSaldo, 0), 100);
    const offset = circunferencia - (percentualVisual / 100) * circunferencia;
    const status = getStatusSaldo(percentualSaldo);

    return (
        <div className="relative flex items-center justify-center w-16 h-16">
            <svg width="64" height="64" viewBox="0 0 64 64" className="-rotate-90">
                <circle
                    cx="32"
                    cy="32"
                    r={raio}
                    fill="none"
                    stroke="#e5e7eb"
                    strokeWidth="6"
                />
                <circle
                    cx="32"
                    cy="32"
                    r={raio}
                    fill="none"
                    stroke={status.cor}
                    strokeWidth="6"
                    strokeDasharray={circunferencia}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                />
            </svg>
            <span className="absolute text-xs font-semibold" style={{ color: status.cor }}>
                {Math.round(percentualSaldo)}%
            </span>
        </div>
    );
}

function CardsFinanceiros({ projeto }: { projeto: any }) {
    const orcamentoPrevisto: number = projeto?.valorOrcamento ?? 0;
    const custoRealAcumulado: number =
        projeto?.custoRealAcumulado ?? projeto?.custoRealTotal ?? 0;

    const saldoDisponivel = orcamentoPrevisto - custoRealAcumulado;
    const percentualSaldo = orcamentoPrevisto
        ? (saldoDisponivel / orcamentoPrevisto) * 100
        : 0;

    const status = getStatusSaldo(percentualSaldo);

    return (
        <div className="flex gap-6 flex-wrap">
            <div className="flex-1 min-w-[200px] card bg-base-100 border border-base-content/10 shadow-sm">
                <div className="card-body flex flex-row justify-between items-center py-4 px-5">
                    <div>
                        <p className="text-sm text-base-content/50 font-medium leading-tight">
                            Total do Orçamento <br /> Previsto
                        </p>
                        <p className="text-lg font-bold mt-1">
                            {formatarMoeda(orcamentoPrevisto)}
                        </p>
                    </div>
                    <FaMoneyBillWave className="text-base-content/20 text-4xl" />
                </div>
            </div>

            <div className="flex-1 min-w-[200px] card bg-base-100 border border-base-content/10 shadow-sm">
                <div className="card-body flex flex-row justify-between items-center py-4 px-5">
                    <div>
                        <p className="text-sm text-base-content/50 font-medium leading-tight">
                            Total do Custo Real <br /> Acumulado
                        </p>
                        <p className="text-lg font-bold mt-1">
                            {formatarMoeda(custoRealAcumulado)}
                        </p>
                    </div>
                    <FaHandHoldingUsd className="text-base-content/20 text-4xl" />
                </div>
            </div>

            <div
                className={`
                    flex-1
                    min-w-[200px]
                    card
                    bg-base-100
                    border-2
                    ${status.borda}
                    shadow-sm
                `}
            >
                <div className="card-body flex flex-row justify-between items-center py-4 px-5">
                    <div>
                        <p className="text-sm text-base-content/50 font-medium leading-tight">
                            Saldo Disponível
                        </p>
                        <p className={`text-lg font-bold mt-1 ${status.texto}`}>
                            {formatarMoeda(saldoDisponivel)}
                        </p>
                    </div>
                    <CircularProgressFinanceiro percentualSaldo={percentualSaldo} />
                </div>
            </div>
        </div>
    );
}

export default function DescricaoProjeto() {
    const { state } = useLocation();
    const navigate = useNavigate();
    const { id } = useParams();

    const { temPermissao } = useContext(KeycloakContext);

    const temAcessoFinanceiro = temPermissao(["FINANCEIRO", "GESTOR"]);
    const [visualizacaoFinanceira, setVisualizacaoFinanceira] = useState(false);

    const projetoState = state?.projeto;
    const [projeto, setProjeto] = useState<any>(projetoState);
    const [loadingProjeto, setLoadingProjeto] = useState(!projetoState);
    const [popupItem, setPopupItem] = useState<any | null>(null);
    const [selectedProfList, setSelectedProfList] = useState<Profissional[]>([]);
    const [itens, setItens] = useState<
        {
            id?: string;
            codigo: string;
            descricao: string;
            nivelAtividade: NivelAtividade;
            usuarioNomes: string[];
        }[]
    >([]);
    const [listaDeProfissionais, setListaDeProfissionais] = useState<Profissional[]>(
        []
    );
    const [metricas, setMetricas] = useState<MetricasAtividade[]>([]);
    const [loadingMetricas, setLoadingMetricas] = useState(false);
    const [modalLoading, setModalLoading] = useState(false);
    const [modalMessage, setModalMessage] = useState<{
        type: "success" | "error";
        text: string;
    } | null>(null);
    const [buscaProfissional, setBuscaProfissional] = useState("");
    const [buscaItem, setBuscaItem] = useState("");

    const profissionaisFiltrados = listaDeProfissionais.filter((prof) => {
        const termo = buscaProfissional.toLowerCase();
        return (
            prof.nomeUsuario?.toLowerCase().includes(termo) ||
            prof.email?.toLowerCase().includes(termo) ||
            prof.nivelExperiencia?.toLowerCase().includes(termo) ||
            prof.cargos?.toLowerCase().includes(termo) ||
            prof.valorHora?.toString().includes(termo)
        );
    });

    const calcularMetricas = async (projetoId: number) => {
        const [itens, apontamentos] = await Promise.all([
            listarItens(projetoId),
            listarApontamentos(),
        ]);

        const resultado: Record<string, any> = {};

        itens.forEach((item: any) => {
            const nivel = item.nivelAtividade.toUpperCase();

            if (!resultado[nivel]) {
                resultado[nivel] = {
                    nivelAtividade: nivel,
                    horasPrevistasAtiv: 0,
                    horasRealizadasAtiv: 0,
                };
            }

            resultado[nivel].horasPrevistasAtiv += item.previsaoHoras;

            const horasItem = apontamentos
                .filter(
                    (ap: any) => ap.itemId === item.id && ap.status === "APROVADO"
                )
                .reduce((sum: number, ap: any) => sum + ap.horasLiquidas, 0);

            resultado[nivel].horasRealizadasAtiv += horasItem;
        });

        return Object.values(resultado).map((m: any) => ({
            ...m,
            percentual: m.horasPrevistasAtiv
                ? (m.horasRealizadasAtiv / m.horasPrevistasAtiv) * 100
                : 0,
        }));
    };

    const itensFiltrados = itens.filter((item) => {
        const termo = buscaItem.toLowerCase();
        return (
            (item.usuarioNomes?.some((n) => n?.toLowerCase().includes(termo)) ||
                false) ||
            item.nivelAtividade?.toLowerCase().includes(termo) ||
            item.codigo?.toLowerCase().includes(termo) ||
            item.descricao?.toLowerCase().includes(termo)
        );
    });

    const carregarDadosProjeto = async () => {
        if (!id) return;

        try {
            const dadosProjeto = await listarProjetoId(id);
            setProjeto(dadosProjeto);

            const listaItens = await listarItens(id);
            setItens(Array.isArray(listaItens) ? [...listaItens] : []);

            const listaEquipe = await listarEquipeProjeto(id);
            setListaDeProfissionais([...listaEquipe]);

            setLoadingMetricas(true);
            const dadosMetricas = await calcularMetricas(Number(id));
            setMetricas([...dadosMetricas]);
        } catch (error) {
            console.error("Erro ao carregar dados do projeto", error);
        } finally {
            setLoadingProjeto(false);
            setLoadingMetricas(false);
        }
    };

    useEffect(() => {
        if (!id) {
            navigate("/lista-projetos");
            return;
        }

        carregarDadosProjeto();
    }, [id, navigate]);

    const handleFecharModal = () => {
        setPopupItem(null);
        setSelectedProfList([]);
        setModalMessage(null);
    };

    const formatarData = (data?: string) => {
        if (!data) return "-";
        return new Date(data).toLocaleDateString("pt-BR");
    };

    const handleSelectProfissional = (p: Profissional) => {
        setSelectedProfList((prev) => [...prev, p]);
    };

    const handleRemoveProfissional = (id: string) => {
        setSelectedProfList((prev) => prev.filter((p) => p.id !== id));
    };

    const handleAlocar = async () => {
        if (!popupItem || selectedProfList.length === 0) return;

        try {
            setModalLoading(true);
            setModalMessage(null);

            await vincularProfissionalItem({
                projetoId: projeto.id,
                itemId: popupItem.id,
                profissionalIds: selectedProfList.map((p) => p.id),
            });

            setModalMessage({
                type: "success",
                text: "Profissionais alocados com sucesso!",
            });

            await carregarDadosProjeto();

            setTimeout(() => {
                handleFecharModal();
            }, 1500);
        } catch (error) {
            console.error("Erro ao alocar:", error);
            setModalMessage({
                type: "error",
                text: "Erro ao alocar profissionais. Tente novamente.",
            });
        } finally {
            setModalLoading(false);
        }
    };

    const isGestor = temPermissao("GESTOR");

    const mostrarConteudoOperacional = !temAcessoFinanceiro || !visualizacaoFinanceira;

    if (loadingProjeto) {
        return (
            <div className="min-h-screen bg-base-200">
                <Header />
                <div className="flex items-center justify-center h-[80vh]">
                    <span className="loading loading-spinner text-primary loading-lg"></span>
                </div>
            </div>
        );
    }

    if (!projeto) {
        return (
            <div className="min-h-screen bg-base-200">
                <Header />
                <div className="flex items-center justify-center h-[80vh]">
                    <p className="text-base-content/50">Projeto não encontrado.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-base-200">
            <Header />

            <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col gap-6">
                <div className="card bg-base-100 shadow-sm border border-base-content/10">
                    <div className="card-body flex flex-row justify-between items-start gap-4">
                        <div className="flex flex-col gap-2">
                            <h1 className="text-3xl font-bold">{projeto.nomeProjeto}</h1>
                            <span className="badge badge-warning">{projeto.status}</span>
                        </div>

                        <div className="text-right text-sm text-base-content/60 flex flex-col items-end">
                            <p>{projeto.tipoProjeto}</p>
                            <div className="mt-2 text-xs">
                                <p>
                                    <strong>Início:</strong> {formatarData(projeto.dataInicio)}
                                </p>
                                <p>
                                    <strong>Fim:</strong> {formatarData(projeto.dataFim)}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="flex px-6 border-t border-base-content/10 bg-base-200/20 py-3 flex justify-center items-center">
                        {temAcessoFinanceiro && (
                            <div className="flex justify-center">
                                <div className="flex items-center gap-3">
                                    <span
                                        className={`text-sm font-medium transition-colors ${!visualizacaoFinanceira
                                            ? "text-base-content font-bold"
                                            : "text-base-content/50"
                                            }`}
                                    >
                                        Projeto
                                    </span>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setVisualizacaoFinanceira((prev) => !prev)
                                        }
                                        className={`relative w-14 h-7 rounded-full transition-all duration-300 ${visualizacaoFinanceira
                                            ? "bg-primary"
                                            : "bg-base-300"
                                            }`}
                                        aria-label="Alternar visão financeira"
                                    >
                                        <div
                                            className={`absolute top-1 left-1 w-5 h-5 rounded-full bg-white shadow-md transition-transform duration-300 ${visualizacaoFinanceira
                                                ? "translate-x-7"
                                                : "translate-x-0"
                                                }`}
                                        />
                                    </button>

                                    <span
                                        className={`text-sm font-medium transition-colors ${visualizacaoFinanceira
                                            ? "text-base-content font-bold"
                                            : "text-base-content/50"
                                            }`}
                                    >
                                        Financeiro
                                    </span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {temAcessoFinanceiro && visualizacaoFinanceira && (
                    <CardsFinanceiros projeto={projeto} />
                )}

                {mostrarConteudoOperacional && (
                    <>
                        <div className="flex flex-col gap-3">
                            <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4 w-full">
                                <h2 className="text-lg font-semibold whitespace-nowrap">
                                    Profissionais Alocados
                                </h2>
                                <div className="relative flex-1 max-w-md">
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                        <svg
                                            className="w-5 h-5 text-base-content/40"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                            />
                                        </svg>
                                    </span>
                                    <input
                                        type="text"
                                        placeholder="Pesquise por nome, e-mail, nível, cargo..."
                                        className="input input-bordered w-full pl-10 h-10"
                                        value={buscaProfissional}
                                        onChange={(e) =>
                                            setBuscaProfissional(e.target.value)
                                        }
                                    />
                                </div>
                                {isGestor && (
                                    <PaginaAlocacao
                                        projetoId={projeto.id}
                                        projetoNome={projeto.nomeProjeto}
                                    />
                                )}
                            </div>

                            <div className="overflow-x-auto rounded-box border border-base-content/10 bg-base-100">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th>Nome</th>
                                            <th>E-mail</th>
                                            <th>Nível de Experiência</th>
                                            <th>Cargo</th>
                                            <th>Valor/hora</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {profissionaisFiltrados.length === 0 ? (
                                            <tr>
                                                <td
                                                    colSpan={6}
                                                    className="text-center py-4 text-base-content/50"
                                                >
                                                    Nenhum resultado para os filtros aplicados.
                                                </td>
                                            </tr>
                                        ) : (
                                            profissionaisFiltrados.map((prof, index) => (
                                                <tr key={prof.id} className="hover">
                                                    <th>{index + 1}</th>
                                                    <td>{prof.nomeUsuario}</td>
                                                    <td>{prof.email}</td>
                                                    <td>{prof.nivelExperiencia}</td>
                                                    <td>{Array.isArray(prof.cargos)
                                                        ? prof.cargos.join(", ")
                                                        : prof.cargos?.split(/[\s,;]+/).filter(Boolean).join(", ") || "-"}
                                                    </td>
                                                    <td>
                                                        {prof.valorHora
                                                            ? `R$ ${Number(
                                                                prof.valorHora
                                                            )
                                                                .toFixed(2)
                                                                .replace(".", ",")}`
                                                            : "R$ 0,00"}
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="flex flex-col gap-3">
                            <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4 w-full">
                                <h2 className="text-lg font-semibold whitespace-nowrap">
                                    Atividades
                                </h2>
                                <div className="relative flex-1 max-w-md">
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                        <svg
                                            className="w-5 h-5 text-base-content/40"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                            />
                                        </svg>
                                    </span>
                                    <input
                                        type="text"
                                        placeholder="Pesquise por item, responsável ou nível..."
                                        className="input input-bordered w-full pl-10 h-10"
                                        value={buscaItem}
                                        onChange={(e) => setBuscaItem(e.target.value)}
                                    />
                                </div>
                                <div className="flex items-center justify-center bg-gray-50">
                                    <Botao
                                        type="button"
                                        className="h-10 ml-auto"
                                        onClick={() => navigate("/cadastro-item")}
                                    >
                                        Criar Atividade
                                    </Botao>
                                </div>
                            </div>

                            <div className="flex flex-row flex-wrap gap-4">
                                {itensFiltrados.length === 0 ? (
                                    <div
                                        role="alert"
                                        className="alert alert-info alert-soft w-full text-sm"
                                    >
                                        <span>
                                            Sem resultados para a pesquisa de atividades.
                                        </span>
                                    </div>
                                ) : (
                                    itensFiltrados.map((item, index) => (
                                        <Card
                                            key={index}
                                            title={item.codigo}
                                            type={item.descricao}
                                            status={item.nivelAtividade}
                                            responsavel={item.usuarioNomes?.join(", ")}
                                            showResponsavel={true}
                                            isGestor={isGestor}
                                            onClick={
                                                isGestor
                                                    ? () => setPopupItem(item)
                                                    : undefined
                                            }
                                        />
                                    ))
                                )}
                            </div>
                        </div>

                        <div className="flex flex-col gap-4 mt-8">
                            <h2 className="text-lg font-semibold mb-2">
                                Progresso por nível de atividade
                            </h2>
                            {loadingMetricas ? (
                                <div className="flex justify-center p-8 bg-base-100 rounded-box">
                                    <span className="loading loading-spinner text-primary loading-lg"></span>
                                </div>
                            ) : (
                                <div className="flex flex-row flex-wrap md:flex-nowrap gap-6 justify-between">
                                    {NIVEIS_BASE.map((nivel) => {
                                        const dadoDoNivel = metricas.find(
                                            (m) => m.nivelAtividade.toUpperCase() === nivel
                                        );

                                        return (
                                            <div
                                                key={nivel}
                                                className="card bg-base-100 flex-1 border border-base-content/10 shadow-sm"
                                            >
                                                <div className="card-body items-center text-center gap-6">
                                                    <h3 className="card-title text-base-content/70 font-medium">
                                                        {NOMES_ATIVIDADES[nivel]}
                                                    </h3>
                                                    <IndicadorProgresso
                                                        percentualAtiv={
                                                            dadoDoNivel
                                                                ? Math.round(
                                                                    dadoDoNivel.percentual
                                                                )
                                                                : 0
                                                        }
                                                        horasPrevistas={
                                                            dadoDoNivel?.horasPrevistasAtiv ||
                                                            0
                                                        }
                                                        horasRealizadas={
                                                            dadoDoNivel?.horasRealizadasAtiv ||
                                                            0
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    </>
                )}
            </div>

            <ModalAlocarFuncionarioItem
                isOpen={!!popupItem}
                onClose={handleFecharModal}
                itemName={popupItem?.codigo ?? ""}
                profissionais={listaDeProfissionais}
                selectedList={selectedProfList}
                onSelect={handleSelectProfissional}
                onRemove={handleRemoveProfissional}
                onSave={handleAlocar}
                isLoading={modalLoading}
                message={modalMessage}
            />
        </div>
    );
}