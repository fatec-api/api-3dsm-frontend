import { useEffect, useState } from "react";
import ApontamentosGestor from "../components/ApontamentosGestor";
import DropdownProjetos from "../components/DropdownProjetos";
import Header from "../shared/components/Header";
import { useParams } from "react-router-dom";
import { listarApontamentosGestor } from "../services/apontamentoService";
import { listarItensPorProfissional } from "../services/ItemService";

type Log = {
    usuario: string;
    projeto: string;
    item: string;
    nivel: string;
    data: string;
    inicio: string;
    fim: string;
    status: string;
};

export default function ListaApontamentosGestor() {
    const [logs, setLogs] = useState<Log[]>([]);
    const { id } = useParams<{ id: string }>()

    useEffect(() => {
        const fetchLogs = async () => {
            if (!id) return;

            try {
                const apontamentos = await listarApontamentosGestor(id);
                const itens = await listarItensPorProfissional(id);

                const logsCompletos: Log[] = apontamentos.map((a: any) => {
                    const item = itens.find((i: any) => i.id === a.itemId);

                    return {
                        usuario: a.usuarioNome,
                        projeto: item?.projetoNome,
                        item: a.itemDescricao,
                        nivel: item?.nivelAtividade || "UNDEFINED",
                        data: a.dataApontamento,
                        inicio: a.horaInicio,
                        fim: a.horaFim,
                        status: a.status
                    };
                });

                setLogs(logsCompletos);

            } catch (error) {
                console.error("Erro na requisição:", error);
            }
        };

        fetchLogs();
    }, [id])
    return (
        <>
            <Header />
            <div className="flex justify-around items-center border rounded-xl p-3 my-5 mx-15">
                <h1 className="text-2xl">APROVAÇÃO DOS APONTAMENTOS</h1>
                <div className="flex gap-3">
                    <DropdownProjetos
                        value=""
                        options={[
                            { label: "GSW1234", value: "Alocacao" },
                            { label: "GSW1235", value: "Hora_Fechada" }
                        ]}
                        heightPx={38}
                    />
                    <button type="submit" className="border border-black rounded-xl bg-white hover:bg-gray-100 p-3 px-15 self-center">Aprovar</button>
                    <button type="submit" className="border border-black rounded-xl bg-white hover:bg-gray-100 p-3 px-15 self-center">Reprovar</button>
                </div>
            </div>
            <ApontamentosGestor />
        </>
    )
}