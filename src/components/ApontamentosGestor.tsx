import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { listarApontamentosPorProjeto } from "../services/apontamentoService";
import Tabela from "../shared/components/Tabela";
import { listarProjetos } from "../services/listService";

type Apontamento = {
    usuario: string;
    projeto: string;
    item: string;
    nivel: string;
    data: string;
    inicio: string;
    fim: string;
    status: string;
};

export default function ApontamentosGestor() {
    const [apontamentos, setApontamentos] = useState<Apontamento[]>([]);
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate();

    useEffect(() => {
        const fetchLogs = async () => {
            if (!id) return;

            try {
                const apontamentos = await listarApontamentosPorProjeto();
                const listaProjetos = await listarProjetos();
                
                setApontamentos(apontamentos);

            } catch (error) {
                console.error("Erro na requisição:", error);
            }
        };

        fetchLogs();
    }, [id])

    const columns = [
        { header: "Usuário", accessor: "usuario" },
        { header: "Projeto", accessor: "projeto" },
        { header: "Item", accessor: "item" },
        { header: "Nível da atividade", accessor: "nivel" },
        { header: "Data do Apontamento", accessor: "data" },
        { header: "Hora início", accessor: "inicio" },
        { header: "Hora fim", accessor: "fim" },
        { header: "Status", accessor: "status" },
    ];

    return (
        <div>
            <div className="overflow-x-auto">
                {apontamentos.length === 0 ? (
                    <div role="alert" className="alert alert-info alert-soft h-15">
                        <p className="text-lg">Nenhum apontamento encontrado.</p>
                    </div>
                ) : (
                    apontamentos.map((apontamento, index) => (
                        <div
                            key={index}
                            className="cursor-pointer"
                            onClick={() => navigate("/descricao-apontamento", { state: { apontamento } })}
                        >
                            <Tabela
                                data={apontamentos}
                                columns={columns}
                                emptyMessage="Nenhum apontamento pendente encontrado."
                            />
                        </div>
                    ))
                )}
                {/* <table className="table table-lg p-15">
                    <thead>
                        <tr className="text-lg">
                            <th></th>
                            <th>Usuário</th>
                            <th>Projeto</th>
                            <th>Atividade</th>
                            <th>Nível da Atividade</th>
                            <th>Data do Apontamento</th>
                            <th>Hora Ínicio</th>
                            <th>Hora Fim</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="text-sm">
                            <th className="p-1 text-center"><input type="checkbox" className="checkbox" /></th>
                            <td>Carlos</td>
                            <td>GSW1234</td>
                            <td>CRUD</td>
                            <td>tester</td>
                            <td>09/04/2026</td>
                            <td>09:00</td>
                            <td>11:00</td>
                            <td>Pendente</td>
                        </tr>
                        <tr className="text-sm">
                            <th className="p-1 text-center"><input type="checkbox" className="checkbox" /></th>
                            <td>Carlos</td>
                            <td>GSW1234</td>
                            <td>CRUD</td>
                            <td>tester</td>
                            <td>09/04/2026</td>
                            <td>09:00</td>
                            <td>11:00</td>
                            <td>Pendente</td>
                        </tr>
                        <tr className="text-sm">
                            <th className="p-1 text-center"><input type="checkbox" className="checkbox" /></th>
                            <td>Carlos</td>
                            <td>GSW1234</td>
                            <td>CRUD</td>
                            <td>tester</td>
                            <td>09/04/2026</td>
                            <td>09:00</td>
                            <td>11:00</td>
                            <td>Pendente</td>
                        </tr>
                    </tbody>
                </table> */}
            </div>
        </div>
    );
}