import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../shared/components/Header";
import { listarProjetos } from "../services/projectService";
import { FaChevronRight } from "react-icons/fa";
import FiltrosListagemProjetos from "../components/FiltrosListagemProjetos";

interface Projeto {
    id: number;
    nomeProjeto: string;
    tipoProjeto: string;
    status: string;
    horasPrevistasTotal: number;
    horasRealizadasTotal: number;
    horasPendentesTotal?: number;
}

export default function ListaProjetos() {
    // const [projetos, setProjetos] = useState<{ nomeProjeto: string; tipoProjeto: string; status: string }[]>([]);
    // const [projetos, setProjetos] = useState<{ nomeProjeto: string; tipoProjeto: string; status: string,id: number }[]>([]);
    const [projetos, setProjetos] = useState<Projeto[]>([]);
    const [loading, setLoading] = useState(true);
    const [erro, setErro] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const loadData = async () => {
            try {
                const response = await listarProjetos();
                console.log("Dados recebidos:", response);

                const data = response?.data ?? response;

                setProjetos(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error("Erro ao carregar projetos", error);

                setProjetos([]);
                setErro(true);
            } finally {
                setLoading(false);
            }
        };
 
        loadData();
    }, []); 

    // regra de cor baseada no percentual
    const getCor = (projeto: Projeto) => {
        if (!projeto.horasPrevistasTotal) return "bg-gray-300";

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

    if (erro) {
        console.warn("Exibindo dados mockados");
    }

    return (
        <div className="flex flex-col h-screen bg-white">
            <Header />
            <FiltrosListagemProjetos/>
            <div className="flex gap-6 w-full justify-center flex-wrap">
                {projetos.length === 0 ? (
                    <div role="alert" className="alert alert-info alert-soft h-15">
                        <p className="text-lg">Nenhum projeto encontrado.</p>
                    </div>
                ) : (
                    projetos.map((projeto) => {
                        const cor = getCor(projeto);

                        return (
                            <div
                                key={projeto.id}
                                className="cursor-pointer"
                                onClick={() =>
                                    navigate("/descricao-projeto", {
                                        state: { projeto },
                                    })
                                }
                            >
                                <div className="w-80 h-44 bg-white rounded-2xl shadow-md border border-gray-200 flex overflow-hidden transition-all duration-200 hover:shadow-md hover:-translate-y-[2px]">
                                    <div className={`w-3 ${cor}`} />
                                    <div className="p-4 flex flex-col justify-between w-full">
                                        <div className="flex justify-between items-center">
                                            <h2 className="text-lg font-semibold">
                                                {projeto.nomeProjeto}
                                            </h2>
                                            <FaChevronRight className="text-gray-400 group-hover:text-gray-600 transition" />
                                        </div>

                                        <div className="text-sm space-y-1">
                                            <p>
                                                <b>Tipo:</b> {projeto.tipoProjeto}
                                            </p>
                                            <p>
                                                <b>Cliente:</b> Cliente
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
        </div>
    );
}