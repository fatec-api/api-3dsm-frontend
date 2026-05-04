import instance from "../api/instance";
import api from "./api"

export interface MetricasAtividade {
    horasPrevistasAtiv: number
    horasRealizadasAtiv: number
    nivelAtividade: 'Analise' | 'Desenvolvimento' | 'Teste'
}

export const getApontamentosAprovadosPorProjeto = async (projetoId: number): Promise<MetricasAtividade[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                { nivelAtividade: 'Analise', horasPrevistasAtiv: 100, horasRealizadasAtiv: 70 }, 
                { nivelAtividade: 'Desenvolvimento', horasPrevistasAtiv: 200, horasRealizadasAtiv: 250 }, 
                { nivelAtividade: 'Teste', horasPrevistasAtiv: 50, horasRealizadasAtiv: 45 } 
            ]);
        }, 800);
    });

    // INTEGRAÇÃO REAL (DESCOMENTAR NO FUTURO)
    /*
    try {
        const response = await instance.get(`/apontamento/apontamentos/aprovado/projeto/${projetoId}`);
        return response.data;
    } catch (error) {
        console.error({ event: "API_ERROR", action: "getApontamentosAprovadosPorProjeto", error });
        throw error;
    }
    */
};

export async function listarApontamentos() {
    const response = await instance.get(`/apontamento/apontamentos`)
    return response.data
}

export async function listarApontamentosUsuarios(id: string) {
    const response = await instance.get(`/apontamento/apontamentos/usuario/${id}`);
    return response.data;
}

export async function listarApontamentosPorProjeto(id?: string) {
    // INTEGRAÇÃO REAL (DESCOMENTAR NO FUTURO)
    const response = await instance.get(`/apontamento/apontamentos/projeto/${id}`);
    return response.data;
}

export async function aprovarApontamento(id: string) {
    const response = await instance.put(`apontamentos/aprovar/${id}`);
    return response.data;
}

export async function aprovarApontamentos(ids: string[]) {
    // INTEGRAÇÃO REAL (DESCOMENTAR NO FUTURO)
    // const response = await instance.put('/apontamentos/aprovar', { ids });
    // return response.data;

    return Promise.resolve({ message: "Apontamentos aprovados com sucesso", ids });
}

export async function buscarApontamentoPorId(id: string) {
    const response = await instance.get(`/apontamento/apontamentos/${id}`);
    return response.data;
}

export async function atualizarApontamentoPatch(id: string, dados: any) {
    const response = await instance.patch(`/apontamento/apontamentos/${id}`, dados);
    return response.data;
}

export async function reprovarApontamento(id: string, justificativa: string) {
    // INTEGRAÇÃO REAL (DESCOMENTAR NO FUTURO)
    // const response = await instance.put(`/apontamentos/reprovar/${id}`, { justificativa });
    // return response.data;
    
    console.warn(`[MOCK API] Chamada simulada para ID: ${id} | Justificativa: ${justificativa}`);
    
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ message: "Reprovado com sucesso (MOCK)", id, justificativa });
        }, 800);
    });
}

/**
 * Função preparada para o Backend.
 * Comentada internamente para evitar erros de conexão (ERR_CONNECTION_REFUSED) durante o uso de Mocks.
 */
export async function atualizarApontamento(id: string, dados: any) {
    console.info(`[MOCK API] Simulação de atualização para o ID: ${id}`, dados);
    
    // INTEGRAÇÃO REAL (DESCOMENTAR NO FUTURO)
    /* 
    try {
        const response = await instance.put(`apontamentos/${id}`, dados);
        return response.data;
    } catch (error) {
        console.error({ event: "API_ERROR", action: "atualizarApontamento", error });
        throw error;
    }
    */
    
    // Retorno fake para não quebrar a Promise do componente
    return Promise.resolve({ message: "Mock success" });
}
