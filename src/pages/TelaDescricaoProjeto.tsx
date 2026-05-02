import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Card from "../shared/components/Card";
import Header from "../shared/components/Header";
import { listarItens, type NivelAtividade, vincularProfissionalItem } from "../services/ItemService";
import PaginaAlocacao from "./TelaDevAllocationTest";
import ModalAlocarFuncionarioItem, { type Profissional } from "../components/ModalAlocarFuncionarioItem";
import { listarEquipeProjeto, listarProjetoId } from "../services/projectService";
import { getApontamentosAprovadosPorProjeto, type MetricasAtividade, } from "../services/apontamentoService";
import IndicadorProgresso from "../components/IndicadorProgresso";
import Botao from "../shared/components/Botao";

const NIVEIS_BASE = ['ANALISE', 'DESENVOLVIMENTO', 'TESTE'];
const NOMES_ATIVIDADES: Record<string, string> = {
    'ANALISE': 'Análise',
    'DESENVOLVIMENTO': 'Desenvolvimento',
    'TESTE': 'Teste'
};

export default function DescricaoProjeto() {
    const { state } = useLocation();
    const navigate = useNavigate();
    const projetoState = state?.projeto;
    const [projeto, setProjeto] = useState<any>(projetoState);
    const [popupItem, setPopupItem] = useState<any | null>(null);

    const [selectedProfList, setSelectedProfList] = useState<Profissional[]>([]);

    const [itens, setItens] = useState<{ id?: string; codigo: string; descricao: string; nivelAtividade: NivelAtividade, usuarioNomes: string[] }[]>([]);
    const [listaDeProfissionais, setListaDeProfissionais] = useState<Profissional[]>([]);
    const [metricas, setMetricas] = useState<MetricasAtividade[]>([]);
    const [loadingMetricas, setLoadingMetricas] = useState(false);
    const [modalLoading, setModalLoading] = useState(false);
    const [modalMessage, setModalMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

    const [buscaProfissional, setBuscaProfissional] = useState("");
    const [buscaItem, setBuscaItem] = useState("");

    const profissionaisFiltrados = listaDeProfissionais.filter(prof => {
        const termo = buscaProfissional.toLowerCase();
        return (
            prof.nomeUsuario?.toLowerCase().includes(termo) ||
            prof.email?.toLowerCase().includes(termo) ||
            prof.nivelExperiencia?.toLowerCase().includes(termo) ||
            prof.cargo?.toLowerCase().includes(termo) ||
            prof.valorHora?.toString().includes(termo)
        );
    });

    const itensFiltrados = itens.filter(item => {
        const termo = buscaItem.toLowerCase();
        return (
            (item.usuarioNomes?.some(n => n?.toLowerCase().includes(termo)) || false) ||
            item.nivelAtividade?.toLowerCase().includes(termo) ||
            item.codigo?.toLowerCase().includes(termo) ||
            item.descricao?.toLowerCase().includes(termo)
        );
    });

    const carregarDadosProjeto = async () => {
        if (!projetoState?.id) return;
        try {
            const projeto = await listarProjetoId(projetoState.id);
            setProjeto(projeto);

            const listaItens = await listarItens(projetoState.id);
            // setItens(listaItens)
            setItens(Array.isArray(listaItens) ? listaItens : []);

            const listaEquipe = await listarEquipeProjeto(projetoState.id);
            setListaDeProfissionais(listaEquipe);

            setLoadingMetricas(true);
            const dadosMetricas = await getApontamentosAprovadosPorProjeto(projetoState.id);
            setMetricas(dadosMetricas || []);
        } catch (error) {
            console.error("Erro ao carregar dados do projeto", error);
        } finally {
            setLoadingMetricas(false);
        }
    };

    useEffect(() => {
        if (!projetoState?.id) {
            navigate("/lista-projetos");
            return;
        }
        carregarDadosProjeto();
    }, [projetoState?.id]);

    const handleFecharModal = () => {
        setPopupItem(null);
        setSelectedProfList([]);
        setModalMessage(null);
    };

    const handleSelectProfissional = (p: Profissional) => {
        setSelectedProfList(prev => [...prev, p]);
    };

    const handleRemoveProfissional = (id: string) => {
        setSelectedProfList(prev => prev.filter(p => p.id !== id));
    };

    const handleAlocar = async () => {
        if (!popupItem || selectedProfList.length === 0) return;

        try {
            setModalLoading(true);
            setModalMessage(null);

            await vincularProfissionalItem({
                projetoId: projeto.id,
                itemId: popupItem.id,
                profissionalIds: selectedProfList.map(p => p.id),
            });

            setModalMessage({ type: 'success', text: 'Profissionais alocados com sucesso!' });

            await carregarDadosProjeto();

            setTimeout(() => {
                handleFecharModal();
            }, 1500);
        } catch (error) {
            console.error("Erro ao alocar:", error);
            setModalMessage({ type: 'error', text: 'Erro ao alocar profissionais. Tente novamente.' });
        } finally {
            setModalLoading(false);
        }
    };

    const calcularPorcentagem = (previstas: number, realizadas: number) => {
        if (!previstas || previstas === 0) return 0;
        return Math.round((realizadas / previstas) * 100);
    };

    const isGestor = true;

    if (!projeto) return null;

    return (
        <div className="min-h-screen bg-base-200">
            <Header />

            <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col gap-6">

                <div className="card bg-base-100 shadow-sm border border-base-content/10">
                    <div className="card-body flex flex-row justify-between items-start">
                        <div className="flex flex-col gap-2">
                            <h1 className="text-3xl font-bold">{projeto.nomeProjeto}</h1>
                            <span className="badge badge-warning">{projeto.status}</span>
                        </div>
                        <div className="text-right text-sm text-base-content/60">
                            <p>{projeto.tipoProjeto}</p>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-3">
                    <div className="flex flex-row justify-between items-center gap-4">
                        <h2 className="text-lg font-semibold whitespace-nowrap">Profissionais Alocados</h2>
                        <div className="relative flex-1 max-w-md">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                <svg className="w-5 h-5 text-base-content/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </span>
                            <input
                                type="text"
                                placeholder="Pesquise por nome, e-mail, nível, cargo..."
                                className="input input-bordered w-full pl-10 h-10"
                                value={buscaProfissional}
                                onChange={(e) => setBuscaProfissional(e.target.value)}
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
                                        <td colSpan={6} className="text-center py-4 text-base-content/50">Nenhum resultado para os filtros aplicados.</td>
                                    </tr>
                                ) : (
                                    profissionaisFiltrados.map((prof, index) => (
                                        <tr key={prof.id} className="hover">
                                            <th>{index + 1}</th>
                                            <td>{prof.nomeUsuario}</td>
                                            <td>{prof.email}</td>
                                            <td>{prof.nivelExperiencia}</td>
                                            <td>{prof.cargo}</td>
                                            <td>{prof.valorHora ? `R$ ${Number(prof.valorHora).toFixed(2).replace('.', ',')}` : 'R$ 0,00'}</td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="flex flex-col gap-3">
                    <div className="flex flex-row justify-between items-center gap-4">
                        <h2 className="text-lg font-semibold whitespace-nowrap">Atividades</h2>
                        <div className="relative flex-1 max-w-md">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                <svg className="w-5 h-5 text-base-content/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
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
                            <Botao type="button" className="h-10 ml-auto" onClick={() => navigate("/cadastro-item")}>
                                Criar Atividade
                            </Botao>
                        </div>
                    </div>

                    <div className="flex flex-row flex-wrap gap-4">
                        {itensFiltrados.length === 0 ? (
                            <div role="alert" className="alert alert-info alert-soft w-full text-sm">
                                <span>Sem resultados para a pesquisa de atividades.</span>
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
                                    onClick={isGestor ? () => setPopupItem(item) : undefined}
                                />
                            ))
                        )}
                    </div>
                </div>

                <div className="flex flex-col gap-4 mt-8">
                    <h2 className="text-lg font-semibold mb-2">Progresso por nível de atividade</h2>
                    {loadingMetricas ? (
                        <div className="flex justify-center p-8 bg-base-100 rounded-box">
                            <span className="loading loading-spinner text-primary loading-lg"></span>
                        </div>
                    ) : (
                        <div className="flex flex-row flex-wrap md:flex-nowrap gap-6 justify-between">
                            {NIVEIS_BASE.map(nivel => {
                                const dadoDoNivel = metricas.find(m => m.nivelAtividade === nivel);
                                const percentual = dadoDoNivel
                                    ? calcularPorcentagem(dadoDoNivel.horasPrevistasAtiv, dadoDoNivel.horasRealizadasAtiv)
                                    : 0;
                                return (
                                    <div key={nivel} className="card bg-base-100 flex-1 border border-base-content/10 shadow-sm">
                                        <div className="card-body items-center text-center gap-6">
                                            <h3 className="card-title text-base-content/70 font-medium">
                                                {NOMES_ATIVIDADES[nivel]}
                                            </h3>
                                            <IndicadorProgresso
                                                percentualAtiv={percentual}
                                                horasPrevistas={dadoDoNivel?.horasPrevistasAtiv || 0}
                                                horasRealizadas={dadoDoNivel?.horasRealizadasAtiv || 0}
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
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