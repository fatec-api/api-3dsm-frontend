import { useState, type JSXElementConstructor, type ReactElement, type ReactNode, type ReactPortal } from "react";
import Header from "../shared/components/Header";
import Input from "../shared/components/Input";
import { PiHandCoins } from "react-icons/pi";
import { GoProject } from "react-icons/go";
import Dropdown from "../shared/components/Dropdown";
import { listarProfissionais } from "../services/projectService";

export default function CadastroProjeto() {
    const [alerta, setAlerta] = useState("");
    const [nomeProjeto, setNomeProjeto] = useState("");
    const [tipoProjeto, setTipoProjeto] = useState("");
    const [cliente, setCliente] = useState("");
    const [valorOrcamento, setValorOrcamento] = useState("");
    const [dataInicio, setDataInicio] = useState("");
    const [dataFim, setDataFim] = useState("");
    const [statusProjeto, setStatusProjeto] = useState("");
    const [profissionalAlocado, setProfissionalAlocado] = useState("");
    const [gestorResponsavel, setGestorResponsavel] = useState("");

    const regex = /^[A-Z]{3}\d{4}$/;

    const handleCadastro = async (e: React.FormEvent) => {

        e.preventDefault();
        setAlerta("");

        if (!nomeProjeto || !tipoProjeto || !valorOrcamento || !dataInicio || !dataFim || !statusProjeto || !gestorResponsavel) {
            setAlerta("Preencha todos os campos obrigatórios.");
            return;
        }

        if (!regex.test(nomeProjeto)) {
            setAlerta("O nome do projeto deve seguir o formato AAA9999 (3 letras maiúsculas seguidas de 4 números).");
            return;
        }

        if (dataFim < dataInicio) {
            setAlerta("A data de fim não pode ser anterior à data de início.");
            return;
        }

        if (isNaN(Number(valorOrcamento)) || Number(valorOrcamento) < 0) {
            setAlerta("O valor do orçamento deve ser um número válido.");
            return;
        }

        else {
            setAlerta("Projeto cadastrado com sucesso!");
            setNomeProjeto("");
            setTipoProjeto("");
            setCliente("");
            setValorOrcamento("");
            setDataInicio("");
            setDataFim("");
            setStatusProjeto("");
            setProfissionalAlocado("");
            setGestorResponsavel("");
        }
    }

    return (
        <div className="flex h-screen bg-[#FFFFFF]">
            <Header />
            <form className="flex flex-col items-center w-full mt-40" onSubmit={handleCadastro}>
                <h1 className="form-title text-2xl font-bold mb-5">Cadastro de Projeto</h1>
                <div className="join join-vertical lg:join-horizontal">
                    <div className="join join-vertical px-8">
                        <div className="mb-4">
                            <label className="block ms-3 mb-1 font-medium">Nome do Projeto</label>
                            <Input
                                type="text"
                                placeholder="Ex: ABC1234"
                                value={nomeProjeto}
                                onChange={(e) => setNomeProjeto(e.target.value.toUpperCase())}
                                icon={<GoProject size={20} />}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block ms-3 mb-1 font-medium">Tipo de Projeto</label>
                            <Dropdown
                                value={tipoProjeto}
                                onChange={(e) => setTipoProjeto(e.target.value)}
                                options={['Alocação', 'Hora Fechada']}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block ms-3 mb-1 font-medium">Cliente</label>
                            <Dropdown
                                value={cliente}
                                onChange={(e) => setCliente(e.target.value)}
                                options={['Cliente 1', 'Cliente 2', 'Cliente 3']}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block ms-3 mb-1 font-medium">Valor do Orçamento</label>
                            <Input
                                type="double"
                                placeholder="R$00,00"
                                value={valorOrcamento}
                                onChange={(e) => setValorOrcamento(e.target.value)}
                                icon={<PiHandCoins size={20} />}
                                required
                            />
                        </div>
                    </div>
                    <div className="join join-vertical px-8">
                        <div className="mb-4">
                            <label className="block ms-3 mb-1 font-medium">Data de Início</label>
                            <Input
                                type="date"
                                placeholder="dd/mm/aaaa"
                                value={dataInicio}
                                onChange={(e) => setDataInicio(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block ms-3 mb-1 font-medium">Data de Fim</label>
                            <Input
                                type="date"
                                placeholder="dd/mm/aaaa"
                                value={dataFim}
                                onChange={(e) => setDataFim(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block ms-3 mb-1 font-medium">Status do Projeto</label>
                            <Dropdown
                                value={statusProjeto}
                                onChange={(e) => setStatusProjeto(e.target.value)}
                                options={['Planejamento', 'Andamento', 'Concluído']}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block ms-3 mb-1 font-medium">Profissionais</label>
                            <div className="flex items-center border-2 border-gray-300 rounded-xl px-3 bg-white focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-200 transition duration-200">
                            <a href="#modal-profissional" className="flex-1 outline-none bg-transparent text-gray-700 appearance-none cursor-pointer py-2.5">Selecione</a>
                        </div>
                        </div>
                        
                    </div>
                </div>
                <div className="mb-5">
                    <label className="block ms-3 mb-1 font-medium">Gestor Responsável</label>
                    <Dropdown
                        value={gestorResponsavel}
                        onChange={(e) => setGestorResponsavel(e.target.value)}
                        options={['Gestor 1', 'Gestor 2', 'Gestor 3']}
                        required
                    />
                </div>
                {alerta && <p className={`mb-4 text-center ${alerta.includes("sucesso") ? "alert alert-outline alert-success text-sm bg-green-100" : "alert alert-outline alert-error text-sm bg-red-100"}`}>{alerta}</p>}

                <button type="submit" className="border-2 border-black rounded-xl bg-white hover:bg-gray-100 p-3 m-2">
                    Cadastrar
                </button>
            </form>
            <div className="modal" role="dialog" id="modal-profissional">
                <div className="modal-box">
                    <form action="">
                        <h3 className="text-lg font-bold pb-3">Selecione os profissionais para o projeto:</h3>
                        <ul className="list bg-base-100 rounded-box shadow-md">
                            {listarProfissionais().map((profissional: { nomeProfissional: string, cargo: string; }) => (
                                <li className="list-row">
                                    <div><input type="checkbox" className="checkbox" /></div>
                                    <div className="flex justify-between">
                                        <h2 className="font-bold">{profissional.nomeProfissional}</h2>
                                        <p>{profissional.cargo}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>

                        <div className="modal-action">
                            <button type="submit" className="border-2 border-black rounded-xl bg-white hover:bg-gray-100 cursor-pointer p-3 m-2">
                                Cadastrar
                            </button>
                            <a href="#" className="border-2 border-black rounded-xl bg-white hover:bg-gray-100 p-3 m-2">
                                Fechar
                            </a>
                        </div>
                    </form>

                </div>
            </div>
        </div >
    );
}