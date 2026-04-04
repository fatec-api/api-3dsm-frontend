import api from "./api";

export interface ProjetoPayload {
    nomeProjeto: string;
    tipoProjeto: string;
    cliente: string;
    valorOrcamento: number;
    dataInicio: string;
    dataFim: string;
    statusProjeto: string;
    profissionalAlocado: string[];
    gestorResponsavel: string;
}

// CRIAR PROJETO
export const criarProjeto = async (dados: ProjetoPayload) => {
    try {
        const response = await api.post("/cadastrar/projeto", dados);
        return response.data;
    } catch (error) {
        console.error("Erro ao criar projeto", error);
        throw error;
    }
};
// LISTAR PROJETOS
export async function listarProjetos() {
    const response = await api.get("/listar/projetos")
    return response.data
}
// LISTAR PROJETO POR ID
export async function listarProjetoId(id: number) {
    const response = await api.get(`/listar/projetos/${id}`)
    return response.data
}

// LISTAR PROFISSIONAIS
export async function listarEquipeProjeto(id: number) {
    const response = await api.get(`/alocacoes/projeto/${id}`);
    return response.data;
}
export async function listarProfissionaisAtivos() {
    const response = await api.get("/alocacoes/profissionais/ativos");
    return response.data;
}

// LISTAR CLIENTES
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
    ])
};
