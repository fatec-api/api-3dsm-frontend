import { listarClientes, type Projeto } from "../services/clienteService";
import Header from "../shared/components/Header";
import Navbar from "../shared/components/Navbar";
import { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";

import FormCadastroCliente from "../components/FormCadastroCliente"
import { listarProjetos } from "../services/projectService";

type Cliente = {
    id: number;
    nomeEmpresa: string;
    telefoneEmpresa: string,
    nomeResponsavel: string,
    telefoneResponsavel: string,
    cnpj: string;
    email: string;
    ativo: boolean;
    dataCadastro: string;
    projetos: Projeto[];
};

export default function TelaListagemCliente() {
    const [clientes, setClientes] = useState<Cliente[]>([]);
    const [carregando, setCarregando] = useState(true);

    const [paginaAtual, setPaginaAtual] = useState(1);

    const [clienteSelecionado, setClienteSelecionado] =
        useState<Cliente | null>(null);

    const [modalAberto, setModalAberto] = useState(false);

    const [busca, setBusca] = useState("");

    const [filtroStatus, setFiltroStatus] =
        useState("Todos");

    const itensPorPagina = 15;

    const carregarClientes = async () => {
        setCarregando(true);
        try {
            const [dadosClientes, dadosProjetos] = await Promise.all([
                listarClientes(),
                listarProjetos()
            ]);

            const clientesComProjetos = (dadosClientes as Cliente[]).map(cliente => {
                const projetosDoCliente = dadosProjetos.filter((proj: any) =>
                    proj.nomeCliente === cliente.nomeEmpresa
                );

                return {
                    ...cliente,
                    projetos: projetosDoCliente || []
                };
            });

            setClientes(clientesComProjetos);
        } catch (error) {
            console.error("Erro ao realizar join de clientes e projetos:", error);
        } finally {
            setCarregando(false);
        }
    };

    useEffect(() => {
        carregarClientes();
    }, []);

    useEffect(() => {
        setPaginaAtual(1);
    }, [busca, filtroStatus]);

    const clientesFiltrados = clientes.filter((cliente) => {
        const termo = busca.toLowerCase();

        const termoLimpo = termo.replace(/\D/g, "");

        const ehBuscaNumerica = termoLimpo.length > 0 &&
            (termoLimpo.length >= termo.length * 0.5);

        const correspondeCnpj = ehBuscaNumerica && cliente.cnpj.includes(termoLimpo);

        const correspondeNome = cliente.nomeEmpresa.toLowerCase().includes(termo);
        const correspondeEmail = cliente.email.toLowerCase().includes(termo);

        const correspondeBusca = correspondeNome || correspondeEmail || correspondeCnpj;

        const correspondeStatus =
            filtroStatus === "Todos" ||
            (filtroStatus === "Ativo"
                ? cliente.ativo === true
                : cliente.ativo === false);

        return correspondeBusca && correspondeStatus;
    });

    const indiceInicial =
        (paginaAtual - 1) * itensPorPagina;

    const clientesPaginados =
        clientesFiltrados.slice(
            indiceInicial,
            indiceInicial + itensPorPagina
        );

    const formatarCNPJ = (cnpj: string) => {
        const apenasNumeros =
            cnpj.replace(/\D/g, "");

        return apenasNumeros.replace(
            /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
            "$1.$2.$3/$4-$5"
        );
    };

    const formatarTelefone = (telefone: string) => {
        if (!telefone) return ""
        const apenasNumeros = telefone.replace(/\D/g, "")
        if (apenasNumeros.length === 11) {
            return apenasNumeros.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3")
        }
        if (apenasNumeros.length === 10) {
            return apenasNumeros.replace(/^(\d{2})(\d{4})(\d{4})$/, "($1) $2-$3")
        }
        
        return telefone
    }

    function abrirEdicao(cliente: Cliente) {
        setClienteSelecionado(cliente);
        setModalAberto(true);
    }

    return (
        <div className="flex flex-col min-h-screen">

            <Header />

            <section className="flex justify-center px-6 pb-12">
                <main className="w-full max-w-7xl rounded-2xl my-10 p-8 shadow-md bg-base-200">

                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">

                        <h1 className="text-2xl font-bold text-base-content">
                            Listagem dos Clientes
                        </h1>

                        <section className="flex flex-col md:flex-row gap-4 md:items-center">

                            <input
                                type="text"
                                placeholder="Pesquisar por cliente, email ou cnpj"
                                className="input w-full md:w-80"
                                value={busca}
                                onChange={(e) =>
                                    setBusca(e.target.value)
                                }
                            />

                            <select
                                className="select select-bordered w-full md:w-52"
                                value={filtroStatus}
                                onChange={(e) =>
                                    setFiltroStatus(e.target.value)
                                }
                            >
                                <option value="Todos">Todos</option>
                                <option value="Ativo">Ativo</option>
                                <option value="Inativo">Inativo</option>
                            </select>
                        </section>
                    </div>

                    <div className="overflow-x-auto rounded-2xl">
                        <table className="table table-zebra w-full">

                            <thead>
                                <tr>
                                    <th>Cliente</th>
                                    <th>Telefone Cliente</th>
                                    <th>Responsável</th>
                                    <th>Telefone Responsável</th>
                                    <th>Email</th>
                                    <th>CNPJ</th>
                                    <th>Projetos</th>
                                    <th>Status</th>
                                    <th>Editar</th>
                                </tr>
                            </thead>

                            <tbody>

                                {clientesPaginados.length === 0 ? (
                                    <tr>
                                        <td colSpan={9}>
                                            <div role="alert" className="alert alert-info alert-soft flex items-center justify-around h-15">
                                                <p className="text-lg">Nenhum apontamento encontrado.</p>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    clientesPaginados.map((cliente) => {
                                        const projetosVisiveis = cliente.projetos?.slice(0, 2) || []
                                        const projetosRestantes = cliente.projetos?.slice(2) || []

                                        const tooltipProjetos =
                                            projetosRestantes
                                                .map(
                                                    (projeto) =>
                                                        projeto.nomeProjeto
                                                )
                                                .join(", ");

                                        return (
                                            <tr key={cliente.id}>
                                                <td>
                                                    {cliente.nomeEmpresa}
                                                </td>

                                                <td>
                                                    {formatarTelefone(cliente.telefoneEmpresa)}
                                                </td>

                                                <td>
                                                    {cliente.nomeResponsavel}
                                                </td>

                                                <td>
                                                    {formatarTelefone(cliente.telefoneResponsavel)}
                                                </td>

                                                <td>
                                                    {cliente.email}
                                                </td>

                                                <td>
                                                    {formatarCNPJ(cliente.cnpj)}
                                                </td>

                                                <td>

                                                    {cliente.projetos.length === 0 || !cliente.projetos ? (
                                                        <span className="badge badge-primary badge-sm">
                                                            n/a
                                                        </span>
                                                    ) : (
                                                        <>
                                                            {projetosVisiveis.map(
                                                                (projeto) => (
                                                                    <span
                                                                        key={projeto.id}
                                                                        className="badge badge-sm badge-primary mr-1.5"
                                                                    >
                                                                        {projeto.nomeProjeto}
                                                                    </span>
                                                                )
                                                            )}

                                                            {projetosRestantes.length >
                                                                0 && (
                                                                    <section
                                                                        className="tooltip"
                                                                        data-tip={
                                                                            tooltipProjetos
                                                                        }
                                                                    >
                                                                        <span className="badge badge-sm badge-primary ml-1.5">
                                                                            +
                                                                            {
                                                                                projetosRestantes.length
                                                                            }
                                                                        </span>
                                                                    </section>
                                                                )}
                                                        </>
                                                    )}
                                                </td>

                                                <td>
                                                    <span
                                                        className={`badge badge-sm ${cliente.ativo
                                                            ? "badge-success"
                                                            : "badge-error"
                                                            }`}
                                                    >
                                                        {cliente.ativo
                                                            ? "Ativo"
                                                            : "Inativo"}
                                                    </span>
                                                </td>

                                                <td>
                                                    <button
                                                        onClick={() =>
                                                            abrirEdicao(cliente)
                                                        }
                                                        className="btn btn-ghost btn-sm"
                                                    >
                                                        <FiEdit className="text-[var(--color-text)]" />
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })
                                )}
                            </tbody>
                        </table>

                        <div className="flex justify-center mt-6">

                            <div className="join">

                                <button
                                    className="join-item btn btn-sm"
                                    onClick={() =>
                                        setPaginaAtual((prev) =>
                                            Math.max(prev - 1, 1)
                                        )
                                    }
                                >
                                    «
                                </button>

                                <button className="join-item btn btn-sm btn-active">
                                    Página {paginaAtual}
                                </button>

                                <button
                                    className="join-item btn btn-sm"
                                    disabled={
                                        indiceInicial +
                                        itensPorPagina >=
                                        clientesFiltrados.length
                                    }
                                    onClick={() =>
                                        setPaginaAtual(
                                            (prev) => prev + 1
                                        )
                                    }
                                >
                                    »
                                </button>
                            </div>
                        </div>
                    </div>
                </main>
            </section>

            {modalAberto && (
                <dialog className="modal modal-open">

                    <div className="modal-box bg-transparent shadow-none p-0 max-w-none w-auto flex justify-center items-center overflow-visible">

                        <FormCadastroCliente
                            cliente={clienteSelecionado}
                            onClose={() => {
                                setModalAberto(false);
                                setClienteSelecionado(null);
                            }}
                            onSuccess={() => {
                                carregarClientes();
                            }}
                        />
                    </div>

                    <form
                        method="dialog"
                        className="modal-backdrop"
                    >
                        <button
                            onClick={() => {
                                setModalAberto(false);
                                setClienteSelecionado(null);
                            }}
                        >
                            close
                        </button>
                    </form>
                </dialog>
            )}
        </div>
    );
}