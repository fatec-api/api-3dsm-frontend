import api from "./api";

// LISTAR CLIENTES
export function listarClientes() {
    return Promise.resolve([
        {
            id: 1,
            ativo: true,
            cnpj: "12345678000101",
            dataCadastro: new Date().toISOString(),
            email: "contato@turingcorp.com",
            nomeEmpresa: "Turing Corp",
            nomeResponsavel: "Alan Turing"
        },
        {
            id: 2,
            ativo: true,
            cnpj: "23456789000102",
            dataCadastro: new Date().toISOString(),
            email: "contato@lovelaceinc.com",
            nomeEmpresa: "Lovelace Inc",
            nomeResponsavel: "Ada Lovelace"
        },
        {
            id: 3,
            ativo: true,
            cnpj: "34567890000103",
            dataCadastro: new Date().toISOString(),
            email: "contato@linuxsystems.com",
            nomeEmpresa: "Linux Systems",
            nomeResponsavel: "Linus Torvalds"
        },
        {
            id: 4,
            ativo: true,
            cnpj: "45678901000104",
            dataCadastro: new Date().toISOString(),
            email: "contato@gracecompiler.com",
            nomeEmpresa: "Grace Compiler",
            nomeResponsavel: "Grace Hopper"
        },
        {
            id: 5,
            ativo: true,
            cnpj: "56789012000105",
            dataCadastro: new Date().toISOString(),
            email: "contato@hopperanalytics.com",
            nomeEmpresa: "Hopper Analytics",
            nomeResponsavel: "Tim Hopper"
        }
    ])
}