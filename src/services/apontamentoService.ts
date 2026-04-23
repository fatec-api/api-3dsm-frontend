import api from "./api";

export async function listarApontamentos() {
    const response = await api.get(`/apontamentos`);
    return response.data;
}

export async function listarApontamentosUsuarios(id: string) {
    const response = await api.get(`apontamentos/usuario/${id}`);
    return response.data;
}

export function listarApontamentosPorProjeto() {
    return Promise.resolve([
        {
            id: "1", 
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
            id: "2",
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
            id: "3",
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
    return response.data;
}

export async function aprovarApontamentos(ids: string[]) {
    return Promise.resolve({ message: "Apontamentos aprovados com sucesso", ids });
}

export async function reprovarApontamento(id: string, justificativa: string) {
    console.warn(`[MOCK API] Chamada simulada para ID: ${id} | Justificativa: ${justificativa}`);
    
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ message: "Reprovado com sucesso (MOCK)", id, justificativa });
        }, 800);
    });

}