import Header from "../shared/components/Header";
import Navbar from "../shared/components/Navbar";
import { useEffect, useState } from "react";
import { listarClientes } from "../services/projectService";

type Cliente = {
    id: number
    nomeEmpresa: string
    cnpj: string
    email: string
    ativo: boolean
    dataCadastro: string
};

export default function TelaListagemCliente() {
    const [clientes, setClientes] = useState<Cliente[]>([])
    const [carregando, setCarregando] = useState(true)
    const [paginaAtual, setPaginaAtual] = useState(1)

    const itensPorPagina = 15

    useEffect(() => {
        const fetchData = async () => {
            try {
                const dados = await listarClientes()
                setClientes(dados as unknown as Cliente[])
            } catch (error) {
                console.error("Erro ao buscar clientes:", error)
            } finally {
                setCarregando(false)
            }
        }

        fetchData();
    }, []);

    return (
        <>
            <Navbar />
            <Header />

            <h1 className="text-2xl font-semibold text-gray-800 text-center pb-8">
                Listagem dos Clientes
            </h1>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    <thead>
                        <tr>
                            <th>Cliente</th>
                            <th>Email</th>
                            <th>CNPJ</th>
                            <th>Projetos</th>
                            <th>Status</th>
                            <th>Editar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {carregando ? (
                            <tr>
                                <td colSpan={4}>Carregando...</td>
                            </tr>
                        ) : (
                            clientes.map((cliente) => (
                                <tr key={cliente.nomeEmpresa}>
                                    <td>{cliente.email}</td>
                                    <td>{cliente.cnpj}</td>
                                    <td>{cliente.ativo}</td>
                                    <td>
                                        <span className={`badge ${cliente.ativo ? 'badge-success' : 'badge-error'}`}>
                                            {cliente.ativo ? "Ativo" : "Inativo"}
                                        </span>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
}


