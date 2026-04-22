import { useEffect, useState } from "react";
import ApontamentosGestor from "../components/ApontamentosGestor";
import DropdownProjetos from "../components/DropdownProjetos";
import Header from "../shared/components/Header";
import { listarProjetosPorGestor } from "../services/projectService";
import { aprovarApontamentos, reprovarApontamento } from "../services/apontamentoService";

type ProjetoOption = {
    label: string;
    value: string;
};

const TODOS_PROJETOS_VALUE = "all";

export default function ListaApontamentosGestor() {
    const [selectedProjeto, setSelectedProjeto] = useState<string>(TODOS_PROJETOS_VALUE);
    const [projetoOptions, setProjetoOptions] = useState<ProjetoOption[]>([]);
    const [selectedApontamentos, setSelectedApontamentos] = useState<string[]>([]);

    const gestorIdLogado = "gestor1"; // Valor mockado - substituir pela autenticação real

    useEffect(() => {
        const loadProjetos = async () => {
            try {
                const lista = await listarProjetosPorGestor(gestorIdLogado);

                const options = lista.map((projeto: any) => {
                    const label = projeto.nomeProjeto ?? projeto.nome ?? "Projeto";
                    const value = projeto.id ?? projeto.nomeProjeto ?? projeto.nome ?? label;
                    return { label, value };
                });

                setProjetoOptions([{ label: "Todos os projetos", value: TODOS_PROJETOS_VALUE }, ...options]);
            } catch (error) {
                console.error("Erro ao carregar projetos:", error);
                setProjetoOptions([{ label: "Todos os projetos", value: TODOS_PROJETOS_VALUE }]);
            }
        };

        loadProjetos();
    }, [gestorIdLogado]);

    const handleAprovar = async () => {
        if (selectedApontamentos.length === 0) {
            alert("Selecione pelo menos um apontamento para aprovar.");
            return;
        }

        try {
            await aprovarApontamentos(selectedApontamentos);
            alert("Apontamentos aprovados com sucesso!");
            setSelectedApontamentos([]);
        } catch (error) {
            console.error("Erro ao aprovar apontamentos:", error);
            alert("Erro ao aprovar apontamentos.");
        }
    };

    const handleReprovar = async () => {
        if (selectedApontamentos.length === 0) {
            alert("Selecione um apontamento para reprovar.");
            return;
        }

        if (selectedApontamentos.length > 1) {
            alert("A reprovação deve ser feita um apontamento por vez.");
            return;
        }

        try {
            await reprovarApontamento(selectedApontamentos[0]);
            alert("Apontamento reprovado com sucesso!");
            setSelectedApontamentos([]);
        } catch (error) {
            console.error("Erro ao reprovar apontamento:", error);
            alert("Erro ao reprovar apontamento.");
        }
    };

    const isReprovarDisabled = selectedApontamentos.length > 1;

    return (
        <>
            <Header />
            <div className="flex justify-between flex-wrap items-center border rounded-xl p-3 my-5 mx-15 gap-3">
                <h1 className="text-2xl">APROVAÇÃO DOS APONTAMENTOS</h1>
                <div className="flex gap-3 items-center flex-wrap">
                    <DropdownProjetos
                        value={selectedProjeto}
                        options={projetoOptions}
                        onChange={(e) => setSelectedProjeto(e.target.value)}
                        heightPx={38}
                        required={false}
                    />
                    <button 
                        onClick={handleAprovar}
                        className="border border-black rounded-xl bg-white hover:bg-gray-100 p-3 px-15 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={selectedApontamentos.length === 0}
                    >
                        Aprovar
                    </button>
                    <button 
                        onClick={handleReprovar}
                        className="border border-black rounded-xl bg-white hover:bg-gray-100 p-3 px-15 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={selectedApontamentos.length === 0 || isReprovarDisabled}
                    >
                        Reprovar
                    </button>
                </div>
            </div>
            <ApontamentosGestor 
                projetoFiltro={selectedProjeto} 
                onSelectionChange={setSelectedApontamentos}
            />
        </>
    )
}