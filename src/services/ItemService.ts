import instance from "../api/instance";

export type NivelAtividade = "Analise" | "Desenvolvimento" | "Teste";

// LISTAR ITENS POR UM ID DE PROJETO
export async function listarItens(id: number) {
    const response = await instance.get(`/gestao/itens/projeto/${id}`);

    if (response.status === 204 || !response.data) {
      return []
    }

    return response.data
}

export async function listarItensPorProfissional(id: string) {
  const response = await instance.get(`/gestao/itens/usuario/${id}`);
  return response.data;
}

export async function vincularProfissionalItem(data: any) {
  const response = await instance.post("/gestao/alocacoes/vincular", data);
  return response.data;
}