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
    { id: "1", nomeProjeto: "Projeto A", nome: "Projeto A", gestorId: "gestor1" },
    { id: "2", nomeProjeto: "Projeto B", nome: "Projeto B", gestorId: "gestor1" },
    { id: "3", nomeProjeto: "Projeto C", nome: "Projeto C", gestorId: "gestor2" },
    { id: "4", nomeProjeto: "Projeto D", nome: "Projeto D", gestorId: "gestor1" }
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
    console.warn("[MOCK] listarProjetos: Ignorando API para evitar Erro 500.");
    return Promise.resolve(MOCK_PROJETOS);
}

export async function listarProjetosPorGestor(gestorId?: string) {
    console.warn("[MOCK] listarProjetosPorGestor: Filtrando dados locais.");
    
    if (gestorId) {
        return Promise.resolve(MOCK_PROJETOS.filter(projeto => projeto.gestorId === gestorId));
    }
    return Promise.resolve(MOCK_PROJETOS);
}

export async function listarProjetoId(id: number) {
    const projetoMock = MOCK_PROJETOS.find(p => p.id === String(id));
    if (projetoMock) return Promise.resolve(projetoMock);

    const response = await api.get(`/listar/projetos/${id}`)
    return response.data
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
        { nomeCliente: "Emmanuel" }
    ]);
}