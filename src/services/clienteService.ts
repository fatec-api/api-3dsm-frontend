import instance from "../api/instance";
import api from "./api";

// LISTAR CLIENTES
export function listarClientes(): Promise<any[]> {
    return Promise.resolve([
        {
            id: 1,
            ativo: true,
            cnpj: "12345678000101",
            dataCadastro: new Date().toISOString(),
            email: "contato@turingcorp.com",
            nomeEmpresa: "Turing Corp",
        },
        {
            id: 2,
            ativo: true,
            cnpj: "23456789000102",
            dataCadastro: new Date().toISOString(),
            email: "contato@lovelaceinc.com",
            nomeEmpresa: "Lovelace Inc",
        },
        {
            id: 3,
            ativo: true,
            cnpj: "34567890000103",
            dataCadastro: new Date().toISOString(),
            email: "contato@linuxsystems.com",
            nomeEmpresa: "Linux Systems",
        },
        {
            id: 4,
            ativo: true,
            cnpj: "45678901000104",
            dataCadastro: new Date().toISOString(),
            email: "contato@gracecompiler.com",
            nomeEmpresa: "Grace Compiler",
        },
        {
            id: 5,
            ativo: true,
            cnpj: "56789012000105",
            dataCadastro: new Date().toISOString(),
            email: "contato@hopperanalytics.com",
            nomeEmpresa: "Hopper Analytics",
        }
    ])
}


// para integrar com back
// export async function listarClientes() {
//     try {
//         const response = await instance.get("/gestao/clientes/listar");
//         return response.data;
//     } catch (error) {
//         console.error({ event: "API_ERROR", action: "listarClientes", error });
//         throw error;
//     }
// }

