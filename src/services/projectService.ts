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

const MOCK_PROJETOS = [
    { id: "1", nomeProjeto: "GSWProj1", cliente: "GSW" },
    { id: "2", nomeProjeto: "GSWProj2", cliente: "GSW" },
    { id: "3", nomeProjeto: "GSWProj3", cliente: "GSW" },
    { id: "4", nomeProjeto: "GSWProj4", cliente: "GSW" },
    { id: "5", nomeProjeto: "Projeto A", cliente: "Cliente Alpha" }
];

export const criarProjeto = async (dados: ProjetoPayload) => {
    try {
        const response = await api.post("/cadastrar/projeto", dados);
        return response.data;
    } catch (error) {
        console.error("Erro ao criar projeto", error);
        throw error;
    }
};

export async function listarProjetos() {
    console.warn("[MOCK] listarProjetos: Ignorando API instável.");
    return Promise.resolve(MOCK_PROJETOS);
}

export async function listarProjetoId(id: number) {
    const projetoMock = MOCK_PROJETOS.find(p => p.id === String(id));
    if (projetoMock) return Promise.resolve(projetoMock);

    const response = await api.get(`/listar/projetos/${id}`);
    return response.data;
}

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

export function listarClientes() {
    return Promise.resolve([
        { nomeCliente: "Caio" },
        { nomeCliente: "Guilherme" },
        { nomeCliente: "Isaura" },
        { nomeCliente: "Daniel" },
        { nomeCliente: "Claudio" }
    ]);
}