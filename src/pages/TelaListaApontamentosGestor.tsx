import { useEffect, useState, useContext } from "react";
import ApontamentosGestor from "../components/ApontamentosGestor";
import DropdownProjetos from "../components/DropdownProjetos";
import Header from "../shared/components/Header";
import { listarProjetosPorGestor } from "../services/projectService";
import { aprovarApontamentos, reprovarApontamento } from "../services/apontamentoService";
import ModalReprovarApontamento from "../components/ModalReprovarApontamento";
import { KeycloakContext } from "../contexts/KeycloakProvider";

type ProjetoOption = {
    label: string;
    value: string;
};

const TODOS_PROJETOS_VALUE = "all";

export default function ListaApontamentosGestor() {
    const [selectedProjeto, setSelectedProjeto] = useState<string>(TODOS_PROJETOS_VALUE);
    const [projetoOptions, setProjetoOptions] = useState<ProjetoOption[]>([]);
    const [selectedItems, setSelectedItems] = useState<any[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isReprovando, setIsReprovando] = useState(false);
    const { getUsuario } = useContext(KeycloakContext);
    const usuario = getUsuario();
    const gestorIdLogado = usuario?.id;

    useEffect(() => {
        if (!gestorIdLogado) return;
        const loadProjetos = async () => {
            try {
                const lista = await listarProjetosPorGestor(gestorIdLogado);
                const options = lista.map((projeto: any) => ({
                    label: projeto.nomeProjeto ?? projeto.nome ?? "Projeto",
                    value: String(projeto.id),
                }));
                setProjetoOptions([{ label: "Todos os projetos", value: TODOS_PROJETOS_VALUE }, ...options]);
            } catch (error) {
                console.error("[ERROR] Falha ao carregar projetos:", error);
                setProjetoOptions([{ label: "Todos os projetos", value: TODOS_PROJETOS_VALUE }]);
            }
        };
        loadProjetos();
    }, [gestorIdLogado]);

    const handleAprovar = async () => {
        if (selectedItems.length === 0) return;
        const ids = selectedItems.map(item => item.id);
        try {
            await aprovarApontamentos(ids);
            alert("Apontamentos aprovados com sucesso!");
            setSelectedItems([]);
            window.location.reload();
        } catch (error) {
            console.error("[ERROR] Falha na aprovação:", error);
            alert("Erro ao aprovar apontamentos.");
        }
    };

    const handleAbrirModalReprovar = () => {
        if (selectedItems.length === 0) {
            alert("Selecione um apontamento para reprovar.");
            return;
        }
        if (selectedItems.length > 1) {
            alert("A reprovação deve ser feita um apontamento por vez.");
            return;
        }
        setIsModalOpen(true);
    };

    const handleConfirmarReprovacao = async (justificativa: string) => {
        const itemParaReprovar = selectedItems[0];
        if (!itemParaReprovar) return;

        setIsReprovando(true);
        try {
            await reprovarApontamento(itemParaReprovar.id, justificativa);

            alert("Apontamento reprovado com sucesso!");
            setIsModalOpen(false);
            setSelectedItems([]);
            window.location.reload();
        } catch (error) {
            console.error("[ERROR] Erro ao reprovar apontamento:", error);
            alert("Erro ao enviar a reprovação.");
        } finally {
            setIsReprovando(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col dark:bg-gray-900">
            <Header />
            <div className="flex justify-center my-10 px-6">
                <div className="w-full max-w-7xl bg-base-200 rounded-2xl p-4 md:p-6 lg:p-8 shadow-md">
                    <div className="mb-8 bg-base-200 rounded-lg p-4">
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                            <label className="text-xl md:text-2xl font-bold shrink-0">Aprovação dos Apontamentos</label>

                            <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center shrink-0 w-full sm:w-auto">
                                <DropdownProjetos
                                    value={selectedProjeto}
                                    options={projetoOptions}
                                    onChange={(e) => setSelectedProjeto(e.target.value)}
                                    heightPx={38}
                                    required={false}
                                />
                                <button
                                    onClick={handleAprovar}
                                    className="border border-black rounded-xl bg-white hover:bg-gray-100 p-3 px-10 disabled:opacity-40 disabled:cursor-not-allowed transition-all whitespace-nowrap"
                                    disabled={selectedItems.length === 0}
                                >
                                    Aprovar
                                </button>
                                <button
                                    onClick={handleAbrirModalReprovar}
                                    className="border border-black rounded-xl bg-white hover:bg-gray-100 p-3 px-10 disabled:opacity-40 disabled:cursor-not-allowed transition-all whitespace-nowrap"
                                    disabled={selectedItems.length !== 1}
                                >
                                    Reprovar
                                </button>
                            </div>
                        </div>
                    </div>

                    <ApontamentosGestor
                        gestorId={gestorIdLogado ?? ""}
                        projetoFiltro={selectedProjeto}
                        onSelectionChange={setSelectedItems}
                    />

                </div>

            </div>
            <ModalReprovarApontamento
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={handleConfirmarReprovacao}
                isLoading={isReprovando}
            />
        </div>
    );
}