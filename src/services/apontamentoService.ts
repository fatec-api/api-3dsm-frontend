import api from "./api";

export async function listarApontamentos() {
    const response = await api.get(`/apontamentos`);
    return response.data
}

export async function listarApontamentosUsuarios(id: string) {
    const response = await api.get(`apontamentos/usuario/${id}`);
    return response.data
}