import api from "../api";

export async function criarProjeto(projeto) {
    const response = await api.post("/projetos", projeto);
    return response.data;
}

export async function getProfissionais(profissional) {
    return Promise.resolve([
        {
            nomeProfissional: "São Francisco",
            cargo: "PO"
        },
        {
            nomeProfissional: "São Paulo",
            cargo: "Desenvolvedor Front-end"
        },
        {
            nomeProfissional: "São Bernardo",
            cargo: "Desenvolvedor back-end"
        },
        {
            nomeProfissional: "São Carlos",
            cargo: "Gestor"
        },
        {
            nomeProfissional: "São Vincente",
            cargo: "Master"
        },
        {
            nomeProfissional: "São Longinho",
            cargo: "Gestor"
        },
        {
            nomeProfissional: "São Caetano",
            cargo: "Gestor"
        },
    ]);
}

export async function getClientes(cliente) {
    return Promise.resolve([
        {
            nomeCliente: "Caio"
        },
        {
            nomeCliente: "Guilherme"
        },
        {
            nomeCliente: "Isaura"
        },
        {
            nomeCliente: "Daniel"
        },
        {
            nomeCliente: "Claudio"
        }
    ]);
}