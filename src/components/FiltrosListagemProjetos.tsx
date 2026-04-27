import { useEffect, useState } from "react";
import { listarClientes } from "../services/clienteService";
import { listarProjetosPorGestor } from "../services/projectService";
import Dropdown from "./DropdownProjetos";

export default function FiltrosListagemProjetos() {
    const [cliente, setCliente] = useState("");
    const [tipoProjeto, setTipoProjeto] = useState("");
    const [statusProjeto, setStatusProjeto] = useState("");
    const [clientes, setClientes] = useState<string[]>([]);
    const [projetos, setProjetos] = useState<{ gestorId: string }[]>([]);

    useEffect(() => {
        const loadData = async () => {
            try {
                const listaProjetos = await listarProjetosPorGestor();
                setProjetos(listaProjetos);
                const listaClientes = await listarClientes();
                setClientes(listaClientes.map((c: { nomeEmpresa: string; }) => c.nomeEmpresa));
            } catch (error) {
                console.error("Erro ao carregar dados", error);
            }
        };
        loadData();
    }, []);

    return (
        <div className="flex flex-col md:flex-row items-center justify-center p-5 mb-4">
            <div className="flex items-center space-x-2 p-2">
                {/* <label htmlFor="filtro-tipo" className="text-sm font-medium">
                    Tipo de Projeto:
                </label> */}
                <Dropdown
                    value={tipoProjeto}
                    onChange={(e) => setTipoProjeto(e.target.value)}
                    options={[
                        { label: "Alocação", value: "Alocacao" },
                        { label: "Hora Fechada", value: "Hora_Fechada" }
                    ]}
                    widthPx={150}
                    heightPx={40}
                    required={false}
                />
                {/* <select
                    id="filtro-tipo"
                    className="border border-gray-300 rounded-md p-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">Todos</option>
                    <option value="Desenvolvimento">Desenvolvimento</option>
                    <option value="Pesquisa">Pesquisa</option>
                    <option value="Manutenção">Manutenção</option>
                </select> */}
            </div>
            <div className="flex items-center space-x-2 p-2">
                <Dropdown
                    value={statusProjeto}
                    onChange={(e) => setStatusProjeto(e.target.value)}
                    options={[
                        { label: "Desenvolvimento", value: "Desenvolvimento" },
                        { label: "Andamento", value: "Andamento" },
                        { label: "Concluído", value: "Concluida" }
                    ]}
                    widthPx={150}
                    heightPx={40}
                    required={false}
                />
            </div>
            <div className="flex items-center space-x-2 p-2">
                <select defaultValue="Tipo" className="select">
                    <option disabled={true}>Tipo</option>
                    <option>Crimson</option>
                    <option>Amber</option>
                    <option>Velvet</option>
                </select>
            </div>
            <div className="flex items-center space-x-2 p-">
                <Dropdown
                    value={cliente}
                    onChange={(e) => setCliente(e.target.value)}
                    options={clientes}
                    widthPx={150}
                    heightPx={40}
                    required={false}
                />
            </div>
        </div>
    );
}