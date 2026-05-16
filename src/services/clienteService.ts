import instance from "../api/instance";

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


// para integrar com back
export async function listarClientes() {
    try {
        const response = await instance.get("/gestao/clientes");
        return response.data;
    } catch (error) {
        console.error({ event: "API_ERROR", action: "listaClientes", error });
        throw error;
    }
}


export async function cadastrarCliente(dados: any) {
    try {
        const response = await instance.post("/gestao/clientes", dados);
        return response.data;
    } catch (error) {
        console.error({ event: "API_ERROR", action: "cadastroCliente", error });
        throw error;
    }
}

export async function atualizarCliente(id: number, dados: any) {
    const response = await instance.put(`/gestao/clientes/${id}`, dados);
    return response.data;
}


const CLIENTES_MOCK: Cliente[] = [
    { id: 1, nomeEmpresa: "Cliente Exemplo A", email: "contato@exemploa.com", cnpj: "", ativo: true, dataCadastro: "", projetos: [] },
    { id: 2, nomeEmpresa: "Cliente Exemplo B", email: "contato@exemplob.com", cnpj: "", ativo: true, dataCadastro: "", projetos: [] },
];

export async function listarClientesAtivos(): Promise<Cliente[]> {
    try {
        const response = await instance.get("/gestao/clientes/ativos");
        return response.data;
    } catch (error) {
        console.warn("Endpoint de clientes indisponível, usando dados mock.", error);
        return CLIENTES_MOCK;
        // sem mock, para após o merge do backend
        // console.error({ event: "API_ERROR", action: "listarClientesAtivos", error });
        // throw error;
    }
}