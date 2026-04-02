import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Card from "../shared/components/Card";
import Header from "../shared/components/Header";
import { listarItens, type NivelAtividade } from "../services/ItemService";
import Botao from "../shared/components/Botao";

export default function DescricaoProjeto() {
    const { state } = useLocation();
    const navigate = useNavigate();
    const projeto = state?.projeto as { nomeProjeto: string; tipoProjeto: string; status: string } | undefined;

    const [itens, setItens] = useState<{ codigo: string; descricao: string; nivelAtividade: NivelAtividade }[]>([]);

    useEffect(() => {
        // If accessed directly without state, redirect back
        if (!projeto) {
            navigate("/listaprojetos");
            return;
        }
        const loadData = async () => {
            try {
                const listaItens = await listarItens();
                setItens(listaItens);
            } catch (error) {
                console.error("Erro ao carregar itens", error);
            }
        };
        loadData();
    }, []);

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
                            <Botao type="button">
                                Alocar Funcionarios
                            </Botao>
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
                                    <th>Valor/hora</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th>1</th>
                                    <td>Cy Ganderton</td>
                                    <td>cy@email.com</td>
                                    <td>Sênior</td>
                                    <td>R$ 120,00</td>
                                </tr>
                                <tr>
                                    <th>2</th>
                                    <td>Hart Hagerty</td>
                                    <td>hart@email.com</td>
                                    <td>Pleno</td>
                                    <td>R$ 90,00</td>
                                </tr>
                                <tr>
                                    <th>3</th>
                                    <td>Brice Swyre</td>
                                    <td>brice@email.com</td>
                                    <td>Júnior</td>
                                    <td>R$ 60,00</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* lista de cards itens */}
                <div className="flex flex-col gap-3">
                    <div className="flex flex-row justify-between items-center">
                        <h2 className="text-lg font-semibold">Itens</h2>
                        {isGestor && (
                            <Botao type="button">
                                Criar Item
                            </Botao>
                        )}
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
                                    isGestor={isGestor}
                                    onClick={isGestor ? () => console.log("Alocar item", item.codigo) : undefined}
                                />
                            ))
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
}