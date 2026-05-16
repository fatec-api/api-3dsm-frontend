// versão sem mock para depois do merge
// import instance from "../api/instance";

// export interface Cliente {
//     id: number;
//     nomeEmpresa: string;
//     email?: string;
// }

// export async function listarClientesAtivos(): Promise<Cliente[]> {
//     try {
//         const response = await instance.get("/gestao/clientes/ativos");
//         return response.data;
//     } catch (error) {
//         console.error({ event: "API_ERROR", action: "listarClientesAtivos", error });
//         throw error;
//     }
// }

import instance from "../api/instance";

export interface Cliente {
    id: number;
    nomeEmpresa: string;
    email?: string;
}

const CLIENTES_MOCK: Cliente[] = [
    { id: 1, nomeEmpresa: "Cliente Exemplo A", email: "contato@exemploa.com" },
    { id: 2, nomeEmpresa: "Cliente Exemplo B", email: "contato@exemplob.com" },
];

export async function listarClientesAtivos(): Promise<Cliente[]> {
    try {
        const response = await instance.get("/gestao/clientes/ativos");
        return response.data;
    } catch (error) {
        console.warn("Endpoint de clientes indisponível, usando dados mock.", error);
        return CLIENTES_MOCK;
    }
}