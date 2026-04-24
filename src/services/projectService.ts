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
    { "id": "1", "nome": "Projeto A", "gestorId": "Ana Costa" },
    { "id": "2", "nome": "Projeto B", "gestorId": "Ana Costa" },
    { "id": "3", "nome": "Projeto C", "gestorId": "Juliana Lima" },
    { "id": "4", "nome": "Projeto D", "gestorId": "Ricardo Mendes" },
    { "id": "5", "nome": "Sistema de Gestão Interna", "gestorId": "Ana Costa" },
    { "id": "6", "nome": "Portal do Cliente", "gestorId": "Juliana Lima" },
    { "id": "7", "nome": "App Mobile Vendas", "gestorId": "Ricardo Mendes" },
    { "id": "8", "nome": "Migração de Nuvem", "gestorId": "Carlos Souza" },
    { "id": "9", "nome": "Segurança 2024", "gestorId": "Carlos Souza" },
    { "id": "10", "nome": "Data Analytics", "gestorId": "Juliana Lima" }
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
    const response = await api.get("/listar/projetos")
    return response.data;
    // console.warn("[MOCK] listarProjetos: Ignorando API para evitar Erro 500.");
    // return Promise.resolve(MOCK_PROJETOS);
}

export async function listarProjetosPorGestor(gestorId?: string) {
    // const response = await api.get("/listar/projetos/gestor/${gestorId}")
    // return response.data
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