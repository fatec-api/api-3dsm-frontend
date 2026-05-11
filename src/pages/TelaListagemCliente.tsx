import { listaClientes, type Projeto } from "../services/clienteService";
import Header from "../shared/components/Header";
import Navbar from "../shared/components/Navbar";
import { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";

type Cliente = {
    id: number
    nomeEmpresa: string
    cnpj: string
    email: string
    ativo: boolean
    dataCadastro: string
    projetos: Projeto[]
};

export default function TelaListagemCliente() {
    const [clientes, setClientes] = useState<Cliente[]>([])
    const [carregando, setCarregando] = useState(true)
    const [paginaAtual, setPaginaAtual] = useState(1)
    const [clienteSelecionado, setClienteSelecionado] = useState<Cliente | null>(null);
    const [modalAberto, setModalAberto] = useState(false);

    const itensPorPagina = 15

    useEffect(() => {
        const fetchData = async () => {
            try {
                const dados = await listaClientes()
                setClientes(dados as Cliente[])
            } catch (error) {
                console.error("Erro ao buscar clientes:", error)
            } finally {
                setCarregando(false)
            }
        }

        fetchData();
    }, []);

    function abrirEdicao(cliente: Cliente) {
        setClienteSelecionado(cliente);
        setModalAberto(true);
    }

    return (
        <>
            <Navbar />
            <Header />

            <h1 className="text-2xl font-semibold text-gray-800 text-center pb-8">
                Listagem dos Clientes
            </h1>
            <div className="overflow-x-auto">
                <table className="table table-zebra table-fixed w-full">
                    <thead>
                        <tr>
                            <th className="w-[20%]">Cliente</th>
                            <th className="w-[25%]">Email</th>
                            <th className="w-[20%]">CNPJ</th>
                            <th className="w-[23%]">Projetos</th>
                            <th className="w-[15%]">Status</th>
                            <th className="w-[10%]">Editar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {carregando ? (
                            <tr>
                                <td colSpan={6}>Carregando...</td>
                            </tr>
                        ) : (
                            clientes.map((cliente) => {
                                const projetosVisiveis = cliente.projetos.slice(0, 2)
                                const projetosRestantes = cliente.projetos.slice(2)
                                const tooltipProjetos = projetosRestantes.map((projeto) => projeto.nomeProjeto).join(', ')

                                return (
                                    <tr key={cliente.id}>
                                        <td>{cliente.nomeEmpresa}</td>
                                        <td>{cliente.email}</td>
                                        <td>{cliente.cnpj}</td>
                                        <td>{projetosVisiveis.map((projeto) => (
                                            <span className="badge  badge-outline badge-primary mr-1.5">
                                                {projeto.nomeProjeto}
                                            </span>
                                        ))}
                                            {projetosRestantes.length > 0 && (
                                                <section className="tooltip" data-tip={tooltipProjetos}>
                                                    <span className="badge  badge-outline badge-primary ml-1.5">
                                                        +{projetosRestantes.length}
                                                    </span>
                                                </section>
                                            )}
                                        </td>
                                        <td>
                                            <span className={`badge badge-outline ${cliente.ativo ? 'badge-success' : 'badge-error'}`}>
                                                {cliente.ativo ? "Ativo" : "Inativo"}
                                            </span>
                                        </td>
                                        <td>
                                            <button
                                                onClick={() => abrirEdicao(cliente)}
                                                className="btn btn-ghost btn-sm"
                                            >
                                                <FiEdit />
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
}


