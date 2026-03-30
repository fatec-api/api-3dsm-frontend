import { useEffect, useState } from "react";
import Header from "../shared/components/Header"
import { listarProjetos } from "../services/listService";

export default function ListaProjetos() {

    const [projetos, setProjetos] = useState<{nomeProjeto: string, tipoProjeto: string, status: string}[]>([]);

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
                        <div key={index} className="flex flex-col justify-between border hover:shadow-lg hover:transform hover:scale-105 hover:transition hover:duration-300 p-6 rounded-lg h-50 w-64">
                            <h2 className="text-center text-xl font-bold mb-2">{projeto.nomeProjeto}</h2>
                            <div>
                                <p className="text-gray-600">Tipo: {projeto.tipoProjeto}</p>
                                <p className="text-gray-600">Status: {projeto.status}</p>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}