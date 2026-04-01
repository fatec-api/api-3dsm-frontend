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

// LISTAR PROFISSIONAIS
export async function listarProfissionais() {
    const response = await api.get("/listar/profissionais");
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
    ]);


};