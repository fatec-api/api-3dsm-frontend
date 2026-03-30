import api from "./api";

// CRIAR PROJETO
// export const criarProjeto = async () => {
//     return Promise.resolve({ id: Date.now(),});
// };

export function listarProfissionais() {
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

export function listarClientes() {
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


};