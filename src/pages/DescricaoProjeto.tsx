import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Card from "../shared/components/Card";
import Header from "../shared/components/Header";
import { listarItens, type NivelAtividade, vincularProfissionalItem } from "../services/ItemService";
import PaginaAlocacao from "./DevAllocationTest";
import ModalAlocarFuncionarioItem from "../components/ModalAlocarFuncionarioItem";

export default function DescricaoProjeto() {
    const { state } = useLocation();
    const navigate = useNavigate();
    const projetoState = state?.projeto;
    const [projeto, setProjeto] = useState<any>(projetoState);
    const [popupItem, setPopupItem] = useState<any | null>(null);
    const [selectedProfId, setSelectedProfId] = useState("");

    const [itens, setItens] = useState<{ codigo: string; descricao: string; nivelAtividade: NivelAtividade, usuarioNome: string }[]>([]);
    const [listaDeProfissionais, setListaDeProfissionais] = useState<Profissional[]>([]);


    const carregarDadosProjeto = async () => {
        if (!projetoState?.id) return;
        try {
            const projeto = await listarProjetoId(projetoState.id);
            setProjeto(projeto);

            const listaItens = await listarItens(projetoState.id);
            setItens(listaItens);

            const listaEquipe = await listarEquipeProjeto(projetoState.id);
            setListaDeProfissionais(listaEquipe);
        } catch (error) {
            console.error("Erro ao carregar dados do projeto", error);
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