import api from "./api";

export type NivelAtividade = "ANALISE" | "DESENVOLVIMENTO" | "TESTE";

// LISTAR ITENS POR UM ID DE PROJETO
export async function listarItens(id: number) {
    const response = await api.get(`http://localhost:8080/itens/projeto/${id}`);
    return response.data
}