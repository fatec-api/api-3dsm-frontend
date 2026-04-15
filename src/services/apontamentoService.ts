import api from "./api";

export async function listarApontamentos() {
    const response = await api.get(`/apontamentos`);
    return response.data
}

export async function listarApontamentosUsuarios(id: string) {
    const response = await api.get(`apontamentos/usuario/${id}`);
    return response.data
}

export async function listarApontamentosPorProjeto() {
    // const response = await api.get(`apontamentos/pendente/projeto/${id}`);
    // return response.data
    return Promise.resolve([
        {
            usuario: "João Silva",
            projeto: "Projeto A",
            item: "Desenvolvimento de funcionalidade X",
            nivel: "Alocação",
            data: "2024-06-15",
            inicio: "09:00",
            fim: "17:00",
            status: "Pendente"
        },
        {
            usuario: "Maria Souza",
            projeto: "Projeto B",
            item: "Correção de bug Y",
            nivel: "Hora Fechada",
            data: "2024-06-14",
            inicio: "10:00",
            fim: "16:00",
            status: "Pendente"
        }
    ]);
}

export async function aprovarApontamento(id: string) {
    const response = await api.put(`apontamentos/aprovar/${id}`);
    return response.data
}

export async function reprovarApontamento(id: string) {
    const response = await api.put(`apontamentos/reprovar/${id}`);
    return response.data
}