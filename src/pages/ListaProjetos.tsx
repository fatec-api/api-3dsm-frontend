import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../shared/components/Header";
import { listarProjetos } from "../services/projectService";
import Card from "../shared/components/Card";

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

    /* useEffect(() => {
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
  */

    useEffect(() => {
        const loadData = async () => {
            try {
                const data = await listarProjetos();
                setProjetos(data);
            } catch (e) {
                console.error("Erro ao carregar projetos", e);

                setProjetos([
                    {
                        id: 1,
                        nomeProjeto: "Projeto 1",
                        tipoProjeto: "Desenvolvimento",
                        status: "Em andamento",
                        horasPrevistasTotal: 100,
                        horasRealizadasTotal: 60,
                        horasPendentesTotal: 10,
                    },
                    {
                        id: 2,
                        nomeProjeto: "Projeto 2",
                        tipoProjeto: "Análise",
                        status: "Atrasado",
                        horasPrevistasTotal: 80,
                        horasRealizadasTotal: 95,
                        horasPendentesTotal: 5,
                    },
                    {
                        id: 3,
                        nomeProjeto: "Projeto 3",
                        tipoProjeto: "Teste",
                        status: "Concluído",
                        horasPrevistasTotal: 100,
                        horasRealizadasTotal: 90,
                        horasPendentesTotal: 0,
                    },
                ]);
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

        const percentual =
            (projeto.horasRealizadasTotal / projeto.horasPrevistasTotal) * 100;

        if (percentual <= 80) return "bg-green-500";
        if (percentual <= 100) return "bg-yellow-400";
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