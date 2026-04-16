import { useEffect, useState } from "react";
import ApontamentosGestor from "../components/ApontamentosGestor";
import DropdownProjetos from "../components/DropdownProjetos";
import Header from "../shared/components/Header";
import { listarProjetos as listarProjetosApi } from "../services/listService";
import { listarProjetos as listarProjetosMock } from "../services/projectService";

type ProjetoOption = {
    label: string;
    value: string;
};

const TODOS_PROJETOS_VALUE = "all";

export default function ListaApontamentosGestor() {
    const [selectedProjeto, setSelectedProjeto] = useState<string>(TODOS_PROJETOS_VALUE);
    const [projetoOptions, setProjetoOptions] = useState<ProjetoOption[]>([]);

    useEffect(() => {
        const loadProjetos = async () => {
            try {
                let lista: any = await listarProjetosApi();

                if (!Array.isArray(lista)) {
                    lista = Array.isArray(lista?.data) ? lista.data : [];
                }

                if (!Array.isArray(lista) || lista.length === 0) {
                    lista = await listarProjetosMock();
                }

                const options = (Array.isArray(lista) ? lista : []).map((projeto: any) => {
                    const label = typeof projeto === "string"
                        ? projeto
                        : projeto.nomeProjeto ?? projeto.nome ?? projeto.projeto ?? "Projeto";
                    const value = typeof projeto === "string"
                        ? projeto
                        : projeto.id ?? projeto.nomeProjeto ?? projeto.nome ?? projeto.projeto ?? label;
                    return { label, value };
                });

                setProjetoOptions([{ label: "Todos os projetos", value: TODOS_PROJETOS_VALUE }, ...options]);
            } catch (error) {
                console.error("Erro ao carregar projetos:", error);
                setProjetoOptions([{ label: "Todos os projetos", value: TODOS_PROJETOS_VALUE }]);
            }
        };

        loadProjetos();
    }, []);

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
                    <button type="submit" className="border border-black rounded-xl bg-white hover:bg-gray-100 p-3 px-15">Aprovar</button>
                    <button type="submit" className="border border-black rounded-xl bg-white hover:bg-gray-100 p-3 px-15">Reprovar</button>
                </div>
            </div>
            <ApontamentosGestor projetoFiltro={selectedProjeto} />
        </>
    )
}