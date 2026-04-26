import api from "./api";

export type NivelAtividade = "ANALISE" | "DESENVOLVIMENTO" | "TESTE";

// LISTAR ITENS POR UM ID DE PROJETO
export async function listarItens(id: number) {
    const response = await api.get(`http://localhost:8082/itens/projeto/${id}`);
    return response.data
}

export async function listarItensPorProfissional(id: string) {
  const response = await api.get(`/itens/profissional/${id}`);
  return response.data;
}

export async function vincularProfissionalItem(data: any) {
  const response = await api.post("/alocacoes/vincular", data);
  return response.data;
}