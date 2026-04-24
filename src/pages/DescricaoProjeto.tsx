import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Card from "../shared/components/Card";
import Header from "../shared/components/Header";
import { listarItens, type NivelAtividade, vincularProfissionalItem } from "../services/ItemService";
import PaginaAlocacao from "./DevAllocationTest";
import ModalAlocarFuncionarioItem, { type Profissional } from "../components/ModalAlocarFuncionarioItem";
import { listarEquipeProjeto, listarProjetoId } from "../services/projectService";
import { getApontamentosAprovadosPorProjeto, type MetricasAtividade, } from "../services/apontamentoService";
import IndicadorProgresso from "../components/IndicadorProgresso";

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
    const [selectedProfId, setSelectedProfId] = useState("");

    const [itens, setItens] = useState<{ codigo: string; descricao: string; nivelAtividade: NivelAtividade, usuarioNome: string }[]>([]);
    const [listaDeProfissionais, setListaDeProfissionais] = useState<Profissional[]>([]);
    const [metricas, setMetricas] = useState<MetricasAtividade[]>([]);
    const [loadingMetricas, setLoadingMetricas] = useState(false);


    const carregarDadosProjeto = async () => {
        if (!projetoState?.id) return;
        try {
            const projeto = await listarProjetoId(projetoState.id);
            setProjeto(projeto);

            const listaItens = await listarItens(projetoState.id);
            setItens(listaItens);

            const listaEquipe = await listarEquipeProjeto(projetoState.id);
            setListaDeProfissionais(listaEquipe);

            setLoadingMetricas(true);
            const dadosMetricas = await getApontamentosAprovadosPorProjeto(projetoState.id);
            setMetricas(dadosMetricas || []);
        } catch (error) {
            console.error("Erro ao carregar dados do projeto", error);
        } finally {
            setLoadingMetricas(false)
        }
    };

    useEffect(() => {
        if (!projetoState?.id) {
            navigate("/listaprojetos");
            return;
        }
        carregarDadosProjeto();
    }, [projetoState?.id]);

    const handleAlocar = async () => {
        if (!popupItem || !selectedProfId) return;

        try {
            await vincularProfissionalItem({
                projectId: projeto.id,
                itemId: popupItem.id,
                professionalIds: [selectedProfId],
            });

            setPopupItem(null);
            setSelectedProfId("");

            await carregarDadosProjeto();
        } catch (error) {
            console.error("Erro ao alocar:", error);
        }
    };

    const calcularPorcentagem = (previstas: number, realizadas: number) => {
        if (!previstas || previstas === 0) return 0;
        const calculo = (realizadas / previstas) * 100;
        return Math.round(calculo);
    };

    // trocar para a chamada da api depois
    const isGestor = true;

    if (!projeto) return null;

    return (
        <div className="min-h-screen bg-base-200">
            <Header />

            <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col gap-6">

                {/* banner header do projeto aberto */}
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

                {/* lista de profissionais alocados */}
                <div className="flex flex-col gap-3">
                    <div className="flex flex-row justify-between items-center">
                        <h2 className="text-lg font-semibold">Profissionais Alocados</h2>
                        {isGestor && (
                            // <Botao type="button">
                            //     Alocar Funcionarios
                            // </Botao>
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
                                </tr>
                            </thead>
                            <tbody>
                                {listaDeProfissionais.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="text-center py-4">Nenhum profissional alocado.</td>
                                    </tr>
                                ) : (
                                    listaDeProfissionais.map((prof, index) => (
                                        <tr key={prof.id}>
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

                {/* lista de cards itens */}
                <div className="flex flex-col gap-3">
                    <div className="flex flex-row justify-between items-center">
                        <h2 className="text-lg font-semibold">Itens</h2>
                    </div>
                    <div className="flex flex-row flex-wrap gap-4">
                        {itens.length === 0 ? (
                            <div role="alert" className="alert alert-info alert-soft">
                                <p className="text-lg">Nenhum item encontrado.</p>
                            </div>
                        ) : (
                            itens.map((item, index) => (
                                <Card
                                    key={index}
                                    title={item.codigo}
                                    type={item.descricao}
                                    status={item.nivelAtividade}
                                    responsavel={item.usuarioNome}
                                    showResponsavel={true}
                                    isGestor={isGestor}
                                    onClick={isGestor && !item.usuarioNome ? () => setPopupItem(item) : undefined}
                                />
                            ))
                        )}
                    </div>
                </div>

                {/* Horas distribuídas pelos níveis de Atividade */}
                <div className="flex flex-col gap-4 mt-8">
                    <h2 className="text-lg font-semibold mb-2">Horas realizadas vs. previstas por atividade</h2>

                    {loadingMetricas ? (
                        <div className="flex justify-center p-8 bg-base-100 rounded-box border border-base-content/10">
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
                                    <div
                                        key={nivel}
                                        className="card bg-base-100 flex-1 border border-base-content/10 shadow-sm transition-all hover:shadow-md"
                                    >
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
                onClose={() => { setPopupItem(null); setSelectedProfId(""); }}
                itemName={popupItem?.titulo ?? ""}
                profissionais={listaDeProfissionais}
                selectedId={selectedProfId}
                onSelect={setSelectedProfId}
                onSave={handleAlocar}
                isLoading={false}
                message={null}
            />
        </div>
    );
}