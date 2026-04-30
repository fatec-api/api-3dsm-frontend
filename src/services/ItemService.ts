import api from "./api";

export type NivelAtividade = "Analise" | "Desenvolvimento" | "Teste";

// LISTAR ITENS POR UM ID DE PROJETO
export async function listarItens(id: number) {
    const response = await api.get(`http://localhost:8082/itens/projeto/${id}`);
    return response.data.map((item: any) => ({
        ...item,
        usuarioNomes: item.usuarioNomes?.length
            ? item.usuarioNomes
            : item.usuarioNome
                ? [item.usuarioNome]
                : []
    }));
}

export async function listarItensPorProfissional(id: string) {
  const response = await api.get(`/itens/usuario/${id}`);
  return response.data;
}

export async function vincularProfissionalItem(data: any) {
  const response = await api.post("/alocacoes/vincular", data);
  return response.data;
}