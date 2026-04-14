import api from "./api";

export async function listarApontamentos() {
    const response = await api.get(`/apontamentos`);
    return response.data
}

export async function listarApontamentosUsuarios(id: string) {
    const response = await api.get(`apontamentos/usuario/${id}`);
    return response.data
}

export async function listarApontamentosGestor(id: string) {
    const response = await api.get(`apontamentos/pendente/projeto/${id}`);
    return response.data
}

export async function aprovarApontamento(id: string) {
    const response = await api.put(`apontamentos/aprovar/${id}`);
    return response.data
}

export async function reprovarApontamento(id: string) {
    const response = await api.put(`apontamentos/reprovar/${id}`);
    return response.data
}