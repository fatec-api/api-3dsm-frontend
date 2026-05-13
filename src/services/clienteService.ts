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
            ativo: false,
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
        },
        {
            id: 6,
            ativo: false,
            cnpj: "67890123000106",
            dataCadastro: new Date().toISOString(),
            email: "suporte@vonneumann.io",
            nomeEmpresa: "Von Neumann Architecture",
            projetos: [
                { id: 9, nomeProjeto: 'EDVAC' },
                { id: 10, nomeProjeto: 'IAS Machine' }
            ]
        },
        {
            id: 7,
            ativo: true,
            cnpj: "78901234000107",
            dataCadastro: new Date().toISOString(),
            email: "hello@ritchieclabs.com",
            nomeEmpresa: "Ritchie C Labs",
            projetos: [
                { id: 11, nomeProjeto: 'Unix Core' },
                { id: 12, nomeProjeto: 'Compiler B' },
                { id: 13, nomeProjeto: 'Standard I/O' },
                { id: 14, nomeProjeto: 'Threads Lib' }
            ]
        },
        {
            id: 8,
            ativo: true,
            cnpj: "89012345000108",
            dataCadastro: new Date().toISOString(),
            email: "contact@knuthalgorithms.net",
            nomeEmpresa: "Knuth Algorithms",
            projetos: [
                { id: 15, nomeProjeto: 'TeX System' }
            ]
        },
        {
            id: 9,
            ativo: false,
            cnpj: "90123456000109",
            dataCadastro: new Date().toISOString(),
            email: "admin@dijkstrashortest.org",
            nomeEmpresa: "Dijkstra Pathfinders",
            projetos: []
        },
        {
            id: 10,
            ativo: true,
            cnpj: "01234567000110",
            dataCadastro: new Date().toISOString(),
            email: "dev@shannoninfo.com",
            nomeEmpresa: "Shannon Information",
            projetos: [
                { id: 16, nomeProjeto: 'Binary Logic' },
                { id: 17, nomeProjeto: 'Entropy App' },
                { id: 18, nomeProjeto: 'Signal Process' }
            ]
        },
        {
            id: 11,
            ativo: true,
            cnpj: "11223344000111",
            dataCadastro: new Date().toISOString(),
            email: "ceo@bernerslee-web.uk",
            nomeEmpresa: "Tim World Wide",
            projetos: [
                { id: 19, nomeProjeto: 'HTTP Protocol' },
                { id: 20, nomeProjeto: 'HTML Builder' }
            ]
        },
        {
            id: 12,
            ativo: false,
            cnpj: "22334455000122",
            dataCadastro: new Date().toISOString(),
            email: "legal@stallmanfree.org",
            nomeEmpresa: "Stallman Foundation",
            projetos: [
                { id: 21, nomeProjeto: 'GNU Compiler' },
                { id: 22, nomeProjeto: 'Emacs Editor' },
                { id: 23, nomeProjeto: 'GPL License' },
                { id: 24, nomeProjeto: 'Freedom Soft' },
                { id: 25, nomeProjeto: 'Kernel Mod' }
            ]
        },
        {
            id: 13,
            ativo: true,
            cnpj: "33445566000133",
            dataCadastro: new Date().toISOString(),
            email: "info@torvaldsgit.fi",
            nomeEmpresa: "Linus & Friends",
            projetos: [
                { id: 26, nomeProjeto: 'Git Version' },
                { id: 27, nomeProjeto: 'Linux Kernel' }
            ]
        },
        {
            id: 14,
            ativo: true,
            cnpj: "44556677000144",
            dataCadastro: new Date().toISOString(),
            email: "jobs@wozniakgarage.com",
            nomeEmpresa: "Wozniak Garage",
            projetos: [
                { id: 28, nomeProjeto: 'Apple I' },
                { id: 29, nomeProjeto: 'Apple II' }
            ]
        },
        {
            id: 15,
            ativo: true,
            cnpj: "55667788000155",
            dataCadastro: new Date().toISOString(),
            email: "contact@lamport-clocks.com",
            nomeEmpresa: "Lamport Systems",
            projetos: [
                { id: 30, nomeProjeto: 'LaTeX Engine' },
                { id: 31, nomeProjeto: 'Paxos Protocol' }
            ]
        },
        
        {
            id: 16,
            ativo: true,
            cnpj: "55667788000155",
            dataCadastro: new Date().toISOString(),
            email: "contact@lamport-clocks.com",
            nomeEmpresa: "Lamport Systems",
            projetos: [
                { id: 30, nomeProjeto: 'LaTeX Engine' },
                { id: 31, nomeProjeto: 'Paxos Protocol' }
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

