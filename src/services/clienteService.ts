import instance from "../api/instance";
import api from "./api";
export type Projeto = {
    id: number;
    nomeProjeto: string;
};

type Cliente = {
    id: number
    nomeEmpresa: string
    cnpj: string
    email: string
    ativo: boolean
    dataCadastro: string
    projetos: Projeto[]
};

// LISTAR CLIENTES
export function listaClientes(): Promise<Cliente[]> {
    return Promise.resolve([
        {
            id: 1,
            ativo: true,
            cnpj: "12345678000101",
            dataCadastro: new Date().toISOString(),
            email: "contato@turingcorp.com",
            nomeEmpresa: "Turing Corp",
            projetos:[
                {
                    id: 1,
                    nomeProjeto: 'Proj1'
                },
                {
                    id: 2,
                    nomeProjeto: 'Proj2'
                }
            ]
        },
        {
            id: 2,
            ativo: true,
            cnpj: "23456789000102",
            dataCadastro: new Date().toISOString(),
            email: "contato@lovelaceinc.com",
            nomeEmpresa: "Lovelace Inc",
            projetos:[
                {
                    id: 3,
                    nomeProjeto: 'Proj3'
                }
            ]
        },
        {
            id: 3,
            ativo: true,
            cnpj: "34567890000103",
            dataCadastro: new Date().toISOString(),
            email: "contato@linuxsystems.com",
            nomeEmpresa: "Linux Systems",
            projetos:[
                {
                    id: 4,
                    nomeProjeto: 'Proj4'
                },
                {
                    id: 5,
                    nomeProjeto: 'Proj5'
                }
            ]
        },
        {
            id: 4,
            ativo: true,
            cnpj: "45678901000104",
            dataCadastro: new Date().toISOString(),
            email: "contato@gracecompiler.com",
            nomeEmpresa: "Grace Compiler",
            projetos:[
                
            ]
        },
        {
            id: 5,
            ativo: true,
            cnpj: "56789012000105",
            dataCadastro: new Date().toISOString(),
            email: "contato@hopperanalytics.com",
            nomeEmpresa: "Hopper Analytics",
            projetos:[
                {
                    id: 6,
                    nomeProjeto: 'Proj6'
                },
                {
                    id: 7,
                    nomeProjeto: 'Proj7'
                },
                {
                    id: 8,
                    nomeProjeto: 'Proj8'
                }
            ]
        }
    ])
}


// para integrar com back
// export async function listaClientes() {
//     try {
//         const response = await instance.get("/gestao/clientes/listar");
//         return response.data;
//     } catch (error) {
//         console.error({ event: "API_ERROR", action: "listaClientes", error });
//         throw error;
//     }
// }

