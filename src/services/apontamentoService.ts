import api from "./api";

export async function listarApontamentos() {
    const response = await api.get(`/apontamentos`);
    return response.data
}

export async function listarApontamentosUsuarios(id: string) {
    const response = await api.get(`apontamentos/usuario/${id}`);
    return response.data
}

export function listarApontamentosPorProjeto() {
    // const response = await api.get(`apontamentos/projeto/${id}`);
    // return response.data
    return Promise.resolve([
        {
            usuario: "João Silva",
            projeto: "Projeto A",
            item: "Desenvolvimento de funcionalidade X",
            nivel: "Desenvolvimento",
            data: "2024-06-15",
            inicio: "09:00",
            fim: "17:00",
            status: "Aprovado"
        },
        {
            usuario: "Maria Souza",
            projeto: "Projeto B",
            item: "Correção de bug Y",
            nivel: "Desenvolvimento",
            data: "2024-06-14",
            inicio: "10:00",
            fim: "16:00",
            status: "Pendente"
        },
        {
            usuario: "Calor Oliveira",
            projeto: "Projeto B",
            item: "Correção de bug Z",
            nivel: "Desenvolvimento",
            data: "2024-06-16",
            inicio: "13:00",
            fim: "19:00",
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