import instance from "../api/instance";

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
    { "id": "1", "nomeProjeto": "Projeto A", "gestorId": "Ana Costa", "tipoProjeto": "Alocacao", "status": "Andamento", "cliente": "Hopper Analytics", "horasPrevistasTotal": 200, "horasRealizadasTotal": 50, "horasPendentesTotal": 150 },
    { "id": "2", "nomeProjeto": "Projeto B", "gestorId": "Ana Costa", "tipoProjeto": "Hora Fechada", "status": "Desenvolvimento", "cliente": "Linux Systems", "horasPrevistasTotal": 200, "horasRealizadasTotal": 205, "horasPendentesTotal": -5 },
    { "id": "3", "nomeProjeto": "Projeto C", "gestorId": "Juliana Lima", "tipoProjeto": "Alocacao", "status": "Concluída", "cliente": "Lovelace Inc", "horasPrevistasTotal": 200, "horasRealizadasTotal": 190, "horasPendentesTotal": 10 },
    { "id": "4", "nomeProjeto": "Projeto D", "gestorId": "Ricardo Mendes", "tipoProjeto": "Hora Fechada", "status": "Andamento", "cliente": "Linux Systems", "horasPrevistasTotal": 200, "horasRealizadasTotal": 150, "horasPendentesTotal": 50 },
    { "id": "5", "nomeProjeto": "Sistema de Gestão Interna", "gestorId": "Ana Costa", "tipoProjeto": "Alocacao", "status": "Concluída", "cliente": "Hopper Analytics", "horasPrevistasTotal": 200, "horasRealizadasTotal": 205, "horasPendentesTotal": -5 },
    { "id": "6", "nomeProjeto": "Portal do Cliente", "gestorId": "Juliana Lima", "tipoProjeto": "Hora Fechada", "status": "Desenvolvimento", "cliente": "Hopper Analytics", "horasPrevistasTotal": 200, "horasRealizadasTotal": 198, "horasPendentesTotal": 2 },
    { "id": "7", "nomeProjeto": "App Mobile Vendas", "gestorId": "Ricardo Mendes", "tipoProjeto": "Alocacao", "status": "Andamento", "cliente": "Lovelace Inc", "horasPrevistasTotal": 200, "horasRealizadasTotal": 150, "horasPendentesTotal": 50 },
    { "id": "8", "nomeProjeto": "Migração de Nuvem", "gestorId": "Carlos Souza", "tipoProjeto": "Hora Fechada", "status": "Desenvolvimento", "cliente": "Linux Systems", "horasPrevistasTotal": 200, "horasRealizadasTotal": 100, "horasPendentesTotal": 100 },
    { "id": "9", "nomeProjeto": "Segurança 2024", "gestorId": "Carlos Souza", "tipoProjeto": "Alocacao", "status": "Concluída", "cliente": "Linux Systems", "horasPrevistasTotal": 200, "horasRealizadasTotal": 150, "horasPendentesTotal": 50 },
    { "id": "10", "nomeProjeto": "Data Analytics", "gestorId": "Juliana Lima", "tipoProjeto": "Hora Fechada", "status": "Andamento", "cliente": "Hopper Analytics", "horasPrevistasTotal": 200, "horasRealizadasTotal": 205, "horasPendentesTotal": -5 }
];



export const criarProjeto = async (dados: ProjetoPayload) => {
    try {
        const response = await instance.post("/gestao/projetos/cadastrar", dados);
        return response.data;
    } catch (error) {
        console.error({ event: "API_ERROR", action: "criarProjeto", error });
        throw error;
    }
};

export async function listarProjetos() {
    try {
        const response = await instance.get("/gestao/projetos/listar");
        return response.data;
    } catch (error) {
        console.error({ event: "API_ERROR", action: "listarProjetos", error });
        throw error;
    }
}

export async function listarProjetosPorGestor(gestorId?: string) {
    try {
        const response = await instance.get(`gestao/projetos/gestor/${gestorId}`);
        return response.data;
    } catch (error) {
        console.error({ event: "API_ERROR", action: "listarProjetosPorGestor", error });
        throw error;
    }
}

export async function listarProjetoId(id: number) {
    try {
        const response = await instance.get(`/gestao/projetos/${id}`);
        return response.data;
    } catch (error) {
        console.error({ event: "API_ERROR", action: "listarProjetoId", error });
        throw error;
    }
}

export async function listarEquipeProjeto(id: number) {
    try {
        const response = await instance.get(`/gestao/alocacoes/projeto/${id}`);
        return response.data;
    } catch (error) {
        console.error({ event: "API_ERROR", action: "listarEquipeProjeto", error });
        throw error;
    }
}

export async function listarProfissionaisAtivos() {
    try {
        const response = await instance.get("/gestao/alocacoes/profissionais-ativos");
        return response.data;
    } catch (error) {
        console.error({ event: "API_ERROR", action: "listarProfissionaisAtivos", error });
        throw error;
    }
}

export async function listarUsuariosAtivos() {
    try {
        const response = await instance.get("/gestao/usuarios/ativos");
        return response.data;
    } catch (error) {
        console.error({ event: "API_ERROR", action: "listarUsuariosAtivos", error });
        throw error;
    }
}

export async function listarUsuarios() {
    try {
        const response = await instance.get("/gestao/usuarios");
        return response.data;
    } catch (error) {
        console.error({ event: "API_ERROR", action: "listarUsuarios", error });
        throw error;
    }
}

export function listarClientes() {
    return Promise.resolve([
        { nomeCliente: "Caio" },
        { nomeCliente: "Guilherme" },
        { nomeCliente: "Isaura" },
        { nomeCliente: "Daniel" },
        { nomeCliente: "Emmanuel" },
        { nomeCliente: "Claudio" }
    ]);
}