import api from "./api";

export interface ProjetoPayload {
    nomeProjeto: string;
    tipoProjeto: string;
    cliente: string;
    valorOrcamento: number;
    dataInicio: string;
    dataFim: string;
    statusProjeto: string;
    profissionaisIds: string[];
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
    const response = await api.get(`/projetos`)
    return response.data
}

export async function listarProjetosPorGestor(gestorId?: string) {
    // const response = await api.get(`/projetos/gestor/${gestorId}`)
    // return response.data
    const todosProjetos = [
        {
            id: "1",
            nomeProjeto: "Projeto A",
            gestorId: "gestor1" 
        },
        {
            id: "2",
            nomeProjeto: "Projeto B",
            gestorId: "gestor1"
        },
        {
            id: "3",
            nomeProjeto: "Projeto C",
            gestorId: "gestor2"
        },
        {
            id: "4",
            nomeProjeto: "Projeto D",
            gestorId: "gestor1"
        }
    ];

    if (gestorId) {
        return Promise.resolve(todosProjetos.filter(projeto => projeto.gestorId === gestorId));
    }
    return Promise.resolve(todosProjetos);
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

export async function listarUsuariosAtivos() {
    const response = await api.get("/alocacoes/usuarios/ativos");
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
            nomeCliente: "Emmanuel"
        }
    ]);


};