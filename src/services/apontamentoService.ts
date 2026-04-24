import api from "./api"

export interface MetricasAtividade {
    horasPrevistasAtiv: number
    horasRealizadasAtiv: number
    nivelAtividade: 'ANALISE' | 'DESENVOLVIMENTO' | 'TESTE'
}

export const getApontamentosAprovadosPorProjeto = async (projetoId: number): Promise<MetricasAtividade[]> => {
    //mock
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                { nivelAtividade: 'ANALISE', horasPrevistasAtiv: 100, horasRealizadasAtiv: 70 }, 
                { nivelAtividade: 'DESENVOLVIMENTO', horasPrevistasAtiv: 200, horasRealizadasAtiv: 250 }, 
                { nivelAtividade: 'TESTE', horasPrevistasAtiv: 50, horasRealizadasAtiv: 45 } 
            ]);
        }, 800);
    });

    //Conexão com a api do back
    
    // try {
    //     const response = await api.get(`/apontamentos/aprovado/projeto/${projetoId}`);
    //     return response.data;
    // } catch (error) {
    //     console.error("Erro ao buscar apontamentos do projeto:", error);
    //     throw error;
    // }
};

export async function listarApontamentos() {
    const response = await api.get(`/apontamentos`)
    return response.data
}

export async function listarApontamentosUsuarios(id: string) {
    const response = await api.get(`apontamentos/usuario/${id}`)
    return response.data
}