import api from "./api";

export async function listarProjetos() {
    const response = await api.get("/listar/projetos")
    return response.data
}