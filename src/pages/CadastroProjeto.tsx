import { useState } from "react";
import Header from "../shared/components/Header";
import Input from "../shared/components/Input";
import Botao from "../shared/components/Botao";

export default function CadastroProjeto() {
    const [nomeProjeto, setNomeProjeto] = useState("");
    const [dataInicio, setDataInicio] = useState("");
    const [dataFim, setDataFim] = useState("");
    return (
        <div className="flex h-screen bg-[#FFFFFF]">
            <Header />
            <form className="flex flex-col items-center w-full mt-40">
                <h1 className="form-title text-2xl font-bold mb-2">Cadastro de Projeto</h1>
                <div className="join join-vertical lg:join-horizontal">
                    <div className="join join-vertical p-8">
                        <div className="mb-4">
                            <label className="block ms-3 mb-1 font-medium">Nome do Projeto</label>
                            <Input
                                type="text"
                                placeholder="meu projeto"
                                value={nomeProjeto}
                                onChange={(e) => setNomeProjeto(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block ms-3 mb-1 font-medium">Cliente</label>
                            <Input
                                type="text"
                                placeholder="meu projeto"
                                value={nomeProjeto}
                                onChange={(e) => setNomeProjeto(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block ms-3 mb-1 font-medium">Tipo de Projeto</label>
                            <Input
                                type="text"
                                placeholder="meu projeto"
                                value={nomeProjeto}
                                onChange={(e) => setNomeProjeto(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block ms-3 mb-1 font-medium">Valor do Orçamento</label>
                            <Input
                                type="text"
                                placeholder="meu projeto"
                                value={nomeProjeto}
                                onChange={(e) => setNomeProjeto(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="join join-vertical p-8">
                        <div className="mb-4">
                            <label className="block ms-3 mb-1 font-medium">Data de Início</label>
                            <Input
                                type="date"
                                placeholder="dd/mm/aaaa"
                                value={dataInicio}
                                onChange={(e) => setDataInicio(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block ms-3 mb-1 font-medium">Data de Fim</label>
                            <Input
                                type="date"
                                placeholder="dd/mm/aaaa"
                                value={dataFim}
                                onChange={(e) => setDataFim(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block ms-3 mb-1 font-medium">Status do Projeto</label>
                            <Input
                                type="text"
                                placeholder="meu projeto"
                                value={nomeProjeto}
                                onChange={(e) => setNomeProjeto(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block ms-3 mb-1 font-medium">Profissionais</label>
                            <Input
                                type="text"
                                placeholder="meu projeto"
                                value={nomeProjeto}
                                onChange={(e) => setNomeProjeto(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
                <div className="mb-4">
                    <label className="block ms-3 mb-1 font-medium">Gestor Responsável</label>
                    <Input
                        type="text"
                        placeholder="meu projeto"
                        value={nomeProjeto}
                        onChange={(e) => setNomeProjeto(e.target.value)}
                    />
                </div>
                <Botao type="submit">
                    Cadastrar
                </Botao>
            </form>
        </div>
    );
}