import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../shared/components/Header";
import { listarProjetos } from "../services/listService";
import Card from "../shared/components/Card";

export default function ListaProjetos() {
    const [projetos, setProjetos] = useState<{ nomeProjeto: string; tipoProjeto: string; status: string }[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const loadData = async () => {
            try {
                const listaProjetos = await listarProjetos();
                setProjetos(listaProjetos);
            } catch (error) {
                console.error("Erro ao carregar dados", error);
            }
        };
        loadData();
    }, []);

    return (
        <div className="flex h-screen bg-[#FFFFFF]">
            <Header />
            <div className="flex mt-40 gap-6 w-full justify-center flex-wrap">
                {projetos.length === 0 ? (
                    <div role="alert" className="alert alert-info alert-soft h-15">
                        <p className="text-lg">Nenhum projeto encontrado.</p>
                    </div>
                ) : (
                    projetos.map((projeto, index) => (
                        <div
                            key={index}
                            className="cursor-pointer"
                            onClick={() => navigate("/descricao-projeto", { state: { projeto } })}
                        >
                            <Card
                                title={projeto.nomeProjeto}
                                type={projeto.tipoProjeto}
                                status={projeto.status}
                            />
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}